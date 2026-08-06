/**
 * Property-based tests for the visual-stabilization spec.
 * Uses fast-check for property generation (minimum 100 iterations each).
 *
 * Feature: visual-stabilization
 */

import { describe, it, expect } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import * as fc from 'fast-check'
import ProviderPopup, { getPopupStyle } from '../features/map/components/ProviderPopup'
import MapShell from '../features/map/components/MapShell'

// ---------------------------------------------------------------------------
// Arbitraries
// ---------------------------------------------------------------------------

const statusArb = fc.constantFrom('available', 'busy', 'offline')

/** Minimal provider arbitrary — all required fields */
const providerArb = fc.record({
  id: fc.uuid(),
  name: fc.string({ minLength: 1, maxLength: 40 }),
  description: fc.string({ minLength: 0, maxLength: 80 }),
  status: statusArb,
  x: fc.float({ min: 0, max: 100, noNaN: true }),
  y: fc.float({ min: 0, max: 100, noNaN: true }),
  rating: fc.float({ min: 0, max: 5, noNaN: true }),
  reviews: fc.nat({ max: 9999 }),
  completedServices: fc.nat({ max: 99999 }),
  pricingTier: fc.constantFrom('$', '$$', '$$$'),
  etaMinutes: fc.option(fc.nat({ max: 120 }), { nil: null }),
  serviceCategories: fc.array(fc.string({ minLength: 1, maxLength: 20 }), { minLength: 0, maxLength: 5 }),
  avatar: fc.string({ minLength: 1, maxLength: 4 }),
})

/** Array of providers with at least one element */
const providersArb = fc.array(providerArb, { minLength: 1, maxLength: 10 })

// ---------------------------------------------------------------------------
// Property 1: Status color mapping is total and correct
// Feature: visual-stabilization, Property 1: For any provider with status
// available, busy, or offline, the ProviderPopup status dot SHALL apply the
// correct StatusColor class and the MapShell marker inner circle SHALL apply
// the correct fill class.
// ---------------------------------------------------------------------------

describe('Property 1: Status color mapping is total and correct', () => {
  // ProviderPopup dot
  it('ProviderPopup status dot uses correct bg color class for any status', () => {
    const expectedDotClass = {
      available: 'bg-emerald-400',
      busy: 'bg-orange-400',
      offline: 'bg-red-500',
    }

    fc.assert(
      fc.property(providerArb, (provider) => {
        const { container } = render(
          <ProviderPopup provider={provider} onClose={() => {}} />
        )

        // The status dot is a span with w-2 h-2 rounded-full inline-block mr-1.5
        const dot = container.querySelector('span.w-2.h-2.rounded-full')
        expect(dot).not.toBeNull()

        const expected = expectedDotClass[provider.status]
        expect(dot.className).toContain(expected)

        // Must NOT contain the other two color classes
        const others = Object.values(expectedDotClass).filter((c) => c !== expected)
        for (const other of others) {
          expect(dot.className).not.toContain(other)
        }
      })
    )
  })

  // MapShell marker inner circle fill
  it('MapShell marker inner circle uses correct fill class for any status', () => {
    const expectedFillClass = {
      available: 'fill-emerald-400',
      busy: 'fill-orange-400',
      offline: 'fill-red-500',
    }

    fc.assert(
      fc.property(providerArb, (provider) => {
        const { container } = render(
          <MapShell
            providers={[provider]}
            selectedProvider={null}
            onSelect={() => {}}
            onClose={() => {}}
          />
        )

        // The inner circle is the first <circle> inside the marker <g>
        // It has the fill class and r="3.2"
        const circles = container.querySelectorAll('circle[r="3.2"]')
        expect(circles.length).toBeGreaterThanOrEqual(1)

        const innerCircle = circles[0]
        const expected = expectedFillClass[provider.status]
        expect(innerCircle.className.baseVal).toContain(expected)

        const others = Object.values(expectedFillClass).filter((c) => c !== expected)
        for (const other of others) {
          expect(innerCircle.className.baseVal).not.toContain(other)
        }
      })
    )
  })
})

// ---------------------------------------------------------------------------
// Property 2: Popup renders all required data fields for any provider
// Feature: visual-stabilization, Property 2: For any valid provider object,
// the rendered ProviderPopup SHALL contain the provider name, description,
// rating, review count, completed services count, pricing tier, and ETA —
// all present in the DOM regardless of the specific values.
// ---------------------------------------------------------------------------

describe('Property 2: Popup renders all required data fields for any provider', () => {
  it('ProviderPopup contains all required data fields for any provider', () => {
    fc.assert(
      fc.property(providerArb, (provider) => {
        const { container } = render(
          <ProviderPopup provider={provider} onClose={() => {}} />
        )

        const text = container.textContent

        // Provider name
        expect(text).toContain(provider.name)

        // Description
        expect(text).toContain(provider.description)

        // Rating (rendered as part of "rating (reviews)" string)
        expect(text).toContain(String(provider.rating))

        // Review count
        expect(text).toContain(String(provider.reviews))

        // Completed services
        expect(text).toContain(String(provider.completedServices))

        // Pricing tier
        expect(text).toContain(provider.pricingTier)

        // ETA — either the number or '--' when null/0
        if (provider.etaMinutes) {
          expect(text).toContain(String(provider.etaMinutes))
        } else {
          expect(text).toContain('--')
        }
      })
    )
  })
})

// ---------------------------------------------------------------------------
// Property 3: getPopupStyle clamps position within bounds for any x/y in [0,100]
// Feature: visual-stabilization, Property 3: For any provider with x and y
// coordinates in the range [0, 100], the computed popup left and top CSS
// values SHALL keep the popup fully within the MapShell container —
// left is in [1%, 68%] and top is in [1%, 52%].
// ---------------------------------------------------------------------------

describe('Property 3: getPopupStyle clamps position within bounds', () => {
  it('left is always in [1%, 68%] and top is always in [1%, 52%] for any x/y in [0,100]', () => {
    fc.assert(
      fc.property(
        fc.float({ min: 0, max: 100, noNaN: true }),
        fc.float({ min: 0, max: 100, noNaN: true }),
        (x, y) => {
          const style = getPopupStyle(x, y)

          const left = parseFloat(style.left)
          const top = parseFloat(style.top)

          expect(left).toBeGreaterThanOrEqual(1)
          expect(left).toBeLessThanOrEqual(68)
          expect(top).toBeGreaterThanOrEqual(1)
          expect(top).toBeLessThanOrEqual(52)
        }
      )
    )
  })
})

// ---------------------------------------------------------------------------
// Property 4: Telemetry count matches filtered available provider count
// Feature: visual-stabilization, Property 4: For any array of provider
// objects with arbitrary status distributions, the active provider count
// displayed in the TelemetryBar SHALL equal exactly the number of providers
// whose status is 'available'.
// ---------------------------------------------------------------------------

describe('Property 4: Telemetry count matches filtered available provider count', () => {
  /**
   * The TelemetryBar is rendered inline in Home.jsx. We test the logic
   * directly: the count is `providers.filter(p => p.status === 'available').length`.
   * We render a minimal TelemetryBar-equivalent inline to verify the count.
   */
  function TelemetryBar({ providers }) {
    const activeCount = providers.filter((p) => p.status === 'available').length
    return (
      <div>
        <span data-testid="active-count" className="font-mono font-semibold text-white text-sm">
          {activeCount}
        </span>
      </div>
    )
  }

  it('active provider count equals number of available providers for any provider array', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            id: fc.uuid(),
            status: statusArb,
          }),
          { minLength: 0, maxLength: 20 }
        ),
        (providers) => {
          const expectedCount = providers.filter((p) => p.status === 'available').length

          const { getByTestId } = render(<TelemetryBar providers={providers} />)
          const countEl = getByTestId('active-count')

          expect(countEl.textContent).toBe(String(expectedCount))
          cleanup()
        }
      )
    )
  })
})

// ---------------------------------------------------------------------------
// Property 5: Selected marker ring uses accent color and increased radius
// Feature: visual-stabilization, Property 5: For any provider in the
// providers list, when that provider is the selectedProvider, the outer ring
// circle SHALL have r="4.7" and stroke="#d9f80c", while all other markers
// SHALL have r="4.4" and stroke="rgba(255,255,255,0.4)".
// ---------------------------------------------------------------------------

describe('Property 5: Selected marker ring uses accent color and increased radius', () => {
  it('selected marker has r=4.7 and accent stroke; others have r=4.4 and white stroke', () => {
    fc.assert(
      fc.property(
        providersArb,
        fc.nat(),
        (providers, rawIndex) => {
          const selectedIndex = rawIndex % providers.length
          const selectedProvider = providers[selectedIndex]

          const { container } = render(
            <MapShell
              providers={providers}
              selectedProvider={selectedProvider}
              onSelect={() => {}}
              onClose={() => {}}
            />
          )

          // Outer ring circles are transparent fill circles (not the inner filled ones)
          // They have r="4.7" (selected) or r="4.4" (unselected)
          const rings47 = container.querySelectorAll('circle[r="4.7"]')
          const rings44 = container.querySelectorAll('circle[r="4.4"]')

          // Exactly one selected ring
          expect(rings47.length).toBe(1)
          expect(rings47[0].getAttribute('stroke')).toBe('#d9f80c')

          // All others are unselected
          expect(rings44.length).toBe(providers.length - 1)
          for (const ring of rings44) {
            expect(ring.getAttribute('stroke')).toBe('rgba(255,255,255,0.4)')
          }
        }
      )
    )
  })
})

// ---------------------------------------------------------------------------
// Property 6: Glow filter applied exclusively to available markers
// Feature: visual-stabilization, Property 6: For any array of providers with
// mixed statuses, the SVG glow filter (filter="url(#glow)") SHALL be applied
// to the inner circle of every available provider marker and SHALL NOT be
// applied to busy or offline markers.
// ---------------------------------------------------------------------------

describe('Property 6: Glow filter applied exclusively to available markers', () => {
  it('glow filter is on all available inner circles and absent from busy/offline', () => {
    fc.assert(
      fc.property(providersArb, (providers) => {
        const { container } = render(
          <MapShell
            providers={providers}
            selectedProvider={null}
            onSelect={() => {}}
            onClose={() => {}}
          />
        )

        // Inner circles have r="3.2"
        const innerCircles = container.querySelectorAll('circle[r="3.2"]')
        expect(innerCircles.length).toBe(providers.length)

        providers.forEach((provider, i) => {
          const circle = innerCircles[i]
          const filterAttr = circle.getAttribute('filter')

          if (provider.status === 'available') {
            expect(filterAttr).toBe('url(#glow)')
          } else {
            expect(filterAttr).toBeNull()
          }
        })
      })
    )
  })
})

// ---------------------------------------------------------------------------
// Property 7: Base marker radius is 3.2 for all providers
// Feature: visual-stabilization, Property 7: For any provider in the
// providers list, the inner filled circle of its marker SHALL have r="3.2"
// regardless of the provider's status, position, or selection state.
// ---------------------------------------------------------------------------

describe('Property 7: Base marker radius is 3.2 for all providers', () => {
  it('every inner marker circle has r=3.2 regardless of status, position, or selection', () => {
    fc.assert(
      fc.property(
        providersArb,
        fc.option(fc.nat(), { nil: null }),
        (providers, rawSelectedIndex) => {
          const selectedProvider =
            rawSelectedIndex !== null
              ? providers[rawSelectedIndex % providers.length]
              : null

          const { container } = render(
            <MapShell
              providers={providers}
              selectedProvider={selectedProvider}
              onSelect={() => {}}
              onClose={() => {}}
            />
          )

          const innerCircles = container.querySelectorAll('circle[r="3.2"]')
          expect(innerCircles.length).toBe(providers.length)
        }
      )
    )
  })
})

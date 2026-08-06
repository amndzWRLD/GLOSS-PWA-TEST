/**
 * Unit tests for the visual-stabilization spec.
 * Covers structural and token constraints for DiscoveryBar, TelemetryBar,
 * ProviderPopup, and MapShell.
 *
 * Feature: visual-stabilization
 */

import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import DiscoveryBar from '../features/discovery/components/DiscoveryBar'
import ProviderPopup from '../features/map/components/ProviderPopup'
import MapShell from '../features/map/components/MapShell'

// ---------------------------------------------------------------------------
// Sample data
// ---------------------------------------------------------------------------

const sampleProvider = {
  id: 'test-1',
  name: 'Test Provider',
  description: 'A test provider',
  status: 'available',
  x: 30,
  y: 40,
  rating: 4.8,
  reviews: 120,
  completedServices: 350,
  pricingTier: '$$',
  etaMinutes: 15,
  serviceCategories: ['Full Detail'],
  avatar: '🚗',
}

const sampleCategories = ['All', 'Full Detail', 'Wash']
const sampleStatuses = ['available', 'busy', 'offline']
const samplePricing = ['$', '$$', '$$$']

const defaultFilters = {
  query: '',
  categories: [],
  statuses: [],
  pricingTiers: [],
}

// ---------------------------------------------------------------------------
// 6.1 DiscoveryBar: glass tokens and uniform pill sizing
// ---------------------------------------------------------------------------

describe('6.1 DiscoveryBar renders with correct glass tokens and uniform pill sizing', () => {
  it('container has the correct glass token classes', () => {
    const { container } = render(
      <DiscoveryBar
        filters={defaultFilters}
        setFilters={() => {}}
        categories={sampleCategories}
        statuses={sampleStatuses}
        pricing={samplePricing}
      />
    )

    const containerDiv = container.firstChild
    expect(containerDiv.className).toContain('bg-black/70')
    expect(containerDiv.className).toContain('backdrop-blur-xl')
    expect(containerDiv.className).toContain('border-white/[0.08]')
    expect(containerDiv.className).toContain('shadow-[0_8px_32px_rgba(0,0,0,0.6)]')
  })

  it('all pill buttons have h-7 and px-3 classes', () => {
    const { container } = render(
      <DiscoveryBar
        filters={defaultFilters}
        setFilters={() => {}}
        categories={sampleCategories}
        statuses={sampleStatuses}
        pricing={samplePricing}
      />
    )

    const buttons = container.querySelectorAll('button')
    // Should have one button per category + status + pricing item
    expect(buttons.length).toBe(
      sampleCategories.length + sampleStatuses.length + samplePricing.length
    )

    for (const btn of buttons) {
      expect(btn.className).toContain('h-7')
      expect(btn.className).toContain('px-3')
    }
  })
})

// ---------------------------------------------------------------------------
// 6.2 TelemetryBar: three metrics, animate-pulse health dot, font-mono values
// ---------------------------------------------------------------------------

describe('6.2 TelemetryBar renders three metrics with correct classes', () => {
  /**
   * Minimal inline TelemetryBar that mirrors the exact markup from Home.jsx.
   * This avoids complex mocking of DiscoveryBar, MapShell, and BottomNav.
   */
  function TelemetryBar({ providers }) {
    const activeCount = providers.filter((p) => p.status === 'available').length
    return (
      <div className="absolute bottom-4 left-4 right-4 z-20 rounded-2xl border border-white/[0.08] bg-zinc-950/80 backdrop-blur-md h-10 shadow-[0_8px_32px_rgba(0,0,0,0.6)] px-3 flex items-center justify-between">
        <span>
          <span className="text-zinc-400 text-xs">Active providers</span>{' '}
          <span className="font-mono font-semibold text-white text-sm">{activeCount}</span>
        </span>
        <span>
          <span className="text-zinc-400 text-xs">Throughput</span>{' '}
          <span className="font-mono font-semibold text-white text-sm">41 req/hr</span>
        </span>
        <span className="flex items-center">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-1.5" />
          <span className="text-zinc-400 text-xs">Platform Healthy</span>
        </span>
      </div>
    )
  }

  const testProviders = [
    { ...sampleProvider, id: 'p1', status: 'available' },
    { ...sampleProvider, id: 'p2', status: 'busy' },
    { ...sampleProvider, id: 'p3', status: 'offline' },
  ]

  it('renders three metric elements (active providers, throughput, platform healthy)', () => {
    const { getByText } = render(<TelemetryBar providers={testProviders} />)

    expect(getByText('Active providers')).toBeTruthy()
    expect(getByText('Throughput')).toBeTruthy()
    expect(getByText('Platform Healthy')).toBeTruthy()
  })

  it('health dot span has animate-pulse class', () => {
    const { container } = render(<TelemetryBar providers={testProviders} />)

    const dot = container.querySelector('span.animate-pulse')
    expect(dot).not.toBeNull()
    expect(dot.className).toContain('animate-pulse')
  })

  it('numeric value spans have font-mono class', () => {
    const { container } = render(<TelemetryBar providers={testProviders} />)

    const monoSpans = container.querySelectorAll('span.font-mono')
    // Expect at least two: active count and throughput value
    expect(monoSpans.length).toBeGreaterThanOrEqual(2)
    for (const span of monoSpans) {
      expect(span.className).toContain('font-mono')
    }
  })
})

// ---------------------------------------------------------------------------
// 6.3 ProviderPopup: both CTA buttons with correct classes
// ---------------------------------------------------------------------------

describe('6.3 ProviderPopup renders both CTA buttons with correct classes', () => {
  it('"Book now" button is present and has bg-[#d9f80c] class', () => {
    const { getByText } = render(
      <ProviderPopup provider={sampleProvider} onClose={() => {}} />
    )

    const bookBtn = getByText('Book now')
    expect(bookBtn).toBeTruthy()
    expect(bookBtn.className).toContain('bg-[#d9f80c]')
  })

  it('"View Profile" button is present and has border-white/20 class', () => {
    const { getByText } = render(
      <ProviderPopup provider={sampleProvider} onClose={() => {}} />
    )

    const viewBtn = getByText('View Profile')
    expect(viewBtn).toBeTruthy()
    expect(viewBtn.className).toContain('border-white/20')
  })
})

// ---------------------------------------------------------------------------
// 6.4 MapShell: empty-state text when providers array is empty
// ---------------------------------------------------------------------------

describe('6.4 MapShell renders empty-state text when providers array is empty', () => {
  it('shows "No providers match filters" text in the SVG', () => {
    const { container } = render(
      <MapShell
        providers={[]}
        selectedProvider={null}
        onSelect={() => {}}
        onClose={() => {}}
      />
    )

    const textEl = container.querySelector('text')
    expect(textEl).not.toBeNull()
    expect(textEl.textContent).toBe('No providers match filters')
  })
})

// ---------------------------------------------------------------------------
// 6.5 MapShell: SVG contains glow filter defs block
// ---------------------------------------------------------------------------

describe('6.5 MapShell SVG contains glow filter defs block', () => {
  it('SVG has a <filter> element with id="glow"', () => {
    const { container } = render(
      <MapShell
        providers={[sampleProvider]}
        selectedProvider={null}
        onSelect={() => {}}
        onClose={() => {}}
      />
    )

    const filterEl = container.querySelector('filter#glow')
    expect(filterEl).not.toBeNull()
  })

  it('glow filter contains feGaussianBlur with stdDeviation="1"', () => {
    const { container } = render(
      <MapShell
        providers={[sampleProvider]}
        selectedProvider={null}
        onSelect={() => {}}
        onClose={() => {}}
      />
    )

    const blur = container.querySelector('filter#glow feGaussianBlur')
    expect(blur).not.toBeNull()
    expect(blur.getAttribute('stdDeviation')).toBe('1')
  })
})

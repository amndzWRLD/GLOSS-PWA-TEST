export type ProviderStatus = 'available' | 'busy' | 'offline'
export type PricingTier = '$' | '$$' | '$$$'

export interface Provider {
  id: string
  name: string
  avatar: string
  status: ProviderStatus
  rating: number
  reviews: number
  completedServices: number
  pricingTier: PricingTier
  etaMinutes: number
  x: number
  y: number
  serviceCategories: string[]
  description: string
}

export interface MarketplaceFilters {
  query: string
  categories: string[]
  statuses: ProviderStatus[]
  pricingTiers: PricingTier[]
}

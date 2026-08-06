export const providers = [
  { id: 'p1', name: 'Noir Auto Atelier', avatar: 'NA', status: 'available', rating: 4.9, reviews: 248, completedServices: 1320, pricingTier: '$$$', etaMinutes: 12, lat: 9.9194, lng: -84.1417, x: 24, y: 34, serviceCategories: ['Ceramic', 'Full Detail'], description: 'Signature paint correction and gloss restoration for luxury fleets.' },
  { id: 'p2', name: 'Velocity Detail Lab', avatar: 'VD', status: 'busy', rating: 4.8, reviews: 182, completedServices: 940, pricingTier: '$$', etaMinutes: 19, lat: 9.9985, lng: -84.1165, x: 58, y: 22, serviceCategories: ['Wash', 'Interior', 'Ceramic'], description: 'Mobile detail specialists with premium interior reconditioning.' },
  { id: 'p3', name: 'Apex Finish Co.', avatar: 'AF', status: 'offline', rating: 4.7, reviews: 115, completedServices: 710, pricingTier: '$$', etaMinutes: 0, lat: 9.9152, lng: -84.0389, x: 71, y: 61, serviceCategories: ['Polish', 'Correction'], description: 'Paint correction studio focused on swirl-free mirror finishes.' },
  { id: 'p4', name: 'Lumen Detailing', avatar: 'LD', status: 'available', rating: 5.0, reviews: 96, completedServices: 508, pricingTier: '$$$', etaMinutes: 8, lat: 9.9281, lng: -84.0907, x: 41, y: 73, serviceCategories: ['Ceramic', 'PPF', 'Wash'], description: 'Concierge detailing for performance vehicles and collectibles.' },
]

export const categoryOptions = ['All', 'Wash', 'Interior', 'Full Detail', 'Ceramic', 'PPF', 'Polish']
export const statusOptions = ['available', 'busy', 'offline']
export const pricingOptions = ['$', '$$', '$$$']
export default function RatingStars({ rating, size = 'sm' }) {
  const sizes = { sm: 'text-sm', md: 'text-base', lg: 'text-xl' }
  
  return (
    <div className={`flex items-center gap-1 ${sizes[size]}`}>
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < Math.floor(rating) ? 'text-gloss-yellow' : 'text-gray-600'}>
          ★
        </span>
      ))}
      <span className="ml-1 text-gray-400">{rating}</span>
    </div>
  )
}

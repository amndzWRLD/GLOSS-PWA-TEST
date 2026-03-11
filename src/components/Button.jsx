export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const variants = {
    primary: 'bg-gloss-yellow text-black font-bold hover:bg-gloss-green',
    secondary: 'bg-dark-card border border-dark-border text-white hover:border-gloss-yellow'
  }

  return (
    <button 
      className={`px-6 py-3 rounded-xl transition-all ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

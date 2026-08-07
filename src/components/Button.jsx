export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const variants = {
    primary: 'bg-gloss-yellow text-black font-bold hover:bg-gloss-green',
    secondary: 'bg-gloss-lightCard border border-gloss-lightBorder text-gray-900 hover:border-gloss-yellow dark:bg-gloss-darkCard dark:border-gloss-darkBorder dark:text-white'
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

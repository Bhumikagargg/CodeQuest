export function Button({ children, className = "", variant = "default", size = "default", onClick, ...props }) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border-2 border-white border-opacity-30 text-white hover:bg-white hover:bg-opacity-10",
  }

  const sizes = {
    default: "h-10 py-2 px-4",
    lg: "h-11 px-8 py-4",
  }

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`

  return (
    <button className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  )
}

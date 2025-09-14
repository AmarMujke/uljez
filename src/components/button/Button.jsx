export default function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`active:scale-95 active:translate-y-1 transition-transform 
                  ${className}`}
    >
      {children}
    </button>
  );
}

// src/components/ui/button.jsx
export function Button({ children, className = '', ...props }) {
    return (
      <button
        {...props}
        className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 ${className}`}
      >
        {children}
      </button>
    );
  }
  
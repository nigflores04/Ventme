import React from "react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  touched?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, touched, ...props }, ref) => {
    const hasError = error && touched

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={props.id || props.name}
            className="block text-sm font-medium text-foreground"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          className={`
            block w-full px-3 py-2 border rounded-lg shadow-sm
            bg-card text-card-foreground
            focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring
            ${
              hasError
                ? "border-destructive focus:ring-destructive focus:border-destructive"
                : "border-border"
            }
            ${className || ""}
          `.trim()}
          ref={ref}
          {...props}
        />
        {hasError && <p className="text-sm text-destructive">{error}</p>}
      </div>
    );
  }
)

Input.displayName = "Input"

export default Input

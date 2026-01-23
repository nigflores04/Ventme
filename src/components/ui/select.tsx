import React from "react"

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  touched?: boolean
  options: SelectOption[]
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, touched, options, ...props }, ref) => {
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
        <select
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
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {hasError && <p className="text-sm text-destructive">{error}</p>}
      </div>
    );
  }
)

Select.displayName = "Select"

export default Select

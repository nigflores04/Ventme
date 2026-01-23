import React from "react"
import { LuCircleDashed } from "react-icons/lu";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center !text-xs md:!text-sm justify-center cursor-pointer font-medium rounded-lg focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

    const variantClasses = {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      outline:
        "border border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
    };

    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base",
    };

    const classes = `
      ${baseClasses}
      ${variantClasses[variant]}
      ${sizeClasses[size]}
      ${className || ""}
    `.trim();

    return (
      <button
        className={classes}
        disabled={disabled || isLoading}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <LuCircleDashed className="animate-spin w-4 h-4" />
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button"

export  default Button

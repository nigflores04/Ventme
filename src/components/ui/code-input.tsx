"use client";

import React, { useRef, useEffect } from "react";

interface CodeInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  touched?: boolean;
  disabled?: boolean;
  length?: number;
}

export default function CodeInput({
  value,
  onChange,
  onBlur,
  error,
  touched,
  disabled = false,
  length = 4,
}: CodeInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  const handleChange = (index: number, inputValue: string) => {
    // Only allow digits
    const digit = inputValue.replace(/\D/g, "").slice(-1);
    
    const newValue = value.split("");
    newValue[index] = digit;
    
    // Fill empty spots with empty strings
    while (newValue.length < length) {
      newValue.push("");
    }
    
    const updatedValue = newValue.join("").slice(0, length);
    onChange(updatedValue);

    // Auto-focus next input
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    onChange(pastedData);
    
    // Focus the next empty input or the last input
    const nextIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="space-y-2">

      <div className="flex space-x-3 justify-center">
        {Array.from({ length }, (_, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value[index] || ""}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            onBlur={onBlur}
            disabled={disabled}
            className={`
              w-12 h-12 text-center text-lg font-semibold border rounded-lg
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              ${error && touched 
                ? "border-red-300 bg-red-50" 
                : "border-gray-300 bg-white hover:border-gray-400"
              }
              ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
            `}
          />
        ))}
      </div>
      {error && touched && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}

// src/components/Button.jsx
import React from "react";
import clsx from "clsx";

function Button({
  children,
  variant = "filled",
  shape = "default",
  className = "",
  ...props
}) {
  const baseStyle =
    "inline-block text-sm capitalize font-semibold px-6 py-3 transition-colors duration-300 border cursor-pointer";

  const shapeStyles = {
    default: "rounded-md",
    rounded: "rounded-full",
  };

  const variantStyles = {
    filled:
      "bg-[var(--color-sb-yellow)] text-[var(--color-sb-black)] border-transparent hover:bg-[var(--color-sb-yellow-dark)]",
    outline:
      "bg-transparent text-white border-white hover:text-[var(--color-sb-yellow)] hover:border-[var(--color-sb-yellow)]",
  };

  return (
    <button
      className={clsx(
        baseStyle,
        shapeStyles[shape],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;

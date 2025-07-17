// src/components/Button.jsx
import React from 'react';
import styles from './Button.module.css'; // Impor CSS Module

const Button = ({
  variant = "filled", // 'filled' atau 'outline'
  shape = "default",  // 'default' atau 'rounded'
  className,
  children,
  ...props
}) => {
  // Menggabungkan kelas-kelas CSS secara dinamis
  const buttonClasses = [
    styles.button,         // Style dasar
    styles[variant],       // Style dari prop 'variant'
    styles[shape],         // Style dari prop 'shape'
    className || ''        // Kelas tambahan dari luar
  ].join(' '); // Menggabungkan semua kelas menjadi satu string

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
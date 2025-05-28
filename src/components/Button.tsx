import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'outlined' | 'text';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
  size = 'md',
  type = 'button',
}) => {
  const baseStyles = 'uppercase tracking-wider font-light transition-all duration-300 inline-flex items-center justify-center';
  
  const variantStyles = {
    primary: 'bg-gold-400 text-black hover:bg-gold-500',
    outlined: 'border border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-black',
    text: 'text-gold-400 hover:text-gold-500',
  };
  
  const sizeStyles = {
    sm: 'text-xs px-4 py-1.5',
    md: 'text-sm px-6 py-2.5',
    lg: 'text-base px-8 py-3.5',
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
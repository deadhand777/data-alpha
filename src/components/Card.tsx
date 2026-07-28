import type { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined';
}

export const Card = ({
  variant = 'default',
  className,
  children,
  ...props
}: CardProps) => {
  const baseClasses = 'rounded-lg border overflow-hidden';

  const variantClasses = {
    default: 'bg-white border-gray-200',
    elevated: 'bg-white shadow-sm border-gray-200 hover:shadow-md transition-shadow',
    outlined: 'bg-transparent border-2 border-gray-300'
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className ?? ''}`}
      {...props}
    >
      {children}
    </div>
  );
};
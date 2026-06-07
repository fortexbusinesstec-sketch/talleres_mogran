'use client';

import { HTMLAttributes, forwardRef } from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'primary' | 'accent';
  size?: 'sm' | 'md';
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    const variantStyles = {
      success: 'bg-mogran-accent/10 text-mogran-accent border border-mogran-accent/20',
      warning: 'bg-mogran-warning/10 text-mogran-warning border border-mogran-warning/20',
      danger: 'bg-mogran-danger/10 text-mogran-danger border border-mogran-danger/20',
      info: 'bg-mogran-info/10 text-mogran-info border border-mogran-info/20',
      primary: 'bg-mogran-accent/10 text-mogran-accent border border-mogran-accent/20',
      accent: 'bg-mogran-accent/10 text-mogran-accent border border-mogran-accent/20',
    };

    const sizeStyles = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm',
    };

    return (
      <span
        ref={ref}
        className={`inline-flex items-center font-medium rounded-full ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
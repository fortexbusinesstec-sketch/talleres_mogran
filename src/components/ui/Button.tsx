'use client';

import { forwardRef, ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import { IconArrowRight } from '@tabler/icons-react';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const variantStyles: Record<Variant, string> = {
  primary: 'bg-mogran-primary text-white hover:bg-mogran-primary-hover shadow-lg shadow-mogran-primary/20',
  secondary: 'border-2 border-mogran-secondary text-mogran-secondary hover:bg-mogran-secondary hover:text-white',
  ghost: 'text-mogran-neutral hover:text-mogran-secondary hover:bg-mogran-tertiary',
};

const sizeStyles: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-base gap-2',
  lg: 'px-8 py-4 text-lg gap-2.5',
};

const baseStyles =
  'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-mogran-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-50 disabled:cursor-not-allowed';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  withArrow?: boolean;
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'primary', size = 'md', fullWidth = false, withArrow = false, className = '', children, disabled, ...props },
    ref
  ) => {
    const widthStyles = fullWidth ? 'w-full' : '';
    const cls = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`;

    return (
      <button ref={ref} className={cls} disabled={disabled} {...props}>
        {children}
        {withArrow && <IconArrowRight size={20} strokeWidth={2.5} aria-hidden="true" />}
      </button>
    );
  }
);

Button.displayName = 'Button';

export interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  withArrow?: boolean;
  children?: ReactNode;
}

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ variant = 'primary', size = 'md', fullWidth = false, withArrow = false, className = '', children, ...props }, ref) => {
    const widthStyles = fullWidth ? 'w-full' : '';
    const cls = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`;

    return (
      <a ref={ref} className={cls} {...props}>
        {children}
        {withArrow && <IconArrowRight size={20} strokeWidth={2.5} aria-hidden="true" />}
      </a>
    );
  }
);

ButtonLink.displayName = 'ButtonLink';


import { forwardRef } from 'react';
import { cn } from '../../lib/utils'; // we'll create this tiny helper

const Button = forwardRef(({ className, variant = 'primary', size = 'md', ...props }, ref) => {
  const variants = {
    primary: 'bg-primary hover:bg-primary-light text-white shadow-sm',
    outline: 'border border-border bg-transparent hover:bg-surface text-text-primary',
    ghost: 'hover:bg-surface text-text-secondary hover:text-text-primary',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-7 py-3 text-lg',
  };

  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
});

Button.displayName = 'Button';
export default Button;
import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

const Input = forwardRef(({ className, type, error, ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        'flex h-11 w-full rounded-lg bg-surface border border-border px-4 py-2.5 text-sm text-text-primary',
        'placeholder:text-text-tertiary',
        'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent',
        'disabled:cursor-not-allowed disabled:opacity-50',
        error && 'border-error focus:ring-error/50',
        className
      )}
      {...props}
    />
  );
});

Input.displayName = 'Input';
export default Input;
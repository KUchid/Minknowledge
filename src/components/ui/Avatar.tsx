import React from 'react';
import { cn } from '@/lib/utils';

interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: 'sm' | 'md' | 'lg';
}

const Avatar = React.forwardRef<HTMLImageElement, AvatarProps>(
  ({ className, size = 'md', alt, ...props }, ref) => {
    const sizes = {
      sm: 'h-8 w-8',
      md: 'h-10 w-10',
      lg: 'h-12 w-12'
    };

    return (
      <img
        ref={ref}
        className={cn(
          'rounded-full object-cover ring-2 ring-white',
          sizes[size],
          className
        )}
        alt={alt}
        {...props}
      />
    );
  }
);

Avatar.displayName = 'Avatar';

export default Avatar;
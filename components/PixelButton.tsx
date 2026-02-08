import React from 'react';

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: string;
    variant?: 'primary' | 'secondary';
}

export const PixelButton: React.FC<PixelButtonProps> = ({
    children,
    icon,
    variant = 'primary',
    className = "",
    disabled,
    ...props
}) => {
    const baseClasses = "w-full h-14 font-black text-2xl tracking-widest uppercase rounded-sm shadow-lg flex items-center justify-center gap-2 group/btn transition-all disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-gradient-to-b from-[#84cc16] to-[#65a30d] border-b-[6px] border-r-[6px] border-[#3f6212] active:border-b-0 active:border-r-0 active:translate-y-1 active:translate-x-1 text-white hover:brightness-110",
        secondary: "bg-gradient-to-b from-sky to-[#0ea5e9] border-b-[6px] border-r-[6px] border-[#0369a1] active:border-b-0 active:border-r-0 active:translate-y-1 active:translate-x-1 text-white hover:brightness-110"
    };

    return (
        <button
            className={`${baseClasses} ${variants[variant]} ${className} ${!disabled && variant === 'primary' ? 'animate-pulse-glow' : ''}`}
            disabled={disabled}
            {...props}
        >
            {icon && (
                <span className="material-symbols-outlined group-hover/btn:rotate-12 transition-transform">
                    {icon}
                </span>
            )}
            {children}
        </button>
    );
};

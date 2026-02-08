import React from 'react';

interface PixelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon: string;
    label: string;
}

export const PixelInput: React.FC<PixelInputProps> = ({ icon, label, className = "", ...props }) => {
    return (
        <label className="flex flex-col gap-1 w-full">
            <span className="text-wood-border font-pixel text-xl font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">{icon}</span>
                {label}
            </span>
            <div className="relative">
                <input
                    className={`
            w-full h-12 px-4 
            bg-input-bg 
            border-4 border-wood-dark 
            focus:border-primary 
            text-wood-shadow font-pixel text-xl 
            placeholder-[#bcaaa4] 
            focus:outline-none focus:ring-0 
            shadow-[inset_4px_4px_0_rgba(0,0,0,0.1)] 
            transition-colors
            ${className}
          `}
                    {...props}
                />
            </div>
        </label>
    );
};

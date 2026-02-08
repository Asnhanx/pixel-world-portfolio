import React from 'react';

export const LoginBackground: React.FC = () => {
    return (
        <div className="absolute inset-0 z-0 bg-sky overflow-hidden">
            {/* Abstract gradient sky */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#5bc2e7] via-[#94dff3] to-[#cbf0f8]"></div>

            {/* Distant Clouds / Pixel Art Scenery */}
            <div
                className="absolute inset-0 bg-repeat-x bg-bottom h-full w-full opacity-30"
                style={{
                    backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAEwnSqXEVZpfgRyg66JN6apDCMU4FH8Vm5ikSWGDtFb-Pj7c1E0SGsR5kdXw6b15igLzW-Xpoq2eff9MwC8dQUDg_sAeKlXlCd4-8tzxEz2iDPAOpbnc1rW6gDO9htuPeaWs2zlqkKZNloiYxQSX5LEC1swQVzu2CT49ICCqeqrm-OiUQ1bbkdn8UqKmYX_R1qGXrn6N_MrlJ2M7Akq6W-A7qdebYRc9LtxEGiZ-zv1EhnDABO44qHUWVNuvI8yqCvu926d1EZKLLh')",
                    backgroundSize: 'cover',
                    filter: 'pixelate(8px)'
                }}
            >
                <div className="absolute inset-0 bg-white/40 mix-blend-overlay"></div>
            </div>

            {/* Mountain Silhouette */}
            <div
                className="absolute bottom-0 left-0 right-0 h-1/2 bg-cover bg-bottom opacity-80 mix-blend-multiply"
                data-alt="Pixelated mountain range silhouette"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1519681393784-d8e5b56524dd?q=80&w=2070&auto=format&fit=crop')",
                    imageRendering: 'pixelated',
                    filter: 'contrast(1.2) brightness(0.9)'
                }}
            ></div>

            {/* Lush Valley Foreground Ground */}
            <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-[#4f8f2d] to-[#7ec850]">
                {/* Pattern for grass */}
                <div
                    className="w-full h-full opacity-20"
                    style={{
                        backgroundImage: 'radial-gradient(#3e7023 2px, transparent 2px)',
                        backgroundSize: '16px 16px'
                    }}
                ></div>
            </div>

            {/* Pixel Bird Animation */}
            <div className="absolute w-12 h-12 animate-bird-fly z-10 top-[20%]">
                <span className="material-symbols-outlined text-white drop-shadow-md text-4xl transform rotate-12">flutter_dash</span>
            </div>

            {/* Decorative Foreground Elements (Desktop only) */}
            <div className="fixed bottom-0 left-10 hidden lg:block z-30 pointer-events-none">
                <div
                    className="w-32 h-32 bg-contain bg-no-repeat opacity-90"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1596728373268-7b9589d9852f?q=80&w=200&auto=format&fit=crop')",
                        imageRendering: 'pixelated'
                    }}
                ></div>
            </div>
            <div className="fixed bottom-0 right-10 hidden lg:block z-30 pointer-events-none">
                <div
                    className="w-40 h-40 bg-contain bg-no-repeat opacity-90 transform scale-x-[-1]"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1599596323864-445889218694?q=80&w=200&auto=format&fit=crop')",
                        imageRendering: 'pixelated'
                    }}
                ></div>
            </div>
        </div>
    );
};

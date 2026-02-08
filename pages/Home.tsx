import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { postsAPI, Post } from '../services/api';

const SakuraPetal: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
    <div className="sakura-petal" style={style}></div>
);

const Home: React.FC = () => {
    // Generate some random petals
    const [petals, setPetals] = useState<React.CSSProperties[]>([]);
    const [latestPost, setLatestPost] = useState<Post | null>(null);

    useEffect(() => {
        const newPetals = Array.from({ length: 15 }).map((_, i) => ({
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 90}%`,
            animation: `float ${5 + Math.random() * 5}s infinite linear`,
            animationDelay: `-${Math.random() * 5}s`,
            opacity: 0.6 + Math.random() * 0.4,
            transform: `rotate(${Math.random() * 360}deg)`
        }));
        setPetals(newPetals);

        // Fetch latest post
        const fetchLatestPost = async () => {
            try {
                const post = await postsAPI.getLatest();
                setLatestPost(post);
            } catch (err) {
                console.error('Failed to fetch latest post:', err);
            }
        };
        fetchLatestPost();
    }, []);

    const formatReadTime = (content?: string) => {
        if (!content) return '3 MIN READ';
        const words = content.split(/\s+/).length;
        const minutes = Math.ceil(words / 200);
        return `${minutes} MIN READ`;
    };

    return (
        <div className="bg-sky-vibrant h-screen w-full overflow-hidden text-ink-dark font-pixel-body relative">
            <style>{`
                @keyframes float {
                    0% { transform: translateY(0) rotate(0deg); }
                    100% { transform: translateY(100px) rotate(360deg); }
                }
            `}</style>

            {/* Background Layers */}
            <div className="fixed inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-sky-400 to-sky-100"></div>
                <div className="absolute bottom-0 w-full h-[60%] bg-gradient-to-t from-zen-green to-transparent opacity-40"></div>

                {/* Far Trees */}
                <div className="absolute bottom-[20%] w-full h-40 flex items-end justify-around px-10 opacity-60">
                    <div className="w-16 h-24 pixel-tree-shape rounded-t-full"></div>
                    <div className="w-20 h-32 pixel-tree-shape rounded-t-full"></div>
                    <div className="w-12 h-20 pixel-tree-shape rounded-t-full"></div>
                    <div className="w-24 h-40 pixel-tree-shape rounded-t-full"></div>
                    <div className="w-16 h-28 pixel-tree-shape rounded-t-full"></div>
                </div>

                {/* Waterfall */}
                <div className="absolute left-10 top-1/4 w-20 h-3/4 bg-slate-300/30 rounded-t-xl overflow-hidden">
                    <div className="waterfall-pixel animate-pulse"></div>
                    <div className="absolute bottom-0 w-full h-10 bg-white/40 blur-sm"></div>
                </div>

                {/* Foreground Tree (Right) */}
                <div className="absolute right-[-5%] bottom-0 w-1/3 h-[90%] z-10 pointer-events-none">
                    <div className="absolute bottom-0 left-1/2 w-12 h-full bg-[#5D4037] shadow-pixel"></div>
                    <div className="absolute top-10 left-0 w-full h-2/3">
                        <div className="absolute top-0 left-1/4 w-40 h-40 bg-sakura-pink rounded-full opacity-90 blur-xl"></div>
                        <div className="absolute top-20 right-1/4 w-52 h-48 bg-deep-sakura rounded-full opacity-80 blur-lg"></div>
                        {petals.map((style, i) => (
                            <SakuraPetal key={i} style={style} />
                        ))}
                    </div>
                </div>

                {/* Path */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1/3 z-0" style={{ clipPath: 'polygon(20% 0, 80% 0, 100% 100%, 0% 100%)' }}>
                    <div className="w-full h-full bg-path-grey opacity-40"></div>
                    <div className="absolute top-4 left-1/3 w-12 h-8 bg-gray-500/30 rounded-full"></div>
                    <div className="absolute top-12 right-1/4 w-16 h-10 bg-gray-500/40 rounded-full"></div>
                    <div className="absolute top-24 left-1/2 w-20 h-12 bg-gray-400/30 rounded-full"></div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="fixed top-8 right-8 z-50 flex flex-col gap-6 items-end">
                <Link to="/" className="group flex items-center gap-3">
                    <span className="bg-paper-cream px-4 py-2 dialogue-border font-pixel-title text-lg group-hover:bg-sakura-pink transition-colors">首页</span>
                    <div className="w-10 h-10 bg-amber-800 dialogue-border flex items-center justify-center text-white">
                        <span className="material-symbols-outlined text-sm">home</span>
                    </div>
                </Link>
                <Link to="/blog" className="group flex items-center gap-3">
                    <span className="bg-paper-cream px-4 py-2 dialogue-border font-pixel-title text-lg group-hover:bg-sakura-pink transition-colors">博客</span>
                    <div className="w-10 h-10 bg-amber-800 dialogue-border flex items-center justify-center text-white">
                        <span className="material-symbols-outlined text-sm">book</span>
                    </div>
                </Link>
                <Link to="/projects" className="group flex items-center gap-3">
                    <span className="bg-paper-cream px-4 py-2 dialogue-border font-pixel-title text-lg group-hover:bg-sakura-pink transition-colors">作品</span>
                    <div className="w-10 h-10 bg-amber-800 dialogue-border flex items-center justify-center text-white">
                        <span className="material-symbols-outlined text-sm">palette</span>
                    </div>
                </Link>
                <button className="group flex items-center gap-3">
                    <span className="bg-paper-cream px-4 py-2 dialogue-border font-pixel-title text-lg group-hover:bg-sakura-pink transition-colors">关于</span>
                    <div className="w-10 h-10 bg-amber-800 dialogue-border flex items-center justify-center text-white">
                        <span className="material-symbols-outlined text-sm">person</span>
                    </div>
                </button>
            </nav>

            {/* Main Content */}
            <main className="relative z-30 h-full w-full flex items-center justify-center px-6 pointer-events-none">
                <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-between gap-12">

                    {/* Welcome Box */}
                    <div className="lg:w-1/2 pointer-events-auto">
                        <div className="bg-paper-cream dialogue-border p-10 relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="w-3 h-3 bg-red-400 rounded-full"></span>
                                    <span className="font-hand-drawn text-xl text-gray-400">系统提示: 欢迎归来</span>
                                </div>
                                <h1 className="font-pixel-title text-5xl md:text-6xl text-ink-dark mb-6 leading-tight">
                                    欢迎来到<br />
                                    <span className="text-deep-sakura">我的像素世界</span>
                                </h1>
                                <p className="font-pixel-body text-xl text-gray-600 mb-8 leading-relaxed max-w-md">
                                    在这个宁静的小角落，我记录着每一个闪光的瞬间。希望这些像素能为你带来一丝温暖。
                                </p>
                                <div className="flex gap-4">
                                    <Link to="/blog" className="bg-deep-sakura text-white px-8 py-4 dialogue-border font-pixel-title text-xl hover:translate-y-1 transition-transform inline-block">
                                        博客
                                    </Link>
                                    <Link to="/projects" className="bg-white text-ink-dark px-8 py-4 dialogue-border font-pixel-title text-xl hover:translate-y-1 transition-transform inline-block">
                                        作品集
                                    </Link>
                                </div>
                            </div>
                            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-sakura-pink/20 rounded-full blur-2xl"></div>
                        </div>

                        {/* Recent Update Small Box - Now Dynamic */}
                        <div className="mt-8 bg-black/60 backdrop-blur-md p-4 dialogue-border border-white/40 max-w-sm">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-zen-green dialogue-border flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-white">auto_awesome</span>
                                </div>
                                <div className="text-white">
                                    <span className="text-[10px] font-pixel-title text-sakura-pink uppercase tracking-widest">最新动态</span>
                                    {latestPost ? (
                                        <>
                                            <h3 className="font-hand-drawn text-lg">{latestPost.title}</h3>
                                            <p className="text-[10px] font-pixel-body opacity-60">
                                                {new Date(latestPost.created_at).toISOString().slice(0, 10).replace(/-/g, '.')} • {formatReadTime(latestPost.content)}
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <h3 className="font-hand-drawn text-lg">加载中...</h3>
                                            <p className="text-[10px] font-pixel-body opacity-60">请稍候</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Character/Avatar Area */}
                    <div className="lg:w-1/2 relative h-[400px] flex items-end justify-center pointer-events-auto">
                        <div className="relative w-64 h-80">
                            <div className="absolute inset-0 z-20 transition-transform hover:scale-105 duration-500">
                                {/* Pixel Character Avatar */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#FFE0BD] dialogue-border overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-10 bg-ink-dark"></div>
                                    <div className="absolute top-0 left-0 w-4 h-16 bg-ink-dark"></div>
                                    <div className="absolute top-0 right-0 w-4 h-16 bg-ink-dark"></div>
                                    <div className="absolute top-16 left-6 w-3 h-5 bg-ink-dark"></div>
                                    <div className="absolute top-16 right-6 w-3 h-5 bg-ink-dark"></div>
                                    <div className="absolute top-22 left-4 w-4 h-1 bg-sakura-pink"></div>
                                    <div className="absolute top-22 right-4 w-4 h-1 bg-sakura-pink"></div>
                                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-4 h-2 bg-deep-sakura rounded-b-full"></div>
                                </div>
                                {/* Character Body */}
                                <div className="absolute top-32 left-1/2 -translate-x-1/2 w-28 h-32 bg-sky-300 dialogue-border z-10">
                                    <div className="w-full h-4 bg-white/30 mt-4"></div>
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-8 bg-deep-sakura/50"></div>
                                </div>
                            </div>

                            {/* Floating Mascot */}
                            <div className="absolute -top-12 -right-8 z-30 animate-bounce">
                                <div className="w-14 h-14 bg-white dialogue-border relative rotate-12">
                                    <div className="absolute -top-3 left-0 w-4 h-4 bg-white dialogue-border -rotate-45"></div>
                                    <div className="absolute -top-3 right-0 w-4 h-4 bg-white dialogue-border rotate-45"></div>
                                    <div className="absolute top-5 left-3 w-1.5 h-1.5 bg-ink-dark"></div>
                                    <div className="absolute top-5 right-3 w-1.5 h-1.5 bg-ink-dark"></div>
                                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-2 h-1 bg-deep-sakura"></div>
                                </div>
                                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4 h-8 bg-white/40 blur-sm rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Music Player */}
            <div className="fixed bottom-8 left-8 z-50 pointer-events-auto">
                <div className="bg-paper-cream/90 backdrop-blur-sm dialogue-border p-4 flex items-center gap-4">
                    <div className="w-12 h-12 bg-deep-sakura dialogue-border flex items-center justify-center text-white">
                        <span className="material-symbols-outlined animate-spin">music_note</span>
                    </div>
                    <div>
                        <div className="font-pixel-title text-xs text-gray-400">正在播放</div>
                        <div className="font-hand-drawn text-lg">蒸汽波 - 浅草之夏 (Lofi)</div>
                        <div className="flex gap-2 mt-1">
                            <span className="material-symbols-outlined text-sm cursor-pointer hover:text-deep-sakura">fast_rewind</span>
                            <span className="material-symbols-outlined text-sm cursor-pointer hover:text-deep-sakura">pause</span>
                            <span className="material-symbols-outlined text-sm cursor-pointer hover:text-deep-sakura">fast_forward</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="fixed bottom-4 right-8 z-40 text-[10px] font-pixel-body flex gap-6 text-ink-dark/60">
                <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span>庭院正在维护中...</span>
                </div>
                <span>© 2023 像素物語 - 版权所有</span>
            </footer>

            {/* CRT Effect Overlay */}
            <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03]" style={{ background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 4px, 3px 100%' }}></div>
        </div>
    );
};

export default Home;
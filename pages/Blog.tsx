import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { postsAPI, Post } from '../services/api';

const Blog: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const postsPerPage = 6;

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const response = await postsAPI.getAll(currentPage, postsPerPage);
                setPosts(response.data);
                setTotalPages(response.pagination.totalPages);
                setError(null);
            } catch (err) {
                setError('无法加载博客文章');
                console.error('Failed to fetch posts:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [currentPage]);

    // Color mapping for categories
    const getCategoryColor = (category: string) => {
        const colors: Record<string, { bg: string; text: string; icon: string }> = {
            'design': { bg: 'bg-action-sky', text: 'text-action-sky', icon: 'forest' },
            'dev': { bg: 'bg-action-pink', text: 'text-action-pink', icon: 'local_florist' },
            'life': { bg: 'bg-action-orange', text: 'text-action-orange', icon: 'wb_sunny' },
        };
        return colors[category] || colors['design'];
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toISOString().slice(0, 10).replace(/-/g, '.');
    };

    return (
        <div className="bg-comic-bg text-black font-pixel selection:bg-action-lime selection:text-black h-screen w-full overflow-hidden flex flex-col relative">
            {/* Sky & Environment */}
            <div className="fixed inset-0 z-0 bg-sky-300" style={{ backgroundImage: 'linear-gradient(to bottom, #4facfe 0%, #00f2fe 100%)' }}></div>
            <div className="fixed pixel-cloud cloud-anim-1 opacity-80" style={{ animation: 'float-cloud 60s linear infinite', top: '10%', width: '100px', height: '30px' }}></div>
            <div className="fixed pixel-cloud cloud-anim-2 opacity-90" style={{ animation: 'float-cloud 85s linear infinite', top: '20%', width: '80px', height: '25px', animationDelay: '-30s' }}></div>
            <div className="fixed pixel-cloud cloud-anim-3 opacity-70" style={{ animation: 'float-cloud 70s linear infinite', top: '15%', width: '120px', height: '40px', animationDelay: '-10s' }}></div>

            <div className="fixed bottom-0 w-full h-[40vh] hill-bg z-0 opacity-90"></div>
            <div className="fixed bottom-0 w-full h-[25vh] hill-fg z-1 border-t-4 border-black"></div>

            {/* Trees */}
            <div className="fixed w-full h-full pointer-events-none z-2">
                <div className="absolute bottom-[25vh] left-[5%] pixel-tree-simple"></div>
                <div className="absolute bottom-[25vh] left-[8%] pixel-tree-simple scale-125 origin-bottom"></div>
                <div className="absolute bottom-[25vh] right-[10%] pixel-tree-simple"></div>
                <div className="absolute bottom-[25vh] right-[15%] pixel-tree-simple scale-125 origin-bottom"></div>
            </div>

            {/* Flowers */}
            <div className="fixed bottom-0 w-full h-[25vh] z-10 pointer-events-none">
                {[5, 15, 25, 35, 45, 55, 65, 75, 85].map((left, i) => (
                    <div key={i} className={`flower ${['bg-yellow-400', 'bg-red-400', 'bg-blue-400', 'bg-purple-400'][i % 4]}`} style={{ left: `${left}%` }}></div>
                ))}
            </div>

            {/* Sound Effect Text (Decorative) */}
            <div className="fixed top-10 left-10 z-0 opacity-90 pointer-events-none hidden lg:block">
                <div className="font-manga-title text-8xl text-white select-none tracking-widest rotate-[-5deg] drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
                    ザワザワ
                </div>
            </div>
            <div className="fixed bottom-20 right-10 z-0 opacity-90 pointer-events-none hidden lg:block">
                <div className="font-manga-title text-9xl text-white select-none tracking-widest rotate-[5deg] drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
                    ピカッ
                </div>
            </div>

            {/* Main Content Container */}
            <div className="relative z-20 flex flex-col w-full h-full max-w-6xl mx-auto bg-white/95 backdrop-blur-sm border-x-4 border-b-4 border-black border-t-0 shadow-2xl">

                {/* Header */}
                <header className="w-full p-4 md:p-6 flex justify-between items-center border-b-4 border-black bg-white relative overflow-hidden shrink-0">
                    <div className="absolute inset-0 bg-speed-lines opacity-30 pointer-events-none"></div>
                    <div className="absolute inset-0 screentone pointer-events-none"></div>
                    <div className="flex items-center gap-6 relative z-10">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-action-lime border-4 border-black shadow-comic flex items-center justify-center overflow-hidden">
                            <img alt="Protagonist" className="w-full h-full object-cover filter contrast-125 hover:brightness-110 transition-all duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9VTDiKni72H3EHEPTcS2G3_OF-nG9U9Qn8HJGhAv2gXCCKmD0HroUXq_LZ2DCdSaf4GjsDtx9J_JH5e_d1VpsBciQ_0buqHTUOLr-xp_aDy5sNk9_aNQYhLFwrBEKPleLIJT9F5Oqz34IBDt2X6XR4Zkzxw-OzZEGlH-TJF5zAJrY9J1aBfh2jH2_8k2UygaryK6fDj0GLZ9ACmpQjbUrNVRBXNVGMtIg1hwQBSVasTCP8MKANIJXnWZ-bPEuoezVj9_YAlZEkqst" />
                        </div>
                        <div className="bg-black text-white px-4 py-2 transform -skew-x-12 shadow-comic-sm group cursor-default">
                            <h1 className="font-manga-title text-3xl md:text-5xl tracking-widest transform skew-x-12 group-hover:text-action-lime transition-colors">
                                森林日志
                            </h1>
                        </div>
                    </div>
                    <nav className="hidden md:flex gap-4">
                        <Link className="font-manga-title text-xl px-6 py-2 border-2 border-black hover:bg-black hover:text-white transition-all shadow-comic hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] bg-white" to="/">首页</Link>
                        <Link className="font-manga-title text-xl px-6 py-2 border-2 border-black bg-action-lime text-black hover:bg-black hover:text-action-lime transition-all shadow-comic hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]" to="/blog">博客</Link>
                        <Link className="font-manga-title text-xl px-6 py-2 border-2 border-black hover:bg-black hover:text-white transition-all shadow-comic hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] bg-white" to="/projects">作品</Link>
                    </nav>
                    <button className="md:hidden p-2 border-4 border-black bg-white shadow-comic active:translate-y-1 active:shadow-none">
                        <span className="material-symbols-outlined text-3xl font-bold">menu</span>
                    </button>
                </header>

                {/* Content Area */}
                <main className="flex-grow overflow-y-auto relative p-6 md:p-8 bg-white/50">

                    {/* Intro Bubble */}
                    <div className="mb-12 relative max-w-4xl mx-auto">
                        <div className="relative bg-white border-4 border-black p-8 shadow-comic bubble-tail">
                            <div className="absolute top-0 left-0 w-full h-2 bg-action-sky border-b-2 border-black"></div>
                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                <div className="hidden md:block absolute -left-16 -top-10 transform -rotate-12">
                                    <div className="bg-action-orange text-black font-manga-title text-2xl px-4 py-2 border-2 border-black shadow-comic-sm animate-pulse">
                                        NEW!
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h2 className="font-manga-title text-3xl mb-4 border-b-4 border-action-lime inline-block pb-1">欢迎来到我的数字森林</h2>
                                    <p className="font-pixel text-lg leading-relaxed mt-2">
                                        这里不仅有代码，还有阳光和清新的空气。请随意探索这片像素化的自然之地。就像在树荫下阅读一本漫画。
                                    </p>
                                    <div className="mt-4 flex gap-2">
                                        <span className="px-2 py-1 border-2 border-black bg-action-lime text-xs font-mono font-bold">STATUS: EXPLORING</span>
                                        <span className="px-2 py-1 border-2 border-black bg-white text-xs font-mono">WEATHER: SUNNY</span>
                                    </div>
                                </div>
                                <div className="w-24 h-24 bg-action-lime opacity-30 absolute bottom-4 right-4 rounded-full pointer-events-none blur-xl"></div>
                            </div>
                        </div>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="flex justify-center items-center py-20">
                            <div className="font-manga-title text-2xl animate-pulse">加载中...</div>
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <div className="flex justify-center items-center py-20">
                            <div className="bg-red-100 border-4 border-red-500 px-6 py-4 font-pixel">
                                {error}
                            </div>
                        </div>
                    )}

                    {/* Blog Grid */}
                    {!loading && !error && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
                            {posts.map((post, index) => {
                                const colorConfig = getCategoryColor(post.category);
                                return (
                                    <article key={post.id} className="group relative bg-white border-4 border-black p-0 shadow-comic hover:shadow-comic-hover transition-all duration-200 hover:-translate-y-1 cursor-pointer overflow-hidden">
                                        <div className="absolute top-0 right-0 bg-black text-white px-2 py-1 font-mono text-sm z-20 border-l-4 border-b-4 border-black">#{String(index + 1).padStart(2, '0')}</div>
                                        <div className={`h-48 w-full border-b-4 border-black overflow-hidden relative ${colorConfig.bg} flex items-center justify-center`}>
                                            {post.cover_image ? (
                                                <>
                                                    <div className="absolute inset-0 opacity-50 z-10 mix-blend-multiply" style={{ backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIi8+CjxwYXRoIGQ9Ik0wIDBMOCA4Wk04IDBMMCA4WiIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjAuNSIgb3BhY2l0eT0iMC4xIi8+Cjwvc3ZnPg==')` }}></div>
                                                    <img alt={post.title} className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-110 transition-transform duration-500" src={post.cover_image} />
                                                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/80 to-transparent z-10 flex items-end p-2">
                                                        <span className="text-white font-manga-title text-4xl drop-shadow-[2px_2px_0_#000]">{post.category}</span>
                                                    </div>
                                                </>
                                            ) : (
                                                <span className={`material-symbols-outlined text-8xl text-white group-hover:scale-110 transition-transform duration-300 drop-shadow-[4px_4px_0_#000]`}>{colorConfig.icon}</span>
                                            )}
                                        </div>
                                        <div className="p-4 relative">
                                            <div className="absolute -top-6 right-4 bg-white border-2 border-black p-1 rounded-full z-20 shadow-sm">
                                                <span className={`material-symbols-outlined text-2xl ${colorConfig.text}`}>{colorConfig.icon}</span>
                                            </div>
                                            <h3 className={`font-manga-title text-2xl mb-2 group-hover:${colorConfig.text} transition-colors`}>{post.title}</h3>
                                            <p className="font-pixel text-sm text-gray-600 line-clamp-2 mb-4">{post.excerpt}</p>
                                            <div className="flex justify-between items-center border-t-2 border-dashed border-gray-300 pt-2">
                                                <span className={`font-mono font-bold ${colorConfig.bg} text-black border border-black px-1`}>{formatDate(post.created_at)}</span>
                                                <span className="font-pixel text-xs border border-black bg-white px-1 rounded-full">#{post.category}</span>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    )}

                    {/* Pagination */}
                    {!loading && !error && totalPages > 1 && (
                        <div className="flex justify-center items-center gap-4 mt-8 pb-12">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="w-12 h-12 bg-white border-4 border-black flex items-center justify-center hover:bg-black hover:text-action-lime shadow-comic active:shadow-none active:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span className="material-symbols-outlined text-3xl">chevron_left</span>
                            </button>
                            <div className="font-manga-title text-xl bg-white px-6 py-2 border-4 border-black shadow-comic transform -skew-x-12">
                                <span className="block transform skew-x-12">第 {currentPage} / {totalPages} 页</span>
                            </div>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="w-12 h-12 bg-white border-4 border-black flex items-center justify-center hover:bg-black hover:text-action-lime shadow-comic active:shadow-none active:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span className="material-symbols-outlined text-3xl">chevron_right</span>
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Blog;
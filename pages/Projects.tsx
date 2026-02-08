import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { projectsAPI, Project } from '../services/api';

const Projects: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                const response = await projectsAPI.getAll();
                setProjects(response.data);
                setError(null);
            } catch (err) {
                setError('无法加载项目列表');
                console.error('Failed to fetch projects:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    // Generate static positions for plants to avoid hydration issues or re-render randomness
    const plants = [
        { left: '5%', top: '30%', type: 'grass', delay: '0s' },
        { left: '10%', top: '80%', type: 'bush', delay: '0.5s' },
        { left: '15%', top: '60%', type: 'flower', color: '#ef4444', delay: '1s' },
        { left: '22%', top: '40%', type: 'grass', delay: '2.5s' },
        { left: '25%', top: '85%', type: 'bush', delay: '1.2s' },
        { left: '30%', top: '75%', type: 'flower', color: '#eab308', delay: '0.5s' },
        { left: '38%', top: '50%', type: 'grass', delay: '1.5s' },
        { left: '42%', top: '20%', type: 'bush', delay: '2.0s' },
        { left: '45%', top: '80%', type: 'grass', delay: '0.2s' },
        { left: '52%', top: '60%', type: 'bush', delay: '1.8s' },
        { left: '58%', top: '35%', type: 'flower', color: '#a855f7', delay: '2s' },
        { left: '68%', top: '65%', type: 'grass', delay: '1.2s' },
        { left: '72%', top: '90%', type: 'bush', delay: '0.7s' },
        { left: '78%', top: '85%', type: 'grass', delay: '0.8s' },
        { left: '85%', top: '45%', type: 'flower', color: '#ec4899', delay: '1.8s' },
        { left: '88%', top: '75%', type: 'bush', delay: '1.5s' },
        { left: '92%', top: '70%', type: 'grass', delay: '0.3s' },
        { left: '96%', top: '25%', type: 'grass', delay: '2.2s' },
    ];

    // Get tech stack abbreviation
    const getTechAbbrev = (tech: string) => {
        const abbrevMap: Record<string, string> = {
            'React': 'R', 'Next.js': 'N', 'Vue': 'V', 'Node.js': 'No',
            'Tailwind': 'T', 'MongoDB': 'M', 'Python': 'Py', 'FastAPI': 'F',
            'PostgreSQL': 'PG', 'TypeScript': 'TS', 'JavaScript': 'JS',
        };
        return abbrevMap[tech] || tech.substring(0, 2);
    };

    return (
        <div className="h-screen w-full overflow-hidden flex flex-col items-center justify-center font-retro text-gray-800 relative bg-[#87CEEB]">
            {/* Background Landscape */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {/* Clouds */}
                <div className="absolute top-[10%] left-[10%] w-[60px] h-[20px] pixel-cloud-retro cloud-h" style={{ animation: 'float-h 20s linear infinite' }}></div>
                <div className="absolute top-[20%] left-[70%] w-[80px] h-[25px] pixel-cloud-retro cloud-h" style={{ animationDelay: '-5s', animationDirection: 'reverse', animation: 'float-h 20s linear infinite' }}></div>

                {/* Flying Birds */}
                <div className="pixel-bird-wrapper" style={{ animation: 'fly-across 25s linear infinite' }}>
                    <div className="pixel-bird">
                        <div className="pixel-wing"></div>
                    </div>
                </div>
                <div className="pixel-bird-wrapper-2" style={{ animation: 'fly-across 35s linear infinite', animationDelay: '-15s', left: '-100px', top: '25%', transform: 'scale(0.7)' }}>
                    <div className="pixel-bird">
                        <div className="pixel-wing"></div>
                    </div>
                </div>

                {/* Forest Layer */}
                <div className="absolute bottom-[30%] left-0 w-full h-[200px] z-0">
                    <div className="pixel-tree-2 scale-125" style={{ left: '5%' }}></div>
                    <div className="pixel-tree-2 scale-90" style={{ left: '15%' }}></div>
                    <div className="pixel-tree-2 scale-150" style={{ left: '25%' }}></div>
                    <div className="pixel-tree-2 scale-110" style={{ left: '45%' }}></div>
                    <div className="pixel-tree-2 scale-130" style={{ left: '60%' }}></div>
                    <div className="pixel-tree-2 scale-140" style={{ left: '85%' }}></div>
                    <div className="pixel-cottage"></div>
                </div>

                {/* Meadow Layer */}
                <div className="absolute bottom-0 left-0 w-full h-[35%] bg-nature-green z-0"
                    style={{
                        backgroundImage: `linear-gradient(45deg, #43a047 25%, transparent 25%, transparent 75%, #43a047 75%, #43a047), 
                                           linear-gradient(45deg, #43a047 25%, transparent 25%, transparent 75%, #43a047 75%, #43a047)`,
                        backgroundSize: '20px 20px',
                        backgroundPosition: '0 0, 10px 10px',
                        boxShadow: 'inset 0 10px 20px rgba(0,0,0,0.1)'
                    }}>

                    {/* Dynamic Plants */}
                    {plants.map((plant, i) => (
                        <div
                            key={i}
                            className="pixel-plant-wrapper"
                            style={{
                                left: plant.left,
                                top: plant.top,
                                animationDelay: plant.delay
                            }}
                        >
                            {plant.type === 'grass' && <div className="pixel-grass-blade"></div>}
                            {plant.type === 'bush' && <div className="pixel-bush"></div>}
                            {plant.type === 'flower' && (
                                <div className="pixel-flower-stem">
                                    <div className="pixel-flower-head" style={{ backgroundColor: plant.color }}></div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Decorative Tea Cup */}
            <div className="absolute top-10 left-10 md:top-20 md:left-20 z-10 hidden lg:block transform rotate-12">
                <div className="relative w-24 h-20 bg-white border-4 border-gray-900 rounded-b-xl pixel-corners shadow-pixel-lg flex items-center justify-center">
                    <div className="absolute -right-6 top-2 w-8 h-10 border-4 border-gray-900 rounded-r-xl border-l-0"></div>
                    <div className="text-4xl">🍵</div>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-1">
                        <div className="w-2 h-6 bg-white opacity-80 rounded-full animate-pulse"></div>
                        <div className="w-2 h-8 bg-white opacity-80 rounded-full animate-pulse delay-100"></div>
                        <div className="w-2 h-5 bg-white opacity-80 rounded-full animate-pulse delay-200"></div>
                    </div>
                </div>
            </div>

            {/* Navigation Buttons */}
            <nav className="absolute top-0 right-0 p-4 md:p-8 flex gap-4 z-20">
                <Link to="/" className="bg-white border-2 border-gray-900 px-4 py-2 font-chinese-pixel text-[10px] md:text-xs shadow-pixel-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all decoration-0 text-gray-900">首页</Link>
                <Link to="/projects" className="bg-sakura-pink border-2 border-gray-900 px-4 py-2 font-chinese-pixel text-[10px] md:text-xs shadow-pixel-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all decoration-0 text-gray-900">作品</Link>
                <Link to="/blog" className="bg-white border-2 border-gray-900 px-4 py-2 font-chinese-pixel text-[10px] md:text-xs shadow-pixel-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all decoration-0 text-gray-900">博客</Link>
            </nav>

            {/* Main Console Unit */}
            <main className="relative z-10 w-full max-w-6xl h-full flex items-center justify-center p-4">
                <div className="relative w-full max-w-[800px] aspect-[4/3] md:aspect-[16/10] bg-console-body rounded-3xl p-6 md:p-10 shadow-console-depth border-4 border-black flex flex-col md:flex-row items-center justify-center gap-8">

                    <div className="absolute top-4 left-8 text-gray-500 font-console-pixel text-[10px] tracking-widest hidden md:block">
                        PIXEL•STATION PORTABLE
                    </div>

                    {/* D-Pad Area */}
                    <div className="hidden md:flex flex-col items-center justify-center w-32 h-full shrink-0">
                        <div className="relative w-32 h-32">
                            <div className="absolute top-0 left-10 w-12 h-32 bg-gray-800 rounded-sm shadow-pixel-sm border-2 border-black"></div>
                            <div className="absolute top-10 left-0 w-32 h-12 bg-gray-800 rounded-sm shadow-pixel-sm border-2 border-black"></div>
                            <div className="absolute top-10 left-10 w-12 h-12 bg-gray-700 rounded-full"></div>

                            <div className="absolute top-0 left-10 w-12 h-10 hover:bg-gray-700 cursor-pointer flex items-center justify-center"><span className="material-symbols-outlined text-gray-500 text-sm">arrow_drop_up</span></div>
                            <div className="absolute bottom-0 left-10 w-12 h-10 hover:bg-gray-700 cursor-pointer flex items-center justify-center"><span className="material-symbols-outlined text-gray-500 text-sm">arrow_drop_down</span></div>
                            <div className="absolute top-10 left-0 w-10 h-12 hover:bg-gray-700 cursor-pointer flex items-center justify-center"><span className="material-symbols-outlined text-gray-500 text-sm">arrow_left</span></div>
                            <div className="absolute top-10 right-0 w-10 h-12 hover:bg-gray-700 cursor-pointer flex items-center justify-center"><span className="material-symbols-outlined text-gray-500 text-sm">arrow_right</span></div>
                        </div>
                    </div>

                    {/* Screen Area */}
                    <div className="relative w-full h-full bg-gray-700 rounded-t-xl rounded-b-[40px] p-8 pb-12 shadow-screen-inner border-4 border-black flex flex-col">
                        <div className="flex justify-between items-center mb-2 px-2">
                            <div className="flex gap-1 items-center">
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_5px_rgba(239,68,68,0.8)]"></div>
                                <span className="font-console-pixel text-[8px] text-gray-300">BATTERY</span>
                            </div>
                            <h1 className="font-console-pixel text-xs text-gray-400 tracking-widest">PROJECTS</h1>
                        </div>

                        <div className="relative flex-grow w-full bg-console-screen-bg border-4 border-console-screen-dark shadow-inner overflow-hidden font-console-pixel text-console-screen-black">
                            <div className="absolute inset-0 pointer-events-none z-20 scanlines opacity-30"></div>
                            <div className="absolute inset-0 pointer-events-none z-20 shadow-[inset_0_0_20px_rgba(15,56,15,0.4)]"></div>

                            {/* Scrollable List */}
                            <div className="h-full overflow-y-auto p-4 console-scrollbar relative z-10 font-chinese-pixel">
                                <div className="text-center mb-6 border-b-2 border-console-screen-black pb-2 border-dashed">
                                    <h2 className="text-sm md:text-base mb-1 font-bold">选择关卡</h2>
                                    <p className="font-retro text-xl font-bold">我的近期作品</p>
                                </div>

                                {/* Loading State */}
                                {loading && (
                                    <div className="flex justify-center items-center py-10">
                                        <div className="font-retro text-xl animate-pulse">LOADING...</div>
                                    </div>
                                )}

                                {/* Error State */}
                                {error && (
                                    <div className="text-center py-10">
                                        <div className="font-retro text-xl">ERROR</div>
                                        <div className="font-retro text-sm mt-2">{error}</div>
                                    </div>
                                )}

                                {/* Projects Grid */}
                                {!loading && !error && (
                                    <div className="grid grid-cols-1 gap-6">
                                        {projects.map((project) => (
                                            <div key={project.id} className="flex gap-4 p-2 border-2 border-console-screen-black border-opacity-20 hover:bg-console-screen-dark hover:bg-opacity-10 cursor-pointer transition-colors group">
                                                <div className="w-24 h-24 shrink-0 bg-console-screen-dark bg-opacity-20 border-2 border-console-screen-black flex items-center justify-center overflow-hidden">
                                                    <span className="material-symbols-outlined text-4xl opacity-50 group-hover:scale-110 transition-transform">{project.icon}</span>
                                                </div>
                                                <div className="flex flex-col justify-between w-full">
                                                    <div>
                                                        <h3 className="text-xs md:text-sm font-bold mb-1 leading-tight">&gt; {project.title} <span className="animate-pulse">_</span></h3>
                                                        <p className="font-retro text-lg leading-none opacity-80">{project.subtitle}</p>
                                                    </div>
                                                    <div className="flex gap-2 mt-2">
                                                        {project.tech_stack.slice(0, 3).map((tech, i) => (
                                                            <div key={i} className="w-6 h-6 border border-console-screen-black rounded-sm flex items-center justify-center bg-white/20" title={tech}>
                                                                <span className="font-retro text-xs font-bold">{getTechAbbrev(tech)}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {!loading && !error && projects.length === 0 && (
                                    <div className="text-center py-10 font-retro">NO PROJECTS FOUND</div>
                                )}

                                <div className="mt-6 text-center text-[10px] opacity-60 font-console-pixel">END OF LIST</div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="hidden md:flex flex-col items-center justify-center w-32 h-full shrink-0 gap-8">
                        <div className="grid grid-cols-2 gap-4 rotate-12">
                            <div className="flex flex-col items-center gap-1">
                                <button className="w-12 h-12 rounded-full bg-btn-a border-4 border-black active:translate-y-1 transition-all shadow-pixel-sm"></button>
                                <span className="font-console-pixel text-[10px] text-gray-600 font-bold">A</span>
                            </div>
                            <div className="flex flex-col items-center gap-1 mt-4">
                                <button className="w-12 h-12 rounded-full bg-btn-b border-4 border-black active:translate-y-1 transition-all shadow-pixel-sm"></button>
                                <span className="font-console-pixel text-[10px] text-gray-600 font-bold">B</span>
                            </div>
                        </div>
                        <div className="flex gap-4 mt-8">
                            <div className="flex flex-col items-center gap-1">
                                <button className="w-12 h-4 rounded-full bg-gray-700 border-2 border-black transform rotate-12 active:translate-y-[1px] transition-all"></button>
                                <span className="font-console-pixel text-[8px] text-gray-600 tracking-wider font-bold">SELECT</span>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <button className="w-12 h-4 rounded-full bg-gray-700 border-2 border-black transform rotate-12 active:translate-y-[1px] transition-all"></button>
                                <span className="font-console-pixel text-[8px] text-gray-600 tracking-wider font-bold">START</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Projects;
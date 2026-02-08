import React, { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginBackground } from '../components/LoginBackground';
import { PixelInput } from '../components/PixelInput';
import { PixelButton } from '../components/PixelButton';
import { authAPI } from '../services/api';

enum AuthMode {
    LOGIN = 'LOGIN',
    REGISTER = 'REGISTER'
}

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [mode, setMode] = useState<AuthMode>(AuthMode.LOGIN);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form State
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const toggleMode = () => {
        setMode(mode === AuthMode.LOGIN ? AuthMode.REGISTER : AuthMode.LOGIN);
        setError(null);
        setPassword('');
        setConfirmPassword('');
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        // Validation Logic
        if (username.length < 3) {
            setError('用户名至少需要3个字符');
            setIsLoading(false);
            return;
        }

        if (password.length < 6) {
            setError('密码太短 (至少6位)');
            setIsLoading(false);
            return;
        }

        if (mode === AuthMode.REGISTER && password !== confirmPassword) {
            setError('两次输入的密码不一致');
            setIsLoading(false);
            return;
        }

        try {
            if (mode === AuthMode.LOGIN) {
                const response = await authAPI.login(username, password);
                localStorage.setItem('token', response.token);
                localStorage.setItem('user', JSON.stringify(response.user));
                navigate('/');
            } else {
                await authAPI.register(username, password);
                // Auto login after registration
                const loginResponse = await authAPI.login(username, password);
                localStorage.setItem('token', loginResponse.token);
                localStorage.setItem('user', JSON.stringify(loginResponse.user));
                navigate('/');
            }
        } catch (err: any) {
            setError(err.message || '操作失败，请重试');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="relative h-screen w-screen overflow-hidden">
            {/* Background Layer */}
            <LoginBackground />

            {/* Scanlines & Vignette Overlay */}
            <div className="scanlines vignette absolute inset-0 z-50 pointer-events-none"></div>

            {/* Content Container */}
            <div className="relative z-20 flex h-full w-full flex-col items-center justify-center p-4 overflow-y-auto">

                {/* Game Title Header */}
                <div className="mb-8 animate-float text-center">
                    <h1 className="font-black text-6xl md:text-8xl text-primary tracking-tight font-display italic transform -rotate-2 pixel-text-shadow select-none">
                        我的像素空间
                    </h1>
                    <p className="font-pixel text-2xl text-white font-bold tracking-widest mt-2 drop-shadow-[2px_2px_0_rgba(0,0,0,0.8)] uppercase">
                        Start your adventure
                    </p>
                </div>

                {/* Auth Box */}
                <div className="relative group max-w-md w-full">
                    {/* Wooden Signpost Legs */}
                    <div className="absolute -bottom-16 left-1/4 w-4 h-24 bg-wood-border border-x-4 border-wood-shadow"></div>
                    <div className="absolute -bottom-16 right-1/4 w-4 h-24 bg-wood-border border-x-4 border-wood-shadow"></div>

                    {/* Signpost Board */}
                    <div className={`
            relative w-full bg-wood-pattern p-1 pixel-corners shadow-[0_20px_50px_rgba(0,0,0,0.5)] 
            transform transition-transform duration-300 hover:scale-[1.01]
            ${error ? 'animate-shake' : ''}
          `}>
                        <div className="bg-wood-light p-6 md:p-8 pixel-corners border-4 border-wood-dark flex flex-col gap-6 relative">

                            {/* Decorative Screws */}
                            <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-wood-border shadow-[inset_1px_1px_2px_rgba(0,0,0,0.5)]"></div>
                            <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-wood-border shadow-[inset_1px_1px_2px_rgba(0,0,0,0.5)]"></div>
                            <div className="absolute bottom-4 left-4 w-3 h-3 rounded-full bg-wood-border shadow-[inset_1px_1px_2px_rgba(0,0,0,0.5)]"></div>
                            <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-wood-border shadow-[inset_1px_1px_2px_rgba(0,0,0,0.5)]"></div>

                            {/* Header */}
                            <div className="text-center mb-2">
                                <span className="material-symbols-outlined text-wood-border text-5xl mb-2">
                                    {mode === AuthMode.LOGIN ? 'landscape' : 'person_add'}
                                </span>
                                <h2 className="text-wood-border font-pixel text-3xl font-bold uppercase tracking-wider border-b-2 border-wood-border border-dashed inline-block pb-1">
                                    {mode === AuthMode.LOGIN ? 'Login' : 'Join Us'}
                                </h2>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <PixelInput
                                    label="用户名"
                                    icon="person"
                                    type="text"
                                    placeholder="Adventurer Name"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />

                                <PixelInput
                                    label="密码"
                                    icon="key"
                                    type="password"
                                    placeholder="Secret Code"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />

                                {mode === AuthMode.REGISTER && (
                                    <PixelInput
                                        label="确认密码"
                                        icon="lock_clock"
                                        type="password"
                                        placeholder="Confirm Code"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                )}

                                {error && (
                                    <div className="bg-red-500/20 border-2 border-red-500 text-red-700 font-pixel p-2 text-center text-lg animate-pulse">
                                        {error}
                                    </div>
                                )}

                                <div className="pt-2">
                                    <PixelButton
                                        type="submit"
                                        disabled={isLoading}
                                        icon={isLoading ? 'hourglass_top' : (mode === AuthMode.LOGIN ? 'play_arrow' : 'how_to_reg')}
                                    >
                                        {isLoading ? 'Loading...' : (mode === AuthMode.LOGIN ? '登录' : '注册')}
                                    </PixelButton>
                                </div>
                            </form>

                            {/* Footer Links */}
                            <div className="flex justify-between items-center text-wood-border/80 font-pixel text-lg mt-2 px-2">
                                <Link
                                    to="/"
                                    className="hover:text-primary hover:underline decoration-2 underline-offset-2 transition-colors cursor-pointer"
                                >
                                    返回首页
                                </Link>
                                <button
                                    type="button"
                                    onClick={toggleMode}
                                    className="hover:text-primary hover:underline decoration-2 underline-offset-2 transition-colors cursor-pointer"
                                >
                                    {mode === AuthMode.LOGIN ? 'New Game' : 'Back to Login'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright Footer */}
                <div className="mt-20 md:mt-24 text-center z-20 pb-4">
                    <p className="font-pixel text-white/90 text-lg drop-shadow-md">
                        © 2024 Pixel World • Press Start to Continue
                    </p>
                </div>
            </div>
        </main>
    );
};

export default Login;

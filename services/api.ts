/**
 * Pixel World Portfolio - API Client
 * 
 * Service for communicating with the PHP backend
 */

// API base URL - configure based on environment
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

/**
 * Generic fetch wrapper with error handling
 */
async function fetchAPI<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const url = `${API_BASE_URL}/${endpoint}`;

    const defaultOptions: RequestInit = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = await fetch(url, { ...defaultOptions, ...options });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Request failed' }));
        throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
}

// ==================== Types ====================

export interface Post {
    id: number;
    title: string;
    content?: string;
    excerpt: string;
    cover_image: string;
    category: string;
    tags: string[];
    status: 'draft' | 'published';
    created_at: string;
    updated_at: string;
}

export interface Project {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    tech_stack: string[];
    icon: string;
    link: string;
    status: 'active' | 'archived';
    display_order: number;
    created_at: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export interface SingleResponse<T> {
    data: T;
}

// ==================== Posts API ====================

export const postsAPI = {
    /**
     * Get all published posts with pagination
     */
    async getAll(page = 1, limit = 10): Promise<PaginatedResponse<Post>> {
        return fetchAPI(`posts?page=${page}&limit=${limit}&status=published`);
    },

    /**
     * Get a single post by ID
     */
    async getById(id: number): Promise<SingleResponse<Post>> {
        return fetchAPI(`posts/${id}`);
    },

    /**
     * Get the latest post (for homepage)
     */
    async getLatest(): Promise<Post | null> {
        const response = await this.getAll(1, 1);
        return response.data[0] || null;
    },
};

// ==================== Projects API ====================

export const projectsAPI = {
    /**
     * Get all active projects
     */
    async getAll(): Promise<{ data: Project[] }> {
        return fetchAPI('projects?status=active');
    },

    /**
     * Get a single project by ID
     */
    async getById(id: number): Promise<SingleResponse<Project>> {
        return fetchAPI(`projects/${id}`);
    },
};

// ==================== Settings API ====================

export const settingsAPI = {
    /**
     * Get all settings
     */
    async getAll(): Promise<{ data: Record<string, string> }> {
        return fetchAPI('settings');
    },

    /**
     * Get a single setting by key
     */
    async get(key: string): Promise<{ data: { key: string; value: string } }> {
        return fetchAPI(`settings/${key}`);
    },
};

// ==================== Health Check ====================

export async function checkAPIHealth(): Promise<boolean> {
    try {
        await fetchAPI('health');
        return true;
    } catch {
        return false;
    }
}

// ==================== Auth API ====================

export interface User {
    id: number;
    username: string;
    created_at?: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export const authAPI = {
    /**
     * Register a new user
     */
    async register(username: string, password: string): Promise<{ message: string; user: User }> {
        return fetchAPI('auth/register', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        });
    },

    /**
     * Login user
     */
    async login(username: string, password: string): Promise<AuthResponse> {
        return fetchAPI('auth/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        });
    },

    /**
     * Get current user info (requires token)
     */
    async getMe(): Promise<{ user: User }> {
        const token = localStorage.getItem('token');
        return fetchAPI('auth/me', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
    },

    /**
     * Logout - clear local storage
     */
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    /**
     * Check if user is logged in
     */
    isLoggedIn(): boolean {
        return !!localStorage.getItem('token');
    },

    /**
     * Get stored user
     */
    getStoredUser(): User | null {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },
};

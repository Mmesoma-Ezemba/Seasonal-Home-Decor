import React, { createContext, useContext, useState, useEffect } from 'react';

// --- Hardcoded mock user profiles ---
export interface UserProfile {
    id: number;
    name: string;
    email: string;
    avatar: string;
    memberSince: string;
    favoriteSeasons: string[];
    orders: number;
}

const MOCK_USERS: { email: string; password: string; profile: UserProfile }[] = [
    {
        email: 'jane@example.com',
        password: 'password123',
        profile: {
            id: 1,
            name: 'Jane Doe',
            email: 'jane@example.com',
            avatar: 'https://picsum.photos/seed/jane-avatar/200/200',
            memberSince: 'March 2023',
            favoriteSeasons: ['Autumn', 'Winter'],
            orders: 12,
        },
    },
    {
        email: 'john@example.com',
        password: 'password123',
        profile: {
            id: 2,
            name: 'John Smith',
            email: 'john@example.com',
            avatar: 'https://picsum.photos/seed/john-avatar/200/200',
            memberSince: 'July 2024',
            favoriteSeasons: ['Spring', 'Summer'],
            orders: 5,
        },
    },
];

interface AuthContextType {
    user: UserProfile | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => { success: boolean; error?: string };
    signup: (name: string, email: string, password: string) => { success: boolean; error?: string };
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserProfile | null>(() => {
        if (typeof window !== 'undefined') {
            try {
                const saved = localStorage.getItem('authUser');
                return saved ? JSON.parse(saved) : null;
            } catch {
                return null;
            }
        }
        return null;
    });

    useEffect(() => {
        try {
            if (user) {
                localStorage.setItem('authUser', JSON.stringify(user));
            } else {
                localStorage.removeItem('authUser');
            }
        } catch { }
    }, [user]);

    const login = (email: string, password: string) => {
        const found = MOCK_USERS.find(
            (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );
        if (found) {
            setUser(found.profile);
            return { success: true };
        }
        return { success: false, error: 'Invalid email or password. Try jane@example.com / password123' };
    };

    const signup = (name: string, email: string, _password: string) => {
        const exists = MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
        if (exists) {
            return { success: false, error: 'An account with this email already exists. Try logging in instead.' };
        }
        // For the mockup, create a temporary profile
        const newProfile: UserProfile = {
            id: Date.now(),
            name,
            email,
            avatar: `https://picsum.photos/seed/${encodeURIComponent(name)}/200/200`,
            memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            favoriteSeasons: ['Spring'],
            orders: 0,
        };
        setUser(newProfile);
        return { success: true };
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

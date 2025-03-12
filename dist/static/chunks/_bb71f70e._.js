(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/_bb71f70e._.js", {

"[project]/app/api-manifest.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// This file is used to ensure all API routes are included in the static export
// It's imported in the app/layout.tsx file to make sure Next.js processes all API routes
__turbopack_context__.s({
    "apiManifest": (()=>apiManifest),
    "default": (()=>__TURBOPACK__default__export__)
});
const apiManifest = {
    auth: {
        token: '/api/v1/auth/token',
        userinfo: '/api/v1/auth/userinfo'
    },
    silicon: {
        demand: '/api/v1/silicon/demand',
        utilization: '/api/v1/silicon/utilization'
    },
    pools: '/api/v1/pools',
    workflows: '/api/v1/workflows'
};
const __TURBOPACK__default__export__ = apiManifest;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/lib/store/auth.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "useAuthStore": (()=>useAuthStore)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zustand$40$5$2e$0$2e$3_$40$types$2b$react$40$19$2e$0$2e$10_react$40$19$2e$0$2e$0$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zustand@5.0.3_@types+react@19.0.10_react@19.0.0/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2d$manifest$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/api-manifest.js [app-client] (ecmascript)");
;
;
// Simple localStorage helper functions
const saveToStorage = (key, value)=>{
    if ("TURBOPACK compile-time truthy", 1) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Error saving to localStorage: ${error}`);
        }
    }
};
const getFromStorage = (key)=>{
    if ("TURBOPACK compile-time truthy", 1) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error(`Error getting from localStorage: ${error}`);
            return null;
        }
    }
    return null;
};
const removeFromStorage = (key)=>{
    if ("TURBOPACK compile-time truthy", 1) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(`Error removing from localStorage: ${error}`);
        }
    }
};
// Initialize state from localStorage if available
const storedToken = getFromStorage('auth-token');
const storedUser = getFromStorage('auth-user');
const initialIsAuthenticated = !!storedToken;
const useAuthStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zustand$40$5$2e$0$2e$3_$40$types$2b$react$40$19$2e$0$2e$10_react$40$19$2e$0$2e$0$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        token: storedToken,
        user: storedUser,
        isAuthenticated: initialIsAuthenticated,
        isLoading: false,
        error: null,
        // Login action
        login: async ()=>{
            // In a static export, we're using mock data so we don't need credentials
            set({
                isLoading: true,
                error: null
            });
            try {
                // In a static export, we're calling our pre-rendered API endpoint with POST method
                const formData = new FormData();
                formData.append('grant_type', 'password');
                formData.append('client_id', 'nightcrawler-app');
                formData.append('username', 'testuser'); // Mock username
                formData.append('password', 'testpassword'); // Mock password
                const response = await fetch(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2d$manifest$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].auth.token, {
                    method: 'POST',
                    body: formData
                });
                if (!response.ok) {
                    throw new Error('Authentication failed');
                }
                const tokenData = await response.json();
                // Fetch user info
                const userResponse = await fetch(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2d$manifest$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].auth.userinfo);
                const userData = await userResponse.json();
                // Save to localStorage
                saveToStorage('auth-token', tokenData);
                saveToStorage('auth-user', userData);
                set({
                    token: tokenData,
                    user: userData,
                    isAuthenticated: true,
                    isLoading: false,
                    error: null
                });
                return {
                    success: true
                };
            } catch (error) {
                set({
                    isLoading: false,
                    error: error.message || 'An error occurred during login'
                });
                return {
                    success: false,
                    error: error.message
                };
            }
        },
        // Logout action
        logout: ()=>{
            // Clear localStorage
            removeFromStorage('auth-token');
            removeFromStorage('auth-user');
            set({
                token: null,
                user: null,
                isAuthenticated: false,
                error: null
            });
        },
        // Check if token is valid (for static export, we just check if it exists)
        checkAuth: ()=>{
            // Check localStorage first
            const storedToken = getFromStorage('auth-token');
            // If token exists in localStorage but not in state, update state
            if (storedToken && !get().isAuthenticated) {
                const storedUser = getFromStorage('auth-user');
                set({
                    token: storedToken,
                    user: storedUser,
                    isAuthenticated: true
                });
                return true;
            }
            // Return current authentication state
            return get().isAuthenticated;
        }
    }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/auth/auth-wrapper.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>AuthWrapper)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2$2d$canary$2e$1_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.2.2-canary.1_react-dom@19.0.0_react@19.0.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2$2d$canary$2e$1_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.2.2-canary.1_react-dom@19.0.0_react@19.0.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2$2d$canary$2e$1_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.2.2-canary.1_react-dom@19.0.0_react@19.0.0/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/store/auth.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$4$2e$10_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.4.10_react-dom@19.0.0_react@19.0.0/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
// List of public routes that don't require authentication
const publicRoutes = [
    '/login',
    '/register',
    '/forgot-password'
];
function AuthWrapper({ children }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2$2d$canary$2e$1_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2$2d$canary$2e$1_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const { isAuthenticated } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])();
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2$2d$canary$2e$1_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2$2d$canary$2e$1_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthWrapper.useEffect": ()=>{
            // Check if the current route is a public route
            const isPublicRoute = publicRoutes.includes(pathname);
            // If not authenticated and not on a public route, redirect to login
            if (!isAuthenticated && !isPublicRoute) {
                router.push('/login');
            } else if (isAuthenticated && pathname === '/login') {
                router.push('/dashboard');
            }
            // Set loading to false after authentication check
            setIsLoading(false);
        }
    }["AuthWrapper.useEffect"], [
        isAuthenticated,
        pathname,
        router
    ]);
    // Show loading state
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2$2d$canary$2e$1_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-screen w-screen items-center justify-center bg-background",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2$2d$canary$2e$1_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$4$2e$10_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    scale: 0.8
                },
                animate: {
                    opacity: 1,
                    scale: 1
                },
                transition: {
                    duration: 0.5
                },
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2$2d$canary$2e$1_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-16 w-16 border-t-2 border-primary animate-spin rounded-full mx-auto mb-4"
                    }, void 0, false, {
                        fileName: "[project]/components/auth/auth-wrapper.js",
                        lineNumber: 44,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2$2d$canary$2e$1_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted-foreground",
                        children: "Loading..."
                    }, void 0, false, {
                        fileName: "[project]/components/auth/auth-wrapper.js",
                        lineNumber: 45,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/auth/auth-wrapper.js",
                lineNumber: 38,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/auth/auth-wrapper.js",
            lineNumber: 37,
            columnNumber: 7
        }, this);
    }
    // If on a public route or authenticated, render children
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2$2d$canary$2e$1_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$4$2e$10_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0
        },
        animate: {
            opacity: 1
        },
        transition: {
            duration: 0.3
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/components/auth/auth-wrapper.js",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
_s(AuthWrapper, "klXD90f+5s7FKXjNE0zrndERMFU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2$2d$canary$2e$1_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2$2d$canary$2e$1_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"]
    ];
});
_c = AuthWrapper;
var _c;
__turbopack_context__.k.register(_c, "AuthWrapper");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/theme-provider.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "ThemeProvider": (()=>ThemeProvider),
    "useTheme": (()=>useTheme)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2$2d$canary$2e$1_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.2.2-canary.1_react-dom@19.0.0_react@19.0.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2$2d$canary$2e$1_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.2.2-canary.1_react-dom@19.0.0_react@19.0.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
const initialState = {
    theme: "dark",
    setTheme: ()=>null
};
const ThemeProviderContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2$2d$canary$2e$1_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(initialState);
function ThemeProvider({ children, defaultTheme = "dark", storageKey = "nightcrawler-theme", ...props }) {
    _s();
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2$2d$canary$2e$1_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultTheme);
    // Initialize theme from localStorage once the component is mounted
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2$2d$canary$2e$1_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeProvider.useEffect": ()=>{
            const storedTheme = localStorage.getItem(storageKey);
            if (storedTheme) {
                setTheme(storedTheme);
            }
        }
    }["ThemeProvider.useEffect"], [
        storageKey
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2$2d$canary$2e$1_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeProvider.useEffect": ()=>{
            const root = window.document.documentElement;
            root.classList.remove("light", "dark");
            if (theme === "system") {
                const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
                root.classList.add(systemTheme);
                return;
            }
            root.classList.add(theme);
        }
    }["ThemeProvider.useEffect"], [
        theme
    ]);
    const value = {
        theme,
        setTheme: (theme)=>{
            localStorage.setItem(storageKey, theme);
            setTheme(theme);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2$2d$canary$2e$1_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeProviderContext.Provider, {
        ...props,
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/theme-provider.tsx",
        lineNumber: 67,
        columnNumber: 5
    }, this);
}
_s(ThemeProvider, "W8D4/Q1J7zkRqv7jhld4gmhU6go=");
_c = ThemeProvider;
const useTheme = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2$2d$canary$2e$1_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ThemeProviderContext);
    if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider");
    return context;
};
_s1(useTheme, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "ThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=_bb71f70e._.js.map
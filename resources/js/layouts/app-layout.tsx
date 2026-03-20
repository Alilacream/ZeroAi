import { Link, usePage, router } from '@inertiajs/react';
import {
    Settings,
    LayoutDashboard,
    ScanLine,
    Menu,
    X,
    LogOut,
    ChevronRight,
    Verified,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { logout } from '@/routes';
import { edit } from '@/routes/profile';
import type { Auth, BreadcrumbItem } from '@/types';

export default function AppLayout({
    children,
    breadcrumbs,
}: {
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}) {
    const { url, props } = usePage<{ auth: Auth }>();
    const auth = props.auth;
    const user = auth?.user;

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    // Close mobile menu on route change
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMobileMenuOpen(false);
    }, [url]);

    const handleLogout = () => {
        router.post(logout().url);
    };

    const navItems = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Workspace', href: '/chat', icon: ScanLine },
        { name: 'Verify-Content', href: '/verify', icon: Verified },
    ];

    return (
        <div className="flex h-screen w-full overflow-hidden bg-zinc-950 font-sans text-zinc-50 antialiased">
            {/* Mobile Header */}
            <div className="absolute top-0 z-40 flex w-full items-center justify-between border-b border-zinc-900 bg-zinc-950 px-4 py-3 md:hidden">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-lg font-semibold tracking-tight text-zinc-100">
                        ZeroAI
                    </span>
                </Link>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 text-zinc-400 hover:text-zinc-100"
                >
                    {isMobileMenuOpen ? (
                        <X className="h-5 w-5" />
                    ) : (
                        <Menu className="h-5 w-5" />
                    )}
                </button>
            </div>

            {/* Desktop & Mobile Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-30 flex flex-col justify-between border-r border-zinc-900 bg-zinc-950 transition-all duration-300 ${isSidebarCollapsed ? 'w-20' : 'w-64'} ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} md:relative md:z-auto`}
            >
                <div className="flex h-full flex-col overflow-hidden">
                    {/* Brand */}
                    <div className="flex h-16 shrink-0 items-center border-b border-zinc-900/50 px-4">
                        <Link
                            href="/"
                            className={`flex items-center gap-3 ${isSidebarCollapsed ? 'mx-auto' : 'px-2'}`}
                        >
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-lg leading-none font-bold text-zinc-950 shadow-sm">
                                Z
                            </div>
                            {!isSidebarCollapsed && (
                                <span className="font-semibold tracking-tight text-zinc-100 transition-opacity">
                                    ZeroAI
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-6">
                        {navItems.map((item, i) => {
                            const isActive =
                                url.startsWith(item.href) && item.href !== '#';
                            return (
                                <Link
                                    key={i}
                                    href={item.href}
                                    className={`group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive ? 'bg-zinc-900 text-zinc-100' : 'text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-100'} ${isSidebarCollapsed ? 'justify-center px-0' : ''} `}
                                    title={
                                        isSidebarCollapsed
                                            ? item.name
                                            : undefined
                                    }
                                >
                                    <item.icon
                                        className={`h-5 w-5 shrink-0 ${isActive ? 'text-zinc-100' : 'text-zinc-500 group-hover:text-zinc-300'}`}
                                    />
                                    {!isSidebarCollapsed && (
                                        <span className="ml-3 truncate">
                                            {item.name}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Bottom Profile Area */}
                    <div className="shrink-0 border-t border-zinc-900 p-4">
                        {!isSidebarCollapsed && user ? (
                            <div className="flex flex-col gap-3">
                                {/* User Info Mini-card */}
                                <div className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900/50 p-2 shadow-sm">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-zinc-800 text-xs font-medium text-zinc-300">
                                        {user.name
                                            .substring(0, 2)
                                            .toUpperCase()}
                                    </div>
                                    <div className="flex flex-col overflow-hidden">
                                        <span className="truncate text-sm font-medium text-zinc-200">
                                            {user.name}
                                        </span>
                                        <span className="truncate text-xs text-zinc-500">
                                            {user.email}
                                        </span>
                                    </div>
                                </div>

                                {/* Bottom Action Buttons */}
                                <div className="grid grid-cols-2 gap-2">
                                    <Link
                                        href={edit?.()?.url || '#'}
                                        className="flex items-center justify-center gap-2 rounded-md bg-zinc-900 py-2 text-xs font-medium text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
                                    >
                                        <Settings className="h-4 w-4" />
                                        Settings
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center justify-center gap-2 rounded-md bg-zinc-900 py-2 text-xs font-medium text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-red-400"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        Log out
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2">
                                <Link
                                    href={edit?.()?.url || '#'}
                                    className="flex items-center justify-center rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-zinc-100"
                                    title="Settings"
                                >
                                    <Settings className="h-5 w-5" />
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center justify-center rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-red-400"
                                    title="Log out"
                                >
                                    <LogOut className="h-5 w-5" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar Collapse Toggle (Desktop only) */}
                <button
                    onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    className="absolute top-12 -right-3 z-40 hidden h-6 w-6 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 text-zinc-400 shadow-sm transition-colors hover:bg-zinc-800 hover:text-zinc-100 md:flex"
                >
                    <ChevronRight
                        className={`h-3 w-3 transition-transform ${isSidebarCollapsed ? '' : 'rotate-180'}`}
                    />
                </button>
            </aside>

            {/* Main Content Area */}
            <main className="relative z-10 flex h-full flex-1 flex-col overflow-hidden bg-zinc-950 pt-14 md:pt-0">
                {/* Header / Breadcrumbs */}
                <div className="hidden h-16 shrink-0 items-center justify-between border-b border-zinc-900/50 px-8 md:flex">
                    <div className="flex items-center gap-2 text-sm font-medium text-zinc-500">
                        {breadcrumbs &&
                            breadcrumbs.map(
                                (crumb: BreadcrumbItem, idx: number) => (
                                    <span
                                        key={idx}
                                        className="flex items-center gap-2"
                                    >
                                        {idx > 0 && <span>/</span>}
                                        <Link
                                            href={crumb.href}
                                            className="transition-colors hover:text-zinc-200"
                                        >
                                            {crumb.title}
                                        </Link>
                                    </span>
                                ),
                            )}
                        {!breadcrumbs && (
                            <span className="text-zinc-300">Workspace</span>
                        )}
                    </div>
                </div>

                {/* Page Content */}
                <div className="relative h-full w-full flex-1">{children}</div>
            </main>

            {/* Mobile Overlay Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black/60 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </div>
    );
}

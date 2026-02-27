import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, LogOut, Settings, LayoutDashboard } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    // [Inference] Assuming you extract the current path to handle active states
    const { url } = usePage();

    return (
        <div className="flex h-screen w-full bg-zinc-950 text-zinc-50 font-sans antialiased selection:bg-zinc-800 selection:text-white overflow-hidden">

            {/* Minimalist Sidebar */}
            <nav className="flex w-16 md:w-64 flex-col justify-between border-r border-zinc-900 bg-zinc-950/50 p-4 transition-all">
                <div>
                    <Link href="/" className="mb-8 flex items-center gap-3 px-2">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-zinc-100 text-zinc-950">
                            <ShieldCheck className="h-5 w-5" strokeWidth={2.5} />
                        </div>
                        <span className="hidden font-semibold tracking-tight md:block">ZeroAI</span>
                    </Link>

                    <div className="flex flex-col gap-2">
                        <Link
                            href="/dashboard"
                            className={`flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium transition-colors ${url.startsWith('/dashboard') ? 'bg-zinc-900 text-zinc-100' : 'text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-100'}`}
                        >
                            <LayoutDashboard className="h-5 w-5 shrink-0" />
                            <span className="hidden md:block">Dashboard</span>
                        </Link>
                        {/* Add more links here */}
                    </div>
                </div>

                <div className="flex flex-col gap-2 border-t border-zinc-900 pt-4">
                    <Link href="/settings/profile" className="flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-900/50 hover:text-zinc-100">
                        <Settings className="h-5 w-5 shrink-0" />
                        <span className="hidden md:block">Settings</span>
                    </Link>
                </div>
            </nav>

            {/* Main Content Area with Page Transitions */}
            <main className="flex-1 overflow-y-auto bg-zinc-950 relative">
                {/* Subtle top light leak for the app area */}
                <div className="pointer-events-none absolute top-0 left-1/2 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-zinc-700 to-transparent opacity-50" />

                <AnimatePresence mode="wait">
                    <motion.div
                        key={url}
                        initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="h-full w-full p-6 md:p-8"
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
}

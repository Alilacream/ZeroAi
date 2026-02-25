import { Link, usePage } from '@inertiajs/react';
import { Sparkles } from 'lucide-react';
import { dashboard, login, register, seekerai } from '@/routes';
export default function Navigation({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage().props;

    return (
        <>
            <nav className="fixed top-0 right-0 left-0 z-50 border-b border-white/10 bg-[#0a0e1a]/80 backdrop-blur-xl">
                <div className="mx-auto max-w-7xl px-8">
                    <div className="flex h-20 items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#3b82f6] to-[#2563eb]">
                                <Sparkles className="h-5 w-5 text-white" />
                            </div>
                            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-xl font-bold text-transparent">
                                ZeroAI
                            </span>
                        </div>

                        {/* Navigation Links */}
                        <div className="flex items-center gap-8">
                            {auth.user ? (
                                <>
                                    <Link
                                        href={dashboard()}
                                        className="text-gray-300 transition-colors duration-200 hover:text-white"
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        href={seekerai()}
                                        className="text-gray-300 transition-colors duration-200 hover:text-white"
                                    >
                                        Chat
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="text-gray-300 transition-colors duration-200 hover:text-white"
                                    >
                                        Log in
                                    </Link>

                                    {canRegister && (
                                        <Link
                                            href={register()}
                                            className="rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#2563eb] px-6 py-2.5 text-white transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-[#3b82f6]/50"
                                        >
                                            Register
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

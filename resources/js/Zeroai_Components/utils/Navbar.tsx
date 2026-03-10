import { Link, usePage } from '@inertiajs/react';
import { dashboard, login, register, chat } from '@/routes';

export default function Navigation({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage().props;
    return (
        <nav className="fixed top-0 right-0 left-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-6 md:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="group flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded bg-zinc-100 text-lg leading-none font-bold text-zinc-950 transition-transform group-hover:scale-105">
                            Z
                        </div>
                        <span className="text-lg font-semibold tracking-tight text-zinc-100">
                            ZeroAI
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center gap-6 text-sm font-medium">
                        {auth?.user ? (
                            <>
                                <Link
                                    href={dashboard()}
                                    className="text-zinc-400 transition-colors hover:text-zinc-100"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href={chat()}
                                    className="text-zinc-400 transition-colors hover:text-zinc-100"
                                >
                                    Workspace
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="text-zinc-400 transition-colors hover:text-zinc-100"
                                >
                                    Sign in
                                </Link>

                                {canRegister && (
                                    <Link
                                        href={register()}
                                        className="rounded-md bg-zinc-100 px-4 py-2 text-zinc-950 transition-all hover:bg-white hover:ring-2 hover:ring-zinc-100/20 active:scale-95"
                                    >
                                        Get Started
                                    </Link>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

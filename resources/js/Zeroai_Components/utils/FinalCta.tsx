import { Link, usePage } from '@inertiajs/react';
import { motion } from 'motion/react';
import { register, chat } from '@/routes';

export function FinalCta() {
    const props = usePage().props;
    const user = props.auth.user;
    return (
        <section className="relative overflow-hidden border-t border-zinc-800/50 px-6 py-32 text-center md:px-8 md:py-48">
            {/* Subtle center glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="h-[400px] w-[800px] rounded-full bg-zinc-800/20 blur-[120px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-3xl">
                <h2 className="mb-6 text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl">
                    Ready to verify your media?
                </h2>
                <p className="mb-10 text-lg text-zinc-400">
                    Join the creators and teams using our system to protect themselves and their audiences from fake content.
                </p>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block"
                >
                    <Link
                        href={user ? chat() : register()}
                        className="flex h-12 items-center justify-center rounded-md bg-zinc-100 px-8 text-sm font-semibold text-zinc-950 transition-colors hover:bg-white"
                    >
                        Get started for free
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

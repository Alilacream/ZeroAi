import { Link, usePage } from '@inertiajs/react';
import { ArrowRight, Terminal } from 'lucide-react';
import { motion } from 'motion/react';
import { chat, register } from '@/routes';

export function HeroSection() {
    const props = usePage().props;
    const user = props.auth.user;
    return (
        <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden pt-16">
            {/* Modern Subtle Grid Background (Replaces the forest image) */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#4f4f4f15_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f15_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-[size:24px_24px]" />

            {/* Subtle top glow to anchor the logo */}
            <div className="absolute top-0 left-1/2 z-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-zinc-500/10 blur-[100px]" />

            {/* Content */}
            <div className="relative z-10 mx-auto w-full max-w-5xl px-6 text-center md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} // Custom spring-like easing
                    className="flex flex-col items-center"
                >
                    {/* Trust Badge */}
                    <div className="mb-8 flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-xs font-medium text-zinc-300 backdrop-blur-sm">
                        <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
                        Model v2.0 is now live
                    </div>

                    <h1 className="mb-6 max-w-4xl text-5xl font-bold tracking-tight text-zinc-100 sm:text-6xl md:text-7xl lg:leading-[1.1]">
                        Spot the fake. <br className="hidden sm:block" />
                        <span className="text-zinc-500">Know what's real.</span>
                    </h1>

                    <p className="mb-10 max-w-2xl text-lg text-zinc-400 sm:text-xl">
                        We make it easy to identify manipulated media. From deepfake face swaps to AI-generated images, see exactly what you're looking at.
                    </p>

                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Link
                                href={user.avatar ? chat() : register()}
                                className="flex h-12 items-center gap-2 rounded-md bg-zinc-100 px-8 text-sm font-semibold text-zinc-950 transition-colors hover:bg-white"
                            >
                                Start Detecting
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Link
                                href="#documentation" // Or wherever this should point
                                className="flex h-12 items-center gap-2 rounded-md border border-zinc-800 bg-transparent px-8 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-900 hover:text-zinc-100"
                            >
                                <Terminal className="h-4 w-4 text-zinc-500" />
                                Read Documentation
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Bottom gradient fade to blend into the About section smoothly */}
            <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-10 h-40 bg-gradient-to-t from-zinc-950 to-transparent" />
        </section>
    );
}

import { Link } from '@inertiajs/react';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { seekerai } from '@/routes';

export function HeroSection() {
    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1764267758843-30975c8a7f38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwZm9yZXN0JTIwbmlnaHQlMjBhdG1vc3BoZXJlfGVufDF8fHx8MTc3MTkzOTQwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Dark forest background"
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a]/90 via-[#0a0e1a]/80 to-[#0a0e1a]" />
            </div>

            {/* Content */}
            <div className="relative z-10 mx-auto max-w-5xl px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <h1 className="mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-7xl font-bold text-transparent">
                        ZeroAI
                    </h1>
                    <p className="mx-auto mb-12 max-w-3xl text-2xl leading-relaxed text-gray-300">
                        Detect AI-generated content. Restore digital trust.
                    </p>

                    <div className="flex items-center justify-center gap-6">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#2563eb] px-8 py-4 font-medium text-white transition-shadow duration-300 hover:shadow-2xl hover:shadow-[#3b82f6]/50"
                        >
                            <Link href={seekerai()}>Try ZeroAI</Link>
                            <ArrowRight className="h-5 w-5" />
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-8 py-4 font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                        >
                            <PlayCircle className="h-5 w-5" />
                            Learn More
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute right-0 bottom-0 left-0 z-10 h-32 bg-gradient-to-t from-[#0a0e1a] to-transparent" />
        </section>
    );
}

'use client';

import { motion } from 'motion/react';

function SloganSection() {
    return (
        <section className="relative overflow-hidden px-8 py-32">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e1a] via-[#111827] to-[#1a2332]" />

            {/* Animated gradient orbs */}
            <div className="absolute top-1/4 left-1/4 h-96 w-96 animate-pulse rounded-full bg-[#3b82f6]/20 opacity-50 blur-3xl" />
            <div className="absolute right-1/4 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-[#34d399]/20 opacity-50 blur-3xl delay-1000" />

            <div className="relative z-10 mx-auto max-w-5xl text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="mb-8 text-6xl leading-tight font-bold md:text-7xl">
                        <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                            Restoring Trust in the Age of
                        </span>
                        <br />
                        <span className="animate-gradient bg-gradient-to-r from-[#3b82f6] via-[#34d399] to-[#3b82f6] bg-clip-text text-transparent">
                            Artificial Intelligence
                        </span>
                    </h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mx-auto max-w-3xl text-xl text-gray-400"
                    >
                        Every piece of content deserves verification. Every
                        creator deserves recognition. Every reader deserves the
                        truth.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="mt-12"
                    >
                        <button className="rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#2563eb] px-10 py-5 text-lg font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#3b82f6]/50">
                            Join the Movement
                        </button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Bottom border */}
            <div className="absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </section>
    );
}
export default SloganSection;

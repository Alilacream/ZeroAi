'use client';

import { motion } from 'motion/react';
export function LeadershipSection() {
    const Avatars = {
        Ichrak: '/storage/Team/Ceo_Chief.png',
        Reda: '/storage/Team/Reda.jpeg',
        Ali: '/storage/Team/Fullstack.png',
    };
    const leaders = [
        {
            name: 'Ichrak Belhorma',
            role: 'CEO & Co-Founder',
            image: Avatars.Ichrak,
        },
        {
            name: 'Reda Jdaini',
            role: 'CTO/AI Specialist',
            image: Avatars.Reda,
        },
        {
            name: 'Amara Mohamed Ali',
            role: 'Fullstack Dev',
            image: Avatars.Ali,
        },
    ];

    return (
        <section className="bg-[#111827] px-8 py-32">
            <div className="mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-20 text-center"
                >
                    <h2 className="mb-4 text-5xl font-bold text-white">
                        Meet Our Leadership
                    </h2>
                    <p className="mx-auto max-w-2xl text-xl text-gray-400">
                        Pioneering the future of digital authenticity with
                        decades of combined experience in AI and security
                    </p>
                </motion.div>

                <div className="grid gap-8 md:grid-cols-3">
                    {leaders.map((leader, index) => (
                        <motion.div
                            key={leader.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.05, y: -8 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.15 }}
                            className="group"
                        >
                            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#1a2332] to-[#111827] p-8 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#3b82f6]/20">
                                {/* Image Container */}
                                <div className="relative mx-auto mb-6 h-32 w-32">
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#34d399] opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
                                    <img
                                        src={leader.image}
                                        alt={leader.name}
                                        className="relative h-full w-full rounded-full border-4 border-white/10 object-cover transition-all duration-300 group-hover:border-[#3b82f6]/50"
                                    />
                                </div>

                                {/* Text Content */}
                                <div className="text-center">
                                    <h3 className="mb-2 text-2xl font-bold text-white">
                                        {leader.name}
                                    </h3>
                                    <p className="mb-4 text-gray-400">
                                        {leader.role}
                                    </p>

                                    {/* Decorative line */}
                                    <div className="mx-auto h-1 w-16 bg-gradient-to-r from-[#3b82f6] to-[#34d399] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                </div>

                                {/* Background decoration */}
                                <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-[#3b82f6]/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

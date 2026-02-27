import { Link } from '@inertiajs/react';
import { motion } from 'motion/react';
import { Github, Linkedin, ShieldCheck, Twitter } from 'lucide-react';

export function Footer() {
    const currentYear = new Date().getFullYear();

    // Animation variants for that smooth, award-winning stagger effect
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        },
    };

    return (
        <footer className="relative overflow-hidden border-t border-zinc-900 bg-zinc-950 pt-24 pb-12 sm:pt-32">
            {/* Ambient Background Glows */}
            <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-20 blur-[120px]">
                <div className="h-full w-full rounded-full bg-gradient-to-b from-zinc-500 to-transparent" />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="relative z-10 mx-auto max-w-7xl px-6 md:px-8"
            >
                {/* Top Grid: Brand & Links */}
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-4 lg:gap-8">
                    {/* Brand Column */}
                    <motion.div variants={itemVariants} className="lg:col-span-1">
                        <Link href="/" className="mb-6 flex items-center gap-2.5 group w-fit">
                            <div className="flex h-8 w-8 items-center justify-center rounded bg-zinc-100 text-zinc-950 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                                <ShieldCheck className="h-5 w-5" strokeWidth={2.5} />
                            </div>
                            <span className="text-xl font-semibold tracking-tight text-zinc-100">
                                ZeroAI
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed text-zinc-400">
                            Cryptographic certainty in a synthetic world. Protect your platform from generative manipulation.
                        </p>
                    </motion.div>

                    {/* Navigation Columns */}
                    <div className="grid grid-cols-2 gap-8 lg:col-span-3 lg:grid-cols-3">
                        <motion.div variants={itemVariants}>
                            <h3 className="mb-4 text-sm font-semibold text-zinc-100">Product</h3>
                            <ul className="flex flex-col gap-3 text-sm text-zinc-400">
                                <li><Link href="#" className="transition-colors hover:text-zinc-100">Detection Engine</Link></li>
                                <li><Link href="#" className="transition-colors hover:text-zinc-100">API Documentation</Link></li>
                                <li><Link href="#" className="transition-colors hover:text-zinc-100">Enterprise</Link></li>
                                <li><Link href="#" className="transition-colors hover:text-zinc-100">Pricing</Link></li>
                            </ul>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <h3 className="mb-4 text-sm font-semibold text-zinc-100">Resources</h3>
                            <ul className="flex flex-col gap-3 text-sm text-zinc-400">
                                <li><Link href="#" className="transition-colors hover:text-zinc-100">Research Papers</Link></li>
                                <li><Link href="#" className="transition-colors hover:text-zinc-100">Threat Intelligence</Link></li>
                                <li><Link href="#" className="transition-colors hover:text-zinc-100">Open Source</Link></li>
                                <li><Link href="#" className="transition-colors hover:text-zinc-100">Status</Link></li>
                            </ul>
                        </motion.div>

                        <motion.div variants={itemVariants} className="col-span-2 lg:col-span-1">
                            <h3 className="mb-4 text-sm font-semibold text-zinc-100">Connect</h3>
                            <div className="flex gap-4">
                                <a href="#" className="group rounded-full border border-zinc-800 bg-zinc-900 p-2.5 transition-all hover:border-zinc-700 hover:bg-zinc-800">
                                    <Github className="h-4 w-4 text-zinc-400 transition-colors group-hover:text-zinc-100" />
                                </a>
                                <a href="#" className="group rounded-full border border-zinc-800 bg-zinc-900 p-2.5 transition-all hover:border-zinc-700 hover:bg-zinc-800">
                                    <Twitter className="h-4 w-4 text-zinc-400 transition-colors group-hover:text-zinc-100" />
                                </a>
                                <a href="#" className="group rounded-full border border-zinc-800 bg-zinc-900 p-2.5 transition-all hover:border-zinc-700 hover:bg-zinc-800">
                                    <Linkedin className="h-4 w-4 text-zinc-400 transition-colors group-hover:text-zinc-100" />
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <motion.div variants={itemVariants} className="mt-24 flex flex-col items-center justify-between gap-6 border-t border-zinc-900 pt-8 sm:flex-row">
                    <p className="text-xs text-zinc-500">
                        © {currentYear} ZeroAI Inc. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-xs text-zinc-500">
                        <Link href="#" className="transition-colors hover:text-zinc-300">Privacy Policy</Link>
                        <Link href="#" className="transition-colors hover:text-zinc-300">Terms of Service</Link>
                    </div>
                </motion.div>
            </motion.div>

            {/* The "Awwwards" oversized background text */}
            <div className="pointer-events-none absolute bottom-[-5%] left-1/2 w-full -translate-x-1/2 select-none text-center">
                <span className="bg-gradient-to-b from-zinc-800/20 to-transparent bg-clip-text text-[15vw] font-bold leading-none tracking-tighter text-transparent">
                    ZEROAI
                </span>
            </div>
        </footer>
    );
}

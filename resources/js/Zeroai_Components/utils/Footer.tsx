'use client';

import { Sparkles, Twitter, Linkedin, Github, Mail } from 'lucide-react';

export function Footer() {
    const footerLinks = {
        Product: [
            { name: 'Features', href: '#' },
            { name: 'Pricing', href: '#' },
            { name: 'API', href: '#' },
            { name: 'Documentation', href: '#' },
            { name: 'Integrations', href: '#' },
        ],
        Company: [
            { name: 'About Us', href: '#' },
            { name: 'Careers', href: '#' },
            { name: 'Blog', href: '#' },
            { name: 'Press Kit', href: '#' },
            { name: 'Partners', href: '#' },
        ],
        Legal: [
            { name: 'Privacy Policy', href: '#' },
            { name: 'Terms of Service', href: '#' },
            { name: 'Cookie Policy', href: '#' },
            { name: 'GDPR', href: '#' },
            { name: 'Security', href: '#' },
        ],
        Contact: [
            { name: 'Support', href: '#' },
            { name: 'Sales', href: '#' },
            { name: 'Press', href: '#' },
            { name: 'Feedback', href: '#' },
        ],
    };

    return (
        <footer className="border-t border-white/10 bg-[#0a0e1a]">
            <div className="mx-auto max-w-7xl px-8 py-16">
                {/* Top Section */}
                <div className="mb-16 grid gap-12 md:grid-cols-5">
                    {/* Brand Column */}
                    <div className="md:col-span-1">
                        <div className="mb-4 flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#3b82f6] to-[#2563eb]">
                                <Sparkles className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">
                                ZeroAI
                            </span>
                        </div>
                        <p className="mb-6 text-sm text-gray-500">
                            Detecting AI-generated content and restoring trust
                            in digital media.
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center gap-3">
                            <a
                                href="#"
                                className="group flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 transition-colors duration-200 hover:bg-white/10"
                            >
                                <Twitter className="h-4 w-4 text-gray-400 group-hover:text-[#3b82f6]" />
                            </a>
                            <a
                                href="#"
                                className="group flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 transition-colors duration-200 hover:bg-white/10"
                            >
                                <Linkedin className="h-4 w-4 text-gray-400 group-hover:text-[#3b82f6]" />
                            </a>
                            <a
                                href="#"
                                className="group flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 transition-colors duration-200 hover:bg-white/10"
                            >
                                <Github className="h-4 w-4 text-gray-400 group-hover:text-[#3b82f6]" />
                            </a>
                            <a
                                href="#"
                                className="group flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 transition-colors duration-200 hover:bg-white/10"
                            >
                                <Mail className="h-4 w-4 text-gray-400 group-hover:text-[#3b82f6]" />
                            </a>
                        </div>
                    </div>

                    {/* Links Columns */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h4 className="mb-4 font-semibold text-white">
                                {category}
                            </h4>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            className="text-sm text-gray-500 transition-colors duration-200 hover:text-gray-300"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Section */}
                <div className="border-t border-white/10 pt-8">
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <p className="text-sm text-gray-500">
                            © 2026 ZeroAI. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6">
                            <a
                                href="#"
                                className="text-sm text-gray-500 transition-colors duration-200 hover:text-gray-300"
                            >
                                Status
                            </a>
                            <a
                                href="#"
                                className="text-sm text-gray-500 transition-colors duration-200 hover:text-gray-300"
                            >
                                Changelog
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

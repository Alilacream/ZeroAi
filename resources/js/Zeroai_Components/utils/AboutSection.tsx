import { Shield, Zap, Target } from 'lucide-react';
import { motion } from 'motion/react';

function AboutSection() {
    return (
        <section className="relative bg-[#0a0e1a] px-8 py-32">
            <div className="mx-auto max-w-7xl">
                <div className="grid items-center gap-16 md:grid-cols-2">
                    {/* Left: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-5xl font-bold text-transparent">
                            Our Mission
                        </h2>
                        <p className="mb-8 text-xl leading-relaxed text-gray-400">
                            In an age where artificial intelligence can generate
                            convincing text, images, and media, ZeroAI stands as
                            the guardian of authenticity. Our advanced detection
                            technology analyzes content at the deepest level to
                            determine its origin—human or machine.
                        </p>
                        <p className="text-lg leading-relaxed text-gray-500">
                            We believe in transparency, accountability, and
                            restoring trust in the digital ecosystem. Whether
                            you're a journalist verifying sources, an educator
                            checking student work, or a business protecting
                            brand integrity, ZeroAI provides the clarity you
                            need.
                        </p>

                        <div className="mt-12 grid grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-[#3b82f6]/10">
                                    <Shield className="h-6 w-6 text-[#3b82f6]" />
                                </div>
                                <div className="mb-1 text-3xl font-bold text-white">
                                    86.76%
                                </div>
                                <div className="text-sm text-gray-500">
                                    Accuracy
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-[#34d399]/10">
                                    <Zap className="h-6 w-6 text-[#34d399]" />
                                </div>
                                <div className="mb-1 text-3xl font-bold text-white">
                                    &lt;10s
                                </div>
                                <div className="text-sm text-gray-500">
                                    Analysis
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-[#3b82f6]/10">
                                    <Target className="h-6 w-6 text-[#3b82f6]" />
                                </div>
                                <div className="mb-1 text-3xl font-bold text-white">
                                    500K+
                                </div>
                                <div className="text-sm text-gray-500">
                                    Users
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#111827]/80 to-[#1a2332]/80 p-8 shadow-2xl backdrop-blur-sm">
                            <img
                                src="https://images.unsplash.com/photo-1570572137089-1655117ad216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaSUyMHRlY2hub2xvZ3klMjBpbnRlcmZhY2UlMjBob2xvZ3JhcGhpY3xlbnwxfHx8fDE3NzE5Mzk0MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                                alt="AI Analysis Interface"
                                className="h-auto w-full rounded-lg"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />

                            {/* Floating elements */}
                            <div className="absolute top-4 right-4 rounded-lg border border-[#3b82f6]/30 bg-[#3b82f6]/20 px-4 py-2 backdrop-blur-md">
                                <div className="mb-1 text-xs text-gray-400">
                                    Detection Status
                                </div>
                                <div className="text-sm font-medium text-[#3b82f6]">
                                    AI Generated: 94%
                                </div>
                            </div>
                        </div>

                        {/* Decorative glow */}
                        <div className="absolute -inset-4 -z-10 bg-gradient-to-r from-[#3b82f6]/20 to-[#34d399]/20 opacity-50 blur-3xl" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
export default AboutSection;

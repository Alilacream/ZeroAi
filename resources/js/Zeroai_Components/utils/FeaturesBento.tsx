import { motion } from 'motion/react';
import { Fingerprint, Image as ImageIcon, ShieldAlert, Video } from 'lucide-react';

export function FeaturesBento() {
    return (
        <section className="relative mx-auto max-w-7xl px-6 py-24 md:px-8 md:py-32">
            <div className="mb-16 max-w-2xl">
                <h2 className="mb-4 text-3xl font-semibold tracking-tight text-zinc-100 sm:text-4xl">
                    Multimodal detection. <br />
                    <span className="text-zinc-500">Absolute certainty.</span>
                </h2>
                <p className="text-lg text-zinc-400">
                    We don't just look for watermarks. Our engine analyzes pixel-level anomalies, metadata corruption, and spectral artifacts across all media types.
                </p>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2">
                {/* Large Featured Box (Video) */}
                <motion.div
                    whileHover={{ scale: 0.99 }}
                    className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 md:col-span-2"
                >
                    <div className="absolute right-0 bottom-0 opacity-10 transition-opacity group-hover:opacity-20">
                        <Video className="h-64 w-64 -mb-12 -mr-12" />
                    </div>
                    <Video className="mb-6 h-8 w-8 text-zinc-300" />
                    <h3 className="mb-2 text-xl font-semibold text-zinc-100">Frame-by-Frame Video Analysis</h3>
                    <p className="max-w-md text-zinc-400">
                        Deepfakes often fail over time. We analyze temporal consistency, unnatural micro-expressions, and frame-blending artifacts to detect manipulated video content that human eyes miss.
                    </p>
                </motion.div>

                {/* Standard Box 1 (Image) */}
                <motion.div
                    whileHover={{ scale: 0.99 }}
                    className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8"
                >
                    <ImageIcon className="mb-6 h-8 w-8 text-zinc-300" />
                    <h3 className="mb-2 text-xl font-semibold text-zinc-100">Static Image Forensics</h3>
                    <p className="text-zinc-400">
                        Detect diffusion-model artifacts, impossible geometry, and latent noise patterns in generated images.
                    </p>
                </motion.div>

                {/* Standard Box 2 (Real-time) */}
                <motion.div
                    whileHover={{ scale: 0.99 }}
                    className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8"
                >
                    <ShieldAlert className="mb-6 h-8 w-8 text-zinc-300" />
                    <h3 className="mb-2 text-xl font-semibold text-zinc-100">Zero-Day Protection</h3>
                    <p className="text-zinc-400">
                        Our models continuously train against the latest generation architectures to stay ahead of novel synthetic threats.
                    </p>
                </motion.div>

                {/* Large Featured Box (Fingerprint) */}
                <motion.div
                    whileHover={{ scale: 0.99 }}
                    className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 md:col-span-2"
                >
                    <Fingerprint className="mb-6 h-8 w-8 text-zinc-300" />
                    <h3 className="mb-2 text-xl font-semibold text-zinc-100">Cryptographic Provenance</h3>
                    <p className="max-w-md text-zinc-400">
                        Generate immutable cryptographic hashes for authentic media, ensuring that once a file is verified, its chain of custody cannot be silently altered.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

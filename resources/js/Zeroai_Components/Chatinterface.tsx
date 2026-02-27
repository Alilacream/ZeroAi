import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, ScanLine, Paperclip } from 'lucide-react';

export default function ChatInterface() {
    const [isScanning, setIsScanning] = useState(false);

    return (
        <div className="mx-auto flex h-[calc(100vh-4rem)] max-w-4xl flex-col rounded-xl border border-zinc-800 bg-[#0a0a0a] shadow-2xl">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-800/50 bg-zinc-950/50 px-6 py-4 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <div className="flex h-2 w-2 items-center justify-center rounded-full bg-emerald-500/20">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <span className="text-sm font-medium text-zinc-300">Engine v2.0 Ready</span>
                </div>
            </div>

            {/* Chat History Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Empty State / Welcome */}
                <div className="flex h-full flex-col items-center justify-center text-center">
                    <div className="mb-4 rounded-lg border border-zinc-800 bg-zinc-900/50 p-3">
                        <ScanLine className="h-6 w-6 text-zinc-400" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-zinc-100">Initialize Scan</h3>
                    <p className="max-w-sm text-sm text-zinc-500">
                        Upload a video, image, or text snippet to begin cryptographic and synthetic anomaly detection.
                    </p>
                </div>
            </div>

            {/* Input Area */}
            <div className="p-4">
                <div className="relative flex items-end gap-2 rounded-xl border border-zinc-800 bg-zinc-900/50 p-2 focus-within:border-zinc-700 focus-within:ring-1 focus-within:ring-zinc-700">

                    <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100">
                        <Paperclip className="h-5 w-5" />
                    </button>

                    <textarea
                        rows={1}
                        placeholder="Paste media URL or describe the analysis required..."
                        className="max-h-32 min-h-[40px] w-full resize-none bg-transparent py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none"
                    />

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-950 transition-colors hover:bg-white"
                    >
                        <Send className="h-4 w-4" />
                    </motion.button>
                </div>
                <div className="mt-2 text-center text-xs text-zinc-600">
                    ZeroAI may produce inaccurate reports. Verify critical cryptographic hashes independently.
                </div>
            </div>
        </div>
    );
}

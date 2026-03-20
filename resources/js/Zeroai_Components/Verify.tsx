import axios from 'axios';
import { FileUp, RefreshCcw, CheckCircle, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef } from 'react';
export default function Verify() {
    const [status, setStatus] = useState<
        'idle' | 'scanning' | 'complete' | 'error'
    >('idle');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [scanMessage, setScanMessage] = useState('Processing file...');

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const originalFile = e.target.files[0];
            setSelectedFile(originalFile);
            setStatus('scanning');
            setScanMessage('Preparing verification...');

            try {
                // Prepare form data
                const formData = new FormData();
                formData.append('file', originalFile);

                // Send to our verification endpoint
                const response = await axios.post('/verify', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    responseType: 'blob', // Important for file downloads
                });

                // The response should be a file download
                // We'll trigger a download using the blob
                const url = window.URL.createObjectURL(
                    new Blob([response.data]),
                );
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', originalFile.name);
                document.body.appendChild(link);
                link.click();
                link.remove();

                setStatus('complete');
                setScanMessage('Verification complete!');
            } catch (error: unknown) {
                console.error('Error processing file:', error);
                setStatus('error');
            }
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const resetScanner = () => {
        setSelectedFile(null);
        setStatus('idle');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="flex h-full w-full items-center justify-center bg-zinc-950/50 p-6 md:p-12">
            {/* Hidden File Input */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
                accept="image/*"
            />

            <div className="w-full max-w-3xl">
                <AnimatePresence mode="wait">
                    {status === 'idle' && (
                        <motion.div
                            key="idle"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-zinc-800 bg-zinc-900/20 p-16 text-center transition-colors hover:border-zinc-700 hover:bg-zinc-900/40"
                            onClick={triggerFileInput}
                        >
                            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-zinc-800/50 shadow-inner">
                                <FileUp className="h-10 w-10 text-zinc-400" />
                            </div>
                            <h2 className="mb-3 text-2xl font-medium tracking-tight text-zinc-100">
                                Upload Image for Verification
                            </h2>
                            <p className="mx-auto mb-8 max-w-md leading-relaxed text-zinc-500">
                                Select an image file to embed hidden
                                AI-authentication markers.
                            </p>
                            <button className="rounded-xl bg-zinc-100 px-8 py-3 text-sm font-medium text-zinc-950 shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-colors hover:bg-white">
                                Browse Files
                            </button>
                        </motion.div>
                    )}

                    {status === 'scanning' && selectedFile && (
                        <motion.div
                            key="scanning"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex flex-col items-center justify-center rounded-3xl border border-zinc-800 bg-zinc-900/40 p-16 text-center shadow-2xl backdrop-blur-sm"
                        >
                            <div className="relative mb-8 flex h-24 w-24 items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-800">
                                <FileUp className="h-10 w-10 text-zinc-300" />
                                <motion.div
                                    className="absolute inset-0 rounded-2xl border-2 border-zinc-400"
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        opacity: [0.5, 0, 0.5],
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                    }}
                                />
                            </div>
                            <h2 className="mb-2 text-xl font-medium tracking-tight text-zinc-100">
                                Processing Verification
                            </h2>
                            <p className="mb-6 text-zinc-400">
                                Analyzing{' '}
                                <span className="font-medium text-zinc-300">
                                    {selectedFile.name}
                                </span>
                            </p>

                            <div className="flex gap-2">
                                <motion.div
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 1.2,
                                        delay: 0,
                                    }}
                                    className="h-2 w-2 rounded-full bg-zinc-500"
                                />
                                <motion.div
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 1.2,
                                        delay: 0.2,
                                    }}
                                    className="h-2 w-2 rounded-full bg-zinc-500"
                                />
                                <motion.div
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 1.2,
                                        delay: 0.4,
                                    }}
                                    className="h-2 w-2 rounded-full bg-zinc-500"
                                />
                            </div>
                            <p className="mt-4 text-sm text-zinc-500">
                                {scanMessage}
                            </p>
                        </motion.div>
                    )}

                    {status === 'error' && selectedFile && (
                        <motion.div
                            key="error"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col items-center justify-center rounded-3xl border border-red-900/50 bg-red-950/20 p-16 text-center shadow-2xl backdrop-blur-sm"
                        >
                            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-900/30 text-red-500">
                                <XCircle className="h-10 w-10" />
                            </div>
                            <h2 className="mb-3 text-2xl font-medium tracking-tight text-zinc-100">
                                Verification Failed
                            </h2>
                            <p className="mx-auto mb-8 max-w-md text-zinc-400">
                                There was an error processing the file. Please
                                try again.
                            </p>
                            <button
                                onClick={resetScanner}
                                className="rounded-xl bg-zinc-800 px-8 py-3 text-sm font-medium text-zinc-200 transition-colors hover:bg-zinc-700 hover:text-white"
                            >
                                Try Again
                            </button>
                        </motion.div>
                    )}

                    {status === 'complete' && selectedFile && (
                        <motion.div
                            key="complete"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col rounded-3xl border border-zinc-800 bg-zinc-900/40 p-8 shadow-2xl backdrop-blur-sm md:p-12"
                        >
                            <div className="mb-8 flex items-center gap-6 border-b border-zinc-800/50 pb-8">
                                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-800">
                                    <FileUp className="h-8 w-8 text-zinc-400" />
                                </div>
                                <div className="flex flex-col overflow-hidden">
                                    <h3 className="truncate text-xl font-medium text-zinc-100">
                                        {selectedFile.name}
                                    </h3>
                                    <span className="text-sm text-zinc-500">
                                        {(
                                            selectedFile.size /
                                            1024 /
                                            1024
                                        ).toFixed(2)}{' '}
                                        MB •{' '}
                                        {selectedFile.type || 'Unknown Format'}
                                    </span>
                                </div>
                            </div>

                            <div className="mb-10 space-y-6">
                                <div className="flex items-start gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">
                                    <CheckCircle className="mt-0.5 h-6 w-6 shrink-0 text-emerald-400" />
                                    <div>
                                        <h4 className="mb-1 font-medium text-emerald-200">
                                            Verification Complete
                                        </h4>
                                        <p className="text-sm leading-relaxed text-emerald-200/70">
                                            Your image has been processed and
                                            contains hidden AI-authentication
                                            markers "(ZeroAI: trusted)" that are
                                            only detectable by artificial
                                            intelligence.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={resetScanner}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-800 py-3.5 text-sm font-medium text-zinc-200 transition-colors hover:bg-zinc-700 hover:text-white"
                            >
                                <RefreshCcw className="h-4 w-4" />
                                Verify Another File
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

import { Client } from '@gradio/client';
import {
    Image as ImageIcon,
    Video,
    FileUp,
    RefreshCcw,
    CheckCircle,
    AlertTriangle,
    XCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef } from 'react';

interface Confidence {
    label: string;
    confidence: number;
}

interface ScanResult {
    label: string;
    confidences: Confidence[];
}

export default function ChatInterface() {
    const [status, setStatus] = useState<
        'idle' | 'scanning' | 'complete' | 'error'
    >('idle');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [scanResult, setScanResult] = useState<ScanResult | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [scanMessage, setScanMessage] = useState('Running forensic scan...');

    const compressImage = async (file: File): Promise<File> => {
        if (!file.type.startsWith('image/')) return file;
        // ... (Keep your existing compression logic exactly as is) ...
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target?.result as string;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_SIZE = 1024;
                    let { width, height } = img;
                    if (width > height && width > MAX_SIZE) {
                        height *= MAX_SIZE / width;
                        width = MAX_SIZE;
                    } else if (height > MAX_SIZE) {
                        width *= MAX_SIZE / height;
                        height = MAX_SIZE;
                    }
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx?.drawImage(img, 0, 0, width, height);
                    canvas.toBlob(
                        (blob) => {
                            if (blob)
                                resolve(
                                    new File([blob], file.name, {
                                        type: 'image/jpeg',
                                    }),
                                );
                            else resolve(file);
                        },
                        'image/jpeg',
                        0.85,
                    );
                };
            };
        });
    };

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const originalFile = e.target.files[0];
            setSelectedFile(originalFile);
            setStatus('scanning');
            setScanMessage('Optimizing media...');

            try {
                const fileToUpload = await compressImage(originalFile);
                setScanMessage('Connecting to AI Engine...');

                // --- NEW LOGIC: Direct Gradio Client Call ---

                // 1. Connect to YOUR space
                // Note: We use the space name, not the full URL
                const client = await Client.connect('Alilacream/truthseeker');

                setScanMessage('Analyzing pixels (this may take 10-30s)...');

                // 2. Predict
                // The client automatically handles the submit -> poll -> complete flow!
                const result = await client.predict('/predict_deepfake', {
                    image: fileToUpload,
                });

                console.log('Raw Gradio Result:', result);

                // 3. Parse the result to match our UI structure
                // Expected structure from your test: [{ label: "...", confidences: [...] }]
                const data = result.data;

                if (!data || data.length === 0) {
                    throw new Error('Empty response from AI');
                }

                const wrapper = data[0];
                const label = wrapper.label || 'Unknown';
                const confidences = wrapper.confidences || [];

                setScanResult({
                    label,
                    confidences,
                });

                setStatus('complete');
            } catch (error: any) {
                console.error('Error analyzing media:', error);
                setStatus('error');
            }
        }
    };

    const triggerFileInput = () => fileInputRef.current?.click();

    const resetScanner = () => {
        setSelectedFile(null);
        setScanResult(null);
        setStatus('idle');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    // Updated logic to catch "AI_Generated" as well
    const isFake =
        scanResult?.label?.toLowerCase().includes('fake') ||
        scanResult?.label?.toLowerCase().includes('ai') ||
        scanResult?.label?.toLowerCase().includes('generated') ||
        false;

    const confidences = scanResult?.confidences || [];
    let topConfidence = 0;
    if (confidences.length > 0) {
        topConfidence =
            Math.max(...confidences.map((c: Confidence) => c.confidence)) * 100;
    }

    return (
        <div className="flex h-full w-full items-center justify-center bg-zinc-950/50 p-6 md:p-12">
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
                                Upload Media for Analysis
                            </h2>
                            <p className="mx-auto mb-8 max-w-md leading-relaxed text-zinc-500">
                                Select an image to verify authenticity.
                            </p>
                            <button className="rounded-xl bg-zinc-100 px-8 py-3 text-sm font-medium text-zinc-950 shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:bg-white">
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
                                <ImageIcon className="h-10 w-10 text-zinc-300" />
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
                                Running Forensic Scan
                            </h2>
                            <p className="mb-6 text-zinc-400">
                                Analyzing{' '}
                                <span className="font-medium text-zinc-300">
                                    {selectedFile.name}
                                </span>
                            </p>
                            <div className="flex gap-2">
                                {[0, 0.2, 0.4].map((delay, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                        transition={{
                                            repeat: Infinity,
                                            duration: 1.2,
                                            delay,
                                        }}
                                        className="h-2 w-2 rounded-full bg-zinc-500"
                                    />
                                ))}
                            </div>
                            <p className="mt-4 text-sm text-zinc-500">
                                {scanMessage}
                            </p>
                        </motion.div>
                    )}

                    {status === 'error' && (
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
                                Scan Failed
                            </h2>
                            <p className="mx-auto mb-8 max-w-md text-zinc-400">
                                The AI engine timed out or encountered an error.
                                Ensure the space is awake.
                            </p>
                            <button
                                onClick={resetScanner}
                                className="rounded-xl bg-zinc-800 px-8 py-3 text-sm font-medium text-zinc-200 hover:bg-zinc-700"
                            >
                                Try Again
                            </button>
                        </motion.div>
                    )}

                    {status === 'complete' && scanResult && (
                        <motion.div
                            key="complete"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col rounded-3xl border border-zinc-800 bg-zinc-900/40 p-8 shadow-2xl backdrop-blur-sm md:p-12"
                        >
                            <div className="mb-8 flex items-center gap-6 border-b border-zinc-800/50 pb-8">
                                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-800">
                                    <ImageIcon className="h-8 w-8 text-zinc-400" />
                                </div>
                                <div className="flex flex-col overflow-hidden">
                                    <h3 className="truncate text-xl font-medium text-zinc-100">
                                        {selectedFile?.name}
                                    </h3>
                                    <span className="text-sm text-zinc-500">
                                        {(
                                            (selectedFile?.size || 0) /
                                            1024 /
                                            1024
                                        ).toFixed(2)}{' '}
                                        MB
                                    </span>
                                </div>
                            </div>

                            <div className="mb-10 space-y-6">
                                {isFake ? (
                                    <div className="flex items-start gap-4 rounded-2xl border border-red-500/20 bg-red-500/10 p-5">
                                        <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-red-400" />
                                        <div>
                                            <h4 className="mb-1 font-medium text-red-200">
                                                Manipulation Detected
                                            </h4>
                                            <p className="text-sm leading-relaxed text-red-200/70">
                                                The media exhibits
                                                inconsistencies indicating
                                                synthetic generation.
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-start gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">
                                        <CheckCircle className="mt-0.5 h-6 w-6 shrink-0 text-emerald-400" />
                                        <div>
                                            <h4 className="mb-1 font-medium text-emerald-200">
                                                Analysis Passed
                                            </h4>
                                            <p className="text-sm leading-relaxed text-emerald-200/70">
                                                High probability of authentic
                                                origin.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/50 p-5">
                                        <div className="mb-1 text-sm text-zinc-500">
                                            Detection Result
                                        </div>
                                        <div
                                            className={`text-lg font-medium capitalize ${isFake ? 'text-red-400' : 'text-emerald-400'}`}
                                        >
                                            {scanResult.label}
                                        </div>
                                    </div>
                                    <div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/50 p-5">
                                        <div className="mb-1 text-sm text-zinc-500">
                                            Model Confidence
                                        </div>
                                        <div className="text-lg font-medium text-zinc-200">
                                            {topConfidence > 0
                                                ? `${topConfidence.toFixed(1)}%`
                                                : 'N/A'}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={resetScanner}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-800 py-3.5 text-sm font-medium text-zinc-200 hover:bg-zinc-700"
                            >
                                <RefreshCcw className="h-4 w-4" /> Scan Another
                                File
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

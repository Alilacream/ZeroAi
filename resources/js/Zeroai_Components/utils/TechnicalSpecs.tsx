import { CheckCircle2 } from 'lucide-react';
import { source_code } from '../dev/variable';
export function TechnicalSpecs() {
    const features = [
        'Sub-200ms API response times',
        'Supports MP4, AVI, MOV, JPEG, PNG, WEBP',
        'REST API & WebSocket integration',
        'On-premise deployment available',
        'Detailed confidence scoring (0.00 to 1.00)',
        'Automated false-positive filtering',
    ];

    return (
        <section className="border-t border-zinc-800/50 bg-zinc-950 px-6 py-24 md:px-8">
            <div className="mx-auto flex max-w-7xl flex-col gap-16 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-xl">
                    <h2 className="mb-6 text-3xl font-semibold tracking-tight text-zinc-100">
                        Engineered for scale.
                    </h2>
                    <p className="mb-8 text-lg text-zinc-400">
                        Whether you are scanning a single uploaded profile
                        picture or processing thousands of hours of video
                        content daily, our infrastructure is built to handle
                        high-throughput analytical workloads without dropping
                        packets.
                    </p>

                    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {features.map((feature, i) => (
                            <li
                                key={i}
                                className="flex items-center gap-3 text-sm text-zinc-300"
                            >
                                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Mock Code Block UI to emphasize the "developer/tech" feel */}
                <div className="w-full max-w-lg rounded-xl border border-zinc-800 bg-[#0d0d0d] p-6 font-mono text-sm shadow-2xl">
                    <div className="mb-4 flex gap-2">
                        <div className="h-3 w-3 rounded-full bg-zinc-700" />
                        <div className="h-3 w-3 rounded-full bg-zinc-700" />
                        <div className="h-3 w-3 rounded-full bg-zinc-700" />
                    </div>
                    <div className="text-emerald-400">
                        POST{' '}
                        <span className="text-zinc-300">/v1/scan/media</span>
                    </div>
                    <div className="mt-4 text-zinc-500">// Response</div>
                    <pre className="mt-2 text-zinc-300">{source_code}</pre>
                </div>
            </div>
        </section>
    );
}

import { useStream } from '@laravel/stream-react';
import { useState } from 'react';

<<<<<<< HEAD
interface ChatInterfaceProps {
    scanResult?: {
        success?: unknown;
        error?: string;
    };
}

function ChatInterface({ scanResult }: ChatInterfaceProps) {
    const [input, setInput] = useState('');

    const { data, isFetching, isStreaming, send } = useStream('/chat');

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        send({ content: input });
    };

=======
function ChatInterface() {
    const { data, setData, post, processing } = useForm({
        content: '',
    });
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(scan.store.url());
    };

>>>>>>> parent of faee061 (Fixed an Inertia Bug, now what needs to be done is seeing the response of the Ai)
    return (
        <form onSubmit={submit} className="space-y-4">
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="h-64 w-full rounded-lg border-zinc-800 bg-zinc-900 p-4 text-white focus:ring-blue-500"
                placeholder="Paste text here to check for AI, Fake news, or Fraud..."
            />
            <button
                disabled={isFetching || isStreaming}
                className="rounded-md bg-blue-600 px-6 py-2 font-bold text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
                {isFetching
                    ? 'Connecting...'
                    : isStreaming
                      ? 'Analyzing...'
                      : 'Verify Content'}
            </button>
<<<<<<< HEAD

            {(data || scanResult) && (
                <div className="mt-6 rounded-lg border border-blue-500/50 bg-zinc-800 p-4 text-white">
                    <h3 className="mb-2 text-xl font-bold">
                        Analysis Results:
                    </h3>
                    <pre className="overflow-auto text-xs text-zinc-400">
                        {data || JSON.stringify(scanResult, null, 2)}
                    </pre>
=======
            {processing ? (
                <div className="toast toast-top toast-center animate-fade-out">
                    Form sent
                </div>
            ) : (
                <div className="toast toast-top toast-center animate-fade-out">
                    Still waiting
>>>>>>> parent of faee061 (Fixed an Inertia Bug, now what needs to be done is seeing the response of the Ai)
                </div>
            )}
        </form>
    );
}

export default ChatInterface;

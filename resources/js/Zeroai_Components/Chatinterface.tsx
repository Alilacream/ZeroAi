import { useForm } from '@inertiajs/react';
import scan from '@/routes/scan';

function ChatInterface() {
    const { data, setData, post, processing } = useForm({
        content: '',
    });
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(scan.store.url());
    };

    return (
        <form onSubmit={submit} className="space-y-4">
            <textarea
                value={data.content}
                onChange={(e) => setData('content', e.target.value)}
                className="h-64 w-full rounded-lg border-zinc-800 bg-zinc-900 p-4 text-white focus:ring-blue-500"
                placeholder="Paste text here to check for AI, Fake news, or Fraud..."
            />
            <button
                disabled={processing}
                className="rounded-md bg-blue-600 px-6 py-2 font-bold text-white transition hover:bg-blue-700"
            >
                {processing ? 'Analyzing Chaos...' : 'Verify Content'}
            </button>
            {processing ? (
                <div className="toast toast-top toast-center animate-fade-out">
                    Form sent
                </div>
            ) : (
                <div className="toast toast-top toast-center animate-fade-out">
                    Still waiting
                </div>
            )}
        </form>
    );
}

export default ChatInterface;

import { useForm } from "@inertiajs/react";
import AlertError from "./alert-error";
function ChatInterface() {
   const { data, setData, post, processing, error } = useForm({
        content: '',
    });
    // what is this ?
    const submit = (e) => {
        e.preventDefault();
        post(route('scan.store'));
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
            </form>
   ) 
}

export default ChatInterface;
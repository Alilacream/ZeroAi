import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { chat } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import ChatInterface from '@/Zeroai_Components/Chatinterface';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Chat',
        href: chat().url,
    },
];

export default function Chat() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Chat" />
            <div className="p-6">
                <h1 className="mb-6 text-2xl font-bold text-white">AI Chat</h1>
                <ChatInterface />
            </div>
        </AppLayout>
    );
}

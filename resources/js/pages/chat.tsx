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
            <Head title="Workspace" />
            <div className="absolute inset-0">
                <ChatInterface />
            </div>
        </AppLayout>
    );
}

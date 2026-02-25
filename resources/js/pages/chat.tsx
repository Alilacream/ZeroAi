import { usePage } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import ChatInterface from '@/Zeroai_Components/Chatinterface';
import { chat } from '@/routes';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Chat',
        href: chat().url,
    },
];

export default function Chat() {
    const { props } = usePage();
    const chatData = props.chat;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Chat" />
            <ChatInterface scanResult={chatData} />
        </AppLayout>
    );
}

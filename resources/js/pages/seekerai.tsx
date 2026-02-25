import { usePage } from '@inertiajs/react';
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

export default function SeekerAI() {
    const { props } = usePage();
    const seekeraiData = props.seekerai;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Chat" />
            <ChatInterface scanResult={seekeraiData} />
        </AppLayout>
    );
}

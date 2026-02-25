import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
<<<<<<< HEAD:resources/js/pages/chat.tsx
=======
import { seekerai } from '@/routes';
>>>>>>> parent of a5b742f (Facing a devious bug, don't know how to if the request is being sent or not, is it being handeled or not, does the ui does not wanna show it or not.):resources/js/pages/seekerai.tsx
import type { BreadcrumbItem } from '@/types';
import ChatInterface from '@/Zeroai_Components/Chatinterface';
import { chat } from '@/routes';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'SeekerAI',
        href: seekerai().url,
    },
];

export default function SeekerAI() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="SeekerAI" />
            <ChatInterface />
        </AppLayout>
    );
}

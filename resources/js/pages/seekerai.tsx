import { usePage } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { seekerai } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import ChatInterface from '@/Zeroai_Components/Chatinterface';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'SeekerAI',
        href: seekerai().url,
    },
];

export default function SeekerAI() {
    const { props } = usePage();
    const seekeraiData = props.seekerai;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="SeekerAI" />
            <ChatInterface scanResult={seekeraiData} />
        </AppLayout>
    );
}

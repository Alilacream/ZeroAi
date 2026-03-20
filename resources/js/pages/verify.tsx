import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { verify } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import Verify from '@/Zeroai_Components/Verify';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Chat',
        href: verify().url,
    },
];

export default function Chat() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Workspace" />
            <div className="absolute inset-0">
                <Verify />
            </div>
        </AppLayout>
    );
}

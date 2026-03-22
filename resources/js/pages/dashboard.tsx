import { Head, usePage, Link } from '@inertiajs/react';
import { ArrowUpRight } from 'lucide-react';
import type { Variants } from 'motion/react';
import { motion } from 'motion/react';
import AppLayout from '@/layouts/app-layout';
import { dashboard, chat } from '@/routes';
import type { BreadcrumbItem, Auth } from '@/types';

interface ScanHistoryItem {
    id: string;
    filename: string;
    date: string;
    status: string;
    score: number;
}

interface DashboardProps {
    stats: {
        total: number;
        video: number;
        image: number;
        manipulated: number;
    };
    recentScans: ScanHistoryItem[];
}

interface PageProps extends DashboardProps {
    auth: Auth;
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    const { props } = usePage<PageProps>();
    const { auth, stats, recentScans } = props;
    const user = auth?.user;

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.04,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] },
        },
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex h-full w-full flex-col overflow-y-auto bg-zinc-950 px-6 py-12 md:px-16">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16 flex flex-col gap-6 border-b border-zinc-900 pb-12 md:flex-row md:items-end md:justify-between"
                >
                    <div className="space-y-1">
                        <h1 className="text-5xl font-bold tracking-tight text-zinc-100">
                            Overview
                        </h1>
                        <p className="text-sm font-medium text-zinc-500">
                            Forensic stream monitoring •{' '}
                            {new Date().toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                            })}
                        </p>
                    </div>
                    <Link
                        href={chat().url}
                        className="group flex w-fit items-center gap-2 rounded-lg bg-zinc-100 px-6 py-3 text-sm font-bold text-zinc-950 transition-all hover:bg-white active:scale-[0.98]"
                    >
                        New Analysis
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                </motion.div>

                {/* KPI Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="mb-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {[
                        {
                            label: 'Processed Evidence',
                            value: stats.total,
                            color: 'text-zinc-500',
                        },
                        {
                            label: 'Video Streams',
                            value: stats.video,
                            color: 'text-zinc-500',
                        },
                        {
                            label: 'Image Metadata',
                            value: stats.image,
                            color: 'text-zinc-500',
                        },
                        {
                            label: 'Detected Threats',
                            value: stats.manipulated,
                            color: 'text-red-500',
                        },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            className="group flex flex-col rounded-xl border border-zinc-900 bg-zinc-900/10 p-8 transition-all hover:border-zinc-800 hover:bg-zinc-900/20"
                        >
                            <span className="mb-4 text-[10px] font-bold tracking-[0.25em] text-zinc-600 uppercase transition-colors group-hover:text-zinc-500">
                                {item.label}
                            </span>
                            <span
                                className={`text-4xl font-bold tracking-tighter transition-colors ${item.label.includes('Threats') && item.value > 0 ? 'text-red-500' : 'text-zinc-100'}`}
                            >
                                {item.value.toString().padStart(2, '0')}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                    {/* Recent History Table */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col lg:col-span-2"
                    >
                        <div className="mb-8 flex items-center justify-between">
                            <h2 className="text-xs font-bold tracking-[0.2em] text-zinc-500 uppercase">
                                Evidence History
                            </h2>
                            <button className="text-[10px] font-bold tracking-widest text-zinc-700 uppercase transition-colors hover:text-zinc-400">
                                Export Stream
                            </button>
                        </div>

                        <div className="overflow-x-auto rounded-xl border border-zinc-900">
                            <table className="w-full text-left text-sm whitespace-nowrap">
                                <thead className="bg-zinc-950 text-[10px] font-bold tracking-[0.1em] text-zinc-700 uppercase">
                                    <tr>
                                        <th className="px-8 py-5">UID</th>
                                        <th className="px-8 py-5">Source</th>
                                        <th className="px-8 py-5">
                                            Confidence
                                        </th>
                                        <th className="px-8 py-5 text-right">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-900">
                                    {recentScans && recentScans.length > 0 ? (
                                        recentScans.map((scan) => {
                                            // LOGIC FIX: Detect AI/Generated/Fake as a threat
                                            const statusLower =
                                                scan.status?.toLowerCase() ||
                                                '';
                                            const isThreat =
                                                statusLower.includes('fake') ||
                                                statusLower.includes(
                                                    'manipulated',
                                                ) ||
                                                statusLower.includes('ai') ||
                                                statusLower.includes(
                                                    'generated',
                                                );

                                            return (
                                                <tr
                                                    key={scan.id}
                                                    className="group cursor-pointer transition-colors hover:bg-zinc-900/20"
                                                >
                                                    <td className="px-8 py-6 font-mono text-[10px] text-zinc-600 transition-colors group-hover:text-zinc-500">
                                                        {scan.id}
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <div className="flex flex-col">
                                                            <span className="text-xs font-bold text-zinc-300 transition-colors group-hover:text-zinc-100">
                                                                {scan.filename}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <div className="flex items-center gap-4">
                                                            <div className="h-[2px] w-12 overflow-hidden rounded-full bg-zinc-900">
                                                                <motion.div
                                                                    initial={{
                                                                        width: 0,
                                                                    }}
                                                                    animate={{
                                                                        width: `${Math.min(scan.score, 100)}%`,
                                                                    }}
                                                                    className={`h-full ${scan.score > 70 ? 'bg-zinc-100' : scan.score > 40 ? 'bg-zinc-500' : 'bg-red-900'}`}
                                                                />
                                                            </div>
                                                            <span className="font-mono text-[11px] font-bold text-zinc-500">
                                                                {scan.score.toFixed(
                                                                    0,
                                                                )}
                                                                %
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6 text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <span
                                                                className={`h-1 w-1 rounded-full ${
                                                                    isThreat
                                                                        ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]'
                                                                        : 'bg-zinc-100'
                                                                }`}
                                                            />
                                                            <span
                                                                className={`text-[10px] font-bold tracking-widest uppercase ${
                                                                    isThreat
                                                                        ? 'text-red-500'
                                                                        : 'text-zinc-100'
                                                                }`}
                                                            >
                                                                {isThreat
                                                                    ? 'Manipulated'
                                                                    : 'Verified'}
                                                            </span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={4}
                                                className="px-8 py-24 text-center text-[10px] font-bold tracking-[0.2em] text-zinc-800 uppercase"
                                            >
                                                Stream Empty • No Evidence Found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>

                    {/* Right Column: Security Profile / Actions */}
                    <div className="flex flex-col gap-12">
                        {/* Security Pulse Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="rounded-2xl border border-zinc-900 bg-zinc-900/5 p-8"
                        >
                            <div className="mb-10 flex items-center justify-between">
                                <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-600 uppercase">
                                    Encrypted Session
                                </span>
                                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                            </div>

                            <h3 className="mb-2 text-2xl font-bold tracking-tight text-zinc-100">
                                Forensic ID
                            </h3>
                            <p className="text-xs leading-relaxed font-medium text-zinc-500">
                                Active cryptographic verification layer
                                established.
                            </p>

                            <div className="mt-12 space-y-6">
                                <div className="flex flex-col gap-1 border-t border-zinc-900 pt-6">
                                    <span className="text-[10px] font-bold tracking-widest text-zinc-700 uppercase">
                                        Identity
                                    </span>
                                    <span className="text-sm font-bold text-zinc-300">
                                        {user?.name || 'Guest'}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1 border-t border-zinc-900 pt-6">
                                    <span className="text-[10px] font-bold tracking-widest text-zinc-700 uppercase">
                                        Access Key
                                    </span>
                                    <span className="font-mono text-[10px] text-zinc-500">
                                        ****-****-7721
                                    </span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Integration Quick Link */}
                        <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Link
                                href="#"
                                className="group flex flex-col gap-2 rounded-2xl border border-zinc-900 p-8 transition-all hover:bg-zinc-900/10"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase transition-colors group-hover:text-zinc-400">
                                        API Keys
                                    </span>
                                    <ArrowUpRight className="h-3.5 w-3.5 text-zinc-800 transition-colors group-hover:text-zinc-500" />
                                </div>
                                <p className="text-[11px] leading-relaxed font-medium text-zinc-600 transition-colors group-hover:text-zinc-500">
                                    Manage keys for external system integration.
                                </p>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

import { Head, usePage } from '@inertiajs/react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import AppLayout from '@/layouts/app-layout';

const chartData = [
    { month: 'Jan', value: 10 },
    { month: 'Feb', value: 20 },
    { month: 'Mar', value: 35 },
    { month: 'Apr', value: 50 },
    { month: 'May', value: 70 },
];

export default function Dashboard() {
    const { props } = usePage();
    const userName = props.auth?.user?.name || 'Ali';

    return (
        <AppLayout>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border">
                        <p className="text-sm text-muted-foreground">
                            Hello There.
                        </p>
                        <p className="text-2xl font-semibold">{userName}</p>
                    </div>
                    <div className="rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border">
                        <p className="text-sm text-muted-foreground">
                            Times Asked AI
                        </p>
                        <p className="text-2xl font-semibold">1</p>
                    </div>
                    <div className="rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border">
                        <p className="text-sm text-muted-foreground">
                            AI Usage
                        </p>
                        <div className="mt-2">
                            <div className="flex justify-between text-sm">
                                <span className="font-semibold">26%</span>
                            </div>
                            <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                                <div
                                    className="h-full rounded-full bg-blue-600"
                                    style={{ width: '26%' }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl border border-sidebar-border/70 p-6 md:col-span-2 lg:col-span-2 dark:border-sidebar-border">
                        <p className="text-center text-sm text-muted-foreground">
                            AI Content Evasion Growth
                        </p>
                        <div className="mt-4 h-40">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="#e5e7eb"
                                    />
                                    <XAxis
                                        dataKey="month"
                                        tick={{ fontSize: 10 }}
                                    />
                                    <YAxis tick={{ fontSize: 10 }} />
                                    <Tooltip />
                                    <Line
                                        type="linear"
                                        dataKey="value"
                                        stroke="#2563eb"
                                        strokeWidth={2}
                                        dot={{ r: 3 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

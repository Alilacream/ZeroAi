import { Head, usePage } from '@inertiajs/react';
import {
    Sparkles,
    BrainCircuit,
    Zap,
    ArrowUpRight,
    TrendingUp,
} from 'lucide-react';
import {
    AreaChart,
    Area,
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

            <div className="animate-in space-y-8 p-6 duration-700 fade-in lg:p-10">
                {/* Header Section */}
                <header className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                            Welcome back, {userName.split(' ')[0]}{' '}
                            <span className="animate-pulse">👋</span>
                        </h1>
                        <p className="mt-1 text-lg text-muted-foreground">
                            Here is a look at your AI productivity today.
                        </p>
                    </div>
                    <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-500">
                        <Sparkles size={18} />
                        New Analysis
                    </button>
                </header>

                {/* KPI Grid */}
                <div className="grid gap-6 md:grid-cols-3">
                    {/* Card 1: AI Usage */}
                    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-950">
                        <div className="flex items-center justify-between">
                            <div className="rounded-lg bg-blue-50 p-2 dark:bg-blue-900/20">
                                <BrainCircuit
                                    className="text-blue-600"
                                    size={24}
                                />
                            </div>
                            <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-600 dark:bg-emerald-900/20">
                                <ArrowUpRight size={14} /> +12%
                            </span>
                        </div>
                        <div className="mt-4">
                            <p className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
                                AI Usage
                            </p>
                            <div className="mt-1 flex items-baseline gap-2">
                                <h3 className="text-3xl font-bold tracking-tight italic">
                                    26%
                                </h3>
                                <span className="text-xs text-muted-foreground">
                                    of monthly limit
                                </span>
                            </div>
                            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                                <div
                                    className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all duration-1000 ease-out"
                                    style={{ width: '26%' }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Times Asked */}
                    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-950">
                        <div className="w-fit rounded-lg bg-amber-50 p-2 text-amber-600 dark:bg-amber-900/20">
                            <Zap size={24} />
                        </div>
                        <div className="mt-4">
                            <p className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
                                Total Queries
                            </p>
                            <h3 className="mt-1 text-3xl font-bold tracking-tight">
                                1,284
                            </h3>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Updated 2 mins ago
                            </p>
                        </div>
                    </div>

                    {/* Card 3: Growth Metric */}
                    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-950">
                        <div className="w-fit rounded-lg bg-indigo-50 p-2 text-indigo-600 dark:bg-indigo-900/20">
                            <TrendingUp size={24} />
                        </div>
                        <div className="mt-4">
                            <p className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
                                Growth Factor
                            </p>
                            <h3 className="mt-1 text-3xl font-bold tracking-tight">
                                70%
                            </h3>
                            <p className="mt-1 text-xs font-medium text-emerald-600">
                                On track for Q3 goals
                            </p>
                        </div>
                    </div>
                </div>

                {/* Chart Section */}
                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                AI Content Evasion Growth
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Monthly performance trajectory
                            </p>
                        </div>
                    </div>

                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient
                                        id="colorValue"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor="#2563eb"
                                            stopOpacity={0.3}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="#2563eb"
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    vertical={false}
                                    stroke="#e2e8f0"
                                />
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#64748b', fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#64748b', fontSize: 12 }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: '12px',
                                        border: 'none',
                                        boxShadow:
                                            '0 10px 15px -3px rgba(0,0,0,0.1)',
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#2563eb"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorValue)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

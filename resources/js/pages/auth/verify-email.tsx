import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { chat } from '@/routes';
import { resend } from '@/routes/verification';

interface Props {
    status?: string;
}

export default function VerifyEmail({ status }: Props) {
    const { post, processing } = useForm({});

    const resendVerification = () => {
        post(resend().url);
    };

    return (
        <AuthLayout
            title="Verify Email"
            description="Please verify your email address by clicking on the link we just emailed to you."
        >
            <Head title="Email Verification" />

            {status === 'verification-link-sent' && (
                <div className="mb-4 rounded-md bg-green-50 p-4 text-center text-sm text-green-600">
                    A new verification link has been sent to your email address.
                </div>
            )}

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    resendVerification();
                }}
                className="space-y-6 text-center"
            >
                <Button type="submit" disabled={processing} variant="secondary">
                    {processing && <Spinner />}
                    Resend Verification Email
                </Button>

                <div className="text-sm">
                    <Link
                        href={chat()}
                        method="post"
                        className="text-muted-foreground hover:text-primary"
                    >
                        Go to workspace
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
}

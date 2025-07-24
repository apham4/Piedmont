import { Head, Link, usePage } from '@inertiajs/react';
import appIcon from 'resources/assets/logo.png';

interface DefaultLayoutProps {
    title?: string;
    body?: React.ReactNode;
}

interface User {
    id: number;
    name: string;
}

export default function DefaultLayout({ title, body }: DefaultLayoutProps) {
    const { user = {} as User, appName } = usePage().props as { user?: User; appName?: string };
    return (
        <>
            <Head title={title}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <div className="flex items-center justify-between w-full">
                        <nav className="flex items-center gap-4">
                            <Link href={route('home')} className="flex items-center gap-2">
                                <img
                                    src={appIcon}
                                    alt="App Logo"
                                    className="h-10 w-10 object-contain cursor-pointer"
                                />
                                <span className="text-xl font-bold text-[#1b1b18] dark:text-[#EDEDEC] cursor-pointer">
                                    {appName}
                                </span>
                            </Link>
                        </nav>
                        <nav className="flex items-center gap-4">
                            <Link
                                href={route('user.show', { id: user.id })}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                {user.name || 'Unknown User'}
                            </Link>
                        </nav>
                    </div>
                </header>

                <div className="flex w-full justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-[335px] flex-col lg:max-w-4xl">
                        {body}
                    </main>
                </div>
            </div>
        </>
    );
}
import { Head, Link } from '@inertiajs/react';
import appIcon from 'resources/assets/placeholder_icon.png';

interface DefaultLayoutProps {
    title?: string;
    body?: React.ReactNode;
}

export default function DefaultLayout({ title, body }: DefaultLayoutProps) {
    return (
        <>
            <Head title={title}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-begin gap-4">
                        <Link href={route('home')}>
                            <img
                                src={appIcon}
                                alt="App Logo"
                                className="h-10 w-10 object-contain cursor-pointer"
                            />
                        </Link>
                    </nav>
                    <nav className="flex items-center justify-end gap-4">
                        <Link
                        href={route('dashboard')}
                        className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                        >
                            Profile
                        </Link>
                    </nav>
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
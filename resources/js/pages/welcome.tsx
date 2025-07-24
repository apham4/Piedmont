import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import appIcon from 'resources/assets/logo.png';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const { appName } = usePage().props as { appName?: string };

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center justify-center bg-[#FDFDFC] p-6 text-[#1b1b18] dark:bg-[#0a0a0a] relative">
                {/* Centered Content */}
                <main className="flex flex-col items-center justify-center flex-1 w-full">
                    <div className="flex items-center mb-4">
                        <img
                            src={appIcon}
                            alt="App Logo"
                            className="h-20 w-20 object-contain mr-4"
                        />
                        <span className="text-4xl font-bold text-[#1b1b18] dark:text-[#EDEDEC]">
                            {appName}
                        </span>
                    </div>
                    <div className="mb-6 text-lg text-gray-500 dark:text-gray-300 font-medium">
                        Tech Enthusiast Web Forum
                    </div>
                    <div className="flex gap-4">
                        <Link
                            href={route('login')}
                            className="rounded-sm border border-[#19140035] px-6 py-2 text-lg font-semibold leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b] transition"
                        >
                            Log in
                        </Link>
                        <Link
                            href={route('register')}
                            className="rounded-sm border border-[#19140035] px-6 py-2 text-lg font-semibold leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b] transition"
                        >
                            Register
                        </Link>
                    </div>
                </main>
                {/* Footer */}
                <footer className="absolute bottom-4 left-0 right-0 flex justify-center">
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                        CISC 593 - Group 1
                    </span>
                </footer>
            </div>
        </>
    );
}

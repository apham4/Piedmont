import { Head, Link, usePage, router } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
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
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        }
        if (menuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [menuOpen]);

    const handleLogout = () => {
        router.post(route('logout'), {}, {
            onSuccess: () => router.visit(route('welcome'))
        });
    };

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
                        <nav className="flex items-center gap-4 relative">
                            <button
                                onClick={() => setMenuOpen((open) => !open)}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                {user.name || 'Unknown User'}
                            </button>
                            {menuOpen && (
                                <div
                                    ref={menuRef}
                                    className="absolute right-0 mt-2 w-40 bg-white dark:bg-[#232323] border border-gray-200 dark:border-gray-700 rounded shadow-lg z-50"
                                >
                                    <Link
                                        href={route('user.show', { id: user.id })}
                                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                                    >
                                        Log Out
                                    </button>
                                </div>
                            )}
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
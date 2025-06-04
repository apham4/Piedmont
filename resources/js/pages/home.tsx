import { Head, Link, usePage } from '@inertiajs/react';

interface Category {
    name?: string;
    description?: string;
}

interface Post {
    user_id?: number;
    title?: string;
}

export default function Home() {
    const { category = {} } = usePage().props as { category?: Category };
    const { sub_categories = [] } = usePage().props as { sub_categories?: string[] };
    const { posts = [] } = usePage().props as { posts?: Post[] };
    
    return (
        <>
            <Head title="Home">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-begin gap-4">
                        App Name & Logo
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
                        <header className="flex flex-col w-full max-w-[335px] lg:max-w-4xl mb-6">
                            <h1 className="text-2xl font-bold">
                                {category ? category.name : <> Category Name </>}
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">
                                {category ? category.description : <> Category Description </>}
                            </p>
                        </header>
                        <button
                            className="self-start mb-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
                            onClick={() => window.location.href = route('posts.create')}
                        >
                            Create Discussion Post
                        </button>
                        { sub_categories.length > 0 ? (
                            <div className="flex flex-wrap gap-3 w-full">
                                {sub_categories.map((sub_category: string) => (
                                    <button
                                        key={sub_category}
                                        className="w-[calc(50%-0.375rem)] rounded border border-gray-300 px-3 py-2 text-left hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800"
                                        // Add onClick or navigation logic as needed
                                    >
                                        <span className="block text-lg font-medium">{sub_category}</span>
                                        <span className="block text-xs text-gray-500">Description</span>
                                    </button>
                                ))}
                            </div>
                        ):(
                            <div></div>
                        )}

                        <div className="h-8" /> {/* Spacer for layout */}
                        <h2 className="text-xl font-semibold mb-2">Discussion Threads</h2>
                        {posts.length == 0 ?
                            (
                                <div className="text-center text-gray-500">
                                    No discussion threads in this category. Be the first to start a conversation!
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3 w-full">
                                    {posts.map((post, idx) => (
                                        <button
                                            key={idx}
                                            className="w-full text-left rounded border border-gray-300 px-3 py-2 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800"
                                            // TODO: Add navigation to post detail
                                        >
                                            <div className="text-lg font-medium">{post.title}</div>
                                            <div className="text-xs text-gray-500">By: {post.user_id}</div>
                                        </button>   
                                    ))}
                                </div>
                            ) 
                        }
                    </main>
                </div>
            </div>
        </>
    );
}

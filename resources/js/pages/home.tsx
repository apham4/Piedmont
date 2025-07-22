import { usePage, router, Link } from '@inertiajs/react';
import DefaultLayout from '@/components/custom/default-layout';
import PostEntry from '@/components/custom/post-entry';

interface Category {
    id: number;
    name?: string;
    description?: string;
}

interface Post {
    id: number;
    user_id?: number;
    title?: string;
}

interface User {
    id: number;
    name?: string;
}

export default function Home() {
    const { category = {} } = usePage().props as { category?: Category };
    const { sub_categories = [] } = usePage().props as { sub_categories?: Category[] };
    const { breadcrumbs = [] } = usePage().props as { breadcrumbs?: Category[] };
    const { posts = [] } = usePage().props as { posts?: Post[] };
    const { users = [] } = usePage().props as { users?: User[] };
    
    return (
        <DefaultLayout
            title = "Home"
            body = {
                <div>
                    <header className="flex flex-col w-full max-w-[335px] lg:max-w-4xl mb-6">
                        {breadcrumbs.length > 0 && (
                            <nav className="mb-2 text-sm text-gray-500 flex flex-wrap gap-1 items-center">
                                <span className="flex items-center">
                                    <Link
                                        href={route('home')}
                                        className="hover:underline text-blue-700"
                                    >
                                        Home
                                    </Link>
                                    {breadcrumbs.length > 0 && <span className="mx-1">/</span>}
                                </span>
                                {breadcrumbs.map((crumb, idx) => (
                                    <span key={crumb.id} className="flex items-center">
                                        <Link
                                            href={route('home.category', { id: crumb.id })}
                                            className="hover:underline text-blue-700"
                                        >
                                            {crumb.name}
                                        </Link>
                                        {idx < breadcrumbs.length - 1 && <span className="mx-1">/</span>}
                                    </span>
                                ))}
                            </nav>
                        )}
                        <h1 className="text-2xl font-bold">
                            {category ? category.name : "Categories"}
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            {category ? category.description : null}
                        </p>
                    </header>
                    { sub_categories.length > 0 ? (
                        <div className="flex flex-wrap gap-3 w-full">
                            {sub_categories.map((sub_category: Category) => (
                                <button
                                    key={sub_category.name}
                                    className="w-[calc(50%-0.375rem)] rounded border border-gray-300 px-3 py-2 text-left hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800"
                                    onClick={() => router.visit(route('home.category', { id: sub_category.id }))}
                                >
                                    <span className="block text-lg font-medium">{sub_category.name}</span>
                                    <span className="block text-xs text-gray-500">Description</span>
                                </button>
                            ))}
                        </div>
                    ):(
                        <div className="text-center text-gray-500">
                            No sub-categories for {category?.name || "this category"}.
                        </div>
                    )}
        
                    <div className="h-8" /> {/* Spacer for layout */}

                    <h2 className="text-xl font-semibold mb-2">Discussion Threads</h2>
                    <button
                        className="self-start mb-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
                        onClick={() => window.location.href = route('post.create')}
                    >
                        Create Discussion Post
                    </button>
                    {posts.length == 0 ?
                    (
                        <div className="text-center text-gray-500">
                            No discussion threads in this category. Be the first to start a conversation!
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3 w-full">
                            {posts.map((post) => {
                                const user = users.find(u => u.id === post.user_id);
                                return (
                                    <PostEntry
                                        post={post}
                                        user={user}
                                    />
                                );
                            })}
                        </div>
                    )}
                </div>
            }
        />
    );
}

import { router} from '@inertiajs/react';

interface Post {
    id: number;
    user_id?: number;
    title?: string;
}

interface User {
    id: number;
    name?: string;
}

interface PostEntryProps {
    post?: Post;
    user?: User;
}

export default function PostEntry({ post, user }: PostEntryProps) {
    if (!post) return <></>;

    return (
        <>
            <button
                key={post.id}
                className="w-full text-left rounded border border-gray-300 px-3 py-2 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800"
                onClick={() => router.visit(route('post.show', { id: post.id }))}
            >
                <div className="text-lg font-medium">{post.title}</div>
                <div className="text-xs text-gray-500">
                    By: {user?.id ? (
                        <a
                            href={route('user.show', { id: user.id })}
                            className="text-blue-600 hover:underline"
                            onClick={e => e.stopPropagation()}
                        >
                            {user.name}
                        </a>
                    ) : (
                        'Unknown User'
                    )}
                </div>
            </button>
        </>
    );
}
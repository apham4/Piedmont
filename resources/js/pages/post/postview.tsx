import { usePage } from '@inertiajs/react';
import DefaultLayout from '@/components/custom/default-layout';

interface User {
    id: number;
    name: string;
}

interface Post {
    id: number;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
    poster: User;
    reactions?: Reaction[];
    comments?: Comment[];
}

interface Comment {
    id: number;
    user: User;
    content: string;
    updated_at: string;
}

interface Reaction {
    id: number;
    content_id: number;
    content_type: number;
    reaction_type: number; // 1 = like, 2 = dislike
}

export default function Home() {
    const { post = {} as Post } = usePage().props as { post?: Post };
    
    return (
        <DefaultLayout
            title = {post ? post.title : "View Post"}
            body = {
                <div className="w-full">
                    {/* Post Title */}
                    <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
                    
                    {/* Poster Name */}
                    <div className="text-sm text-gray-600 mb-1">
                        {post.poster.name || "Unknown User"}
                    </div>
                    
                    {/* Created/Edited Time */}
                    <div className="text-xs text-gray-400 mb-4">
                        {post.created_at
                            ? post.updated_at && post.updated_at !== post.created_at
                                ? `Edited: ${new Date(post.updated_at).toLocaleString()}`
                                : `Posted: ${new Date(post.created_at).toLocaleString()}`
                            : ""}
                    </div>
                    
                    {/* Post Content */}
                    <p className="mb-6">{post.content}</p>
                    
                    {/* Like/Dislike Buttons */}
                    <div className="flex items-center gap-4 mb-6">
                        <button
                            className="flex items-center px-3 py-1 bg-blue-100 rounded hover:bg-blue-200"
                            onClick={() => { /* placeholder like */ }}
                        >
                            👍 <span className="ml-1">
                                    {post.reactions ? post.reactions.filter(r => r.reaction_type === 1).length : 0}
                                </span>
                        </button>
                        <button
                            className="flex items-center px-3 py-1 bg-red-100 rounded hover:bg-red-200"
                            onClick={() => { /* placeholder dislike */ }}
                        >
                            👎 <span className="ml-1">
                                    {post.reactions ? post.reactions.filter(r => r.reaction_type === 2).length : 0}
                                </span>
                        </button>
                    </div>
                    
                    {/* Add Comment Form */}
                    <form
                        className="mb-8 flex gap-2"
                        onSubmit={e => {
                            e.preventDefault();
                            // placeholder submit
                        }}
                    >
                        <input
                            type="text"
                            className="flex-1 border rounded px-2 py-1"
                            placeholder="Add a comment..."
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-1 rounded"
                        >
                            Submit
                        </button>
                    </form>
                    
                    {/* Comments */}
                    <div>
                        {post.comments && post.comments.length > 0 ? (
                            post.comments.map((comment: any) => (
                                <div
                                    key={comment.id}
                                    className="border rounded p-3 mb-4 bg-gray-50"
                                >
                                    <div className="font-semibold text-sm">{comment.user?.name || "Unknown User"}</div>
                                    <div className="text-xs text-gray-400 mb-1">
                                        {comment.updated_at
                                            ? new Date(comment.updated_at).toLocaleString()
                                            : ""}
                                    </div>
                                    <div>{comment.content}</div>
                                </div>
                            ))
                        ) : (
                            <div className="text-gray-500">No Comments</div>
                        )}
                    </div>
                </div>
            }
        />
    );
}

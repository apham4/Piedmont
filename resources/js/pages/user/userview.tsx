import { usePage } from '@inertiajs/react';
import DefaultLayout from '@/components/custom/default-layout';
import PostEntry from '@/components/custom/post-entry';

interface User {
    id: number;
    name: string;
    dob?: string;
    is_dob_public?: boolean;
    location?: string;
    is_location_public?: boolean;
    bio?: string;
    is_bio_public?: boolean;
}

interface Reaction {
    reaction_type: number; // 1 = like, 2 = dislike
    content_id: number;
    content_type: number; // 1 = post, 2 = comment
}

interface Post {
    id: number;
    user_id: number;
}

interface Comment {
    id: number;
    user_id: number;
}

export default function UserView() {
    const { user, posts = [], comments = [], reactions = [], auth } = usePage().props as {
        user: User;
        posts?: Post[];
        comments?: Comment[];
        reactions?: Reaction[];
        auth?: { user?: User };
    };

    // Get all content IDs (posts and comments) owned by this user
    const userContentIds = [
        ...posts.filter(p => p.user_id === user.id).map(p => p.id),
        ...comments.filter(c => c.user_id === user.id).map(c => c.id),
    ];

    // Calculate points
    const a = reactions.filter(
        r => r.reaction_type === 1 && userContentIds.includes(r.content_id)
    ).length;
    const b = reactions.filter(
        r => r.reaction_type === 2 && userContentIds.includes(r.content_id)
    ).length;
    const userPoints = a - b;

    // Is this the authenticated user?
    const isSelf = auth?.user?.id === user.id;

    return (
        <DefaultLayout
            title = {user ? user.name + "'s Page" : "View User"}
            body = {
                <div className="w-full">
                    <div className="flex items-center mb-6">
                        <h1 className="text-3xl font-bold">{user.name}</h1>
                        {isSelf && (
                            <button
                                className="ml-4 px-4 py-2 rounded bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
                                aria-label="Edit Profile"
                                onClick={() => window.location.href = route('user.edit', user.id)}
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>
                    <div className="space-y-3">
                        <div>
                            <span className="font-semibold">User Points:</span>{' '}
                            {userPoints}
                        </div>
                        <div>
                            <span className="font-semibold">Date of Birth:</span>{' '}
                            {user.is_dob_public
                                ? user.dob || <span className="italic text-gray-500">Not set</span>
                                : <span className="italic text-gray-500">Private</span>}
                        </div>
                        <div>
                            <span className="font-semibold">Location:</span>{' '}
                            {user.is_location_public
                                ? user.location || <span className="italic text-gray-500">Not set</span>
                                : <span className="italic text-gray-500">Private</span>}
                        </div>
                        <div>
                            <span className="font-semibold">Bio:</span>{' '}
                            {user.is_bio_public
                                ? user.bio || <span className="italic text-gray-500">Not set</span>
                                : <span className="italic text-gray-500">Private</span>}
                        </div>
                    </div>
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-2">Posts by {user ? user.name : 'this user'}</h2>
                        <div className="space-y-4">
                            {posts.map(post => (
                                <PostEntry 
                                    post={post}
                                    user={user} />
                            ))}
                        </div>
                    </div>
                </div>
            }
        />
    );
}
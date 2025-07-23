import { usePage, useForm } from '@inertiajs/react';
import DefaultLayout from '@/components/custom/default-layout';

interface Post {
    id: number;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
}

export default function PostForm() {
    const { categorySuggestions = [], post, postCategory } = usePage().props as { 
        categorySuggestions?: string[]; 
        post?: Post;  
        postCategory?: string;
    };

    // Initialize form data with post details if available
    const { data, setData, post: submit, processing, errors } = useForm({
        title: post?.title || '',
        category: postCategory || '',
        content: post?.content || '',
    });

    const handle_submit = (e: React.FormEvent) => {
        e.preventDefault();
        // if post is undefined then route to post.store, otherwise route to post.update
        if (!post) {
            submit(route('post.store'));
        } else {
            submit(route('post.update', { id: post.id }));
        }
    };

    return (
        <DefaultLayout
            title="New Post"
            body={
                <>
                    <h1 className="text-2xl font-bold">
                        {post ? 'Edit the Discussion Post' : 'Submit a Discussion Thread'}
                    </h1>
                    <form className="space-y-4 w-full"
                        onSubmit={handle_submit}>
                        <div>
                            <label htmlFor="title" className="block font-medium mb-1">
                                Title<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                required
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                className="w-full border rounded px-3 py-2"
                            />
                            {errors.title && <div className="text-red-500 text-sm">{errors.title}</div>}
                        </div>
                        <div>
                            <label htmlFor="category" className="block font-medium mb-1">
                                Category<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="category"
                                name="category"
                                required
                                value={data.category}
                                onChange={e => setData('category', e.target.value)}
                                className="w-full border rounded px-3 py-2"
                                list="category-suggestions"
                            />
                            <datalist id="category-suggestions">
                                {categorySuggestions?.map((path: string) => (
                                    <option key={path} value={path} />
                                ))}
                            </datalist>
                            {errors.category && <div className="text-red-500 text-sm">{errors.category}</div>}
                        </div>
                        <div>
                            <label htmlFor="content" className="block font-medium mb-1">
                                Content<span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="content"
                                name="content"
                                required
                                rows={6}
                                value={data.content}
                                onChange={e => setData('content', e.target.value)}
                                className="w-full border rounded px-3 py-2"
                            />
                            {errors.content && <div className="text-red-500 text-sm">{errors.content}</div>}
                        </div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Submit
                        </button>
                    </form>
                </>
            }
        />
    );
}

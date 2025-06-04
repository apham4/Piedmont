import { usePage } from '@inertiajs/react';
import DefaultLayout from '@/components/custom/default-layout';

interface Post {
    user_id?: number;
    title?: string;
}

export default function Home() {
    const { post = {} } = usePage().props as { post?: Post };
    
    return (
        <DefaultLayout
            title = "New Post"
            body = {
                <div>
                    
                </div>
            }
        />
    );
}

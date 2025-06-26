import { usePage } from '@inertiajs/react';
import DefaultLayout from '@/components/custom/default-layout';

interface User {
    id: number;
    name: string;
}

export default function User() {
    const { user = {} as User } = usePage().props as { user?: User };
    
    return (
        <DefaultLayout
            title = {user ? user.name + "\'s Page" : "View Post"}
            body = {
                <div>{user.name || 'Unknown User'}</div>
            }
        />
    );
}

import { useForm, usePage } from '@inertiajs/react';
import DefaultLayout from '@/components/custom/default-layout';

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

export default function UserEdit() {
    const { user } = usePage().props as { user: User };
    const { data, setData, post, processing, errors } = useForm({
        name: user.name || '',
        dob: user.dob || '',
        is_dob_public: user.is_dob_public || false,
        location: user.location || '',
        is_location_public: user.is_location_public || false,
        bio: user.bio || '',
        is_bio_public: user.is_bio_public || false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('user.update', { id: user.id }));
    };

    return (
        <DefaultLayout
            title = {user ? "Edit Profile for" + user.name : "Edit Profile"}
            body={
                <form className="w-full space-y-4" onSubmit={handleSubmit}>
                    <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
                    <div>
                        <label className="block font-medium mb-1">Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        />
                        {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Date of Birth</label>
                        <input
                            type="date"
                            value={data.dob}
                            onChange={e => setData('dob', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        />
                        {errors.dob && <div className="text-red-500 text-sm">{errors.dob}</div>}
                        <label className="inline-flex items-center mt-2">
                            <input
                                type="checkbox"
                                checked={data.is_dob_public}
                                onChange={e => setData('is_dob_public', e.target.checked)}
                                className="mr-2"
                            />
                                Make Date of Birth public
                        </label>
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Location</label>
                        <input
                            type="text"
                            value={data.location}
                            onChange={e => setData('location', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        />
                        {errors.location && <div className="text-red-500 text-sm">{errors.location}</div>}
                        <label className="inline-flex items-center mt-2">
                            <input
                                type="checkbox"
                                checked={data.is_location_public}
                                onChange={e => setData('is_location_public', e.target.checked)}
                                className="mr-2"
                            />
                                Make Location public
                        </label>
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Bio</label>
                        <textarea
                            value={data.bio}
                            onChange={e => setData('bio', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        />
                        {errors.bio && <div className="text-red-500 text-sm">{errors.bio}</div>}
                        <label className="inline-flex items-center mt-2">
                            <input
                                type="checkbox"
                                checked={data.is_bio_public}
                                onChange={e => setData('is_bio_public', e.target.checked)}
                                className="mr-2"
                            />
                                Make Bio public
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        disabled={processing}
                    >
                        Save Changes
                    </button>
                </form>
            }
        />
    );
}
import type { PostType } from '@/types/post-type';
import axiosInstance from '@/lib/axios-instance';

const getPosts = async (accessToken: string): Promise<PostType[]> => {
    const response = await axiosInstance.get('/users/7567035/posts', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    return response.data;
};

export { getPosts };
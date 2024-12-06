import type { PostsQueryType } from '@/types/post-type';
import axiosInstance from '@/lib/axios-instance';

const getPosts = async (accessToken: string, page: number): Promise<PostsQueryType> => {
    const response = await axiosInstance.get(`/users/7567035/posts?page=${page}&per_page=10`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    return {
        data: response.data,
        headers: response.headers
    };
};

export { getPosts };
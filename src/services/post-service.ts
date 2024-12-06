import type { AddPostMutationType, PostsQueryType, PostType } from '@/types/post-type';
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

const getPost = async (accessToken: string, id: number): Promise<PostType> => {
    const response = await axiosInstance.get(`/posts/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    return response.data;
};

const addPost = async (accessToken: string, post: AddPostMutationType) => {
    const response = await axiosInstance.post('/users/7567035/posts', post, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    return response.data;
};

export { getPosts, getPost, addPost };
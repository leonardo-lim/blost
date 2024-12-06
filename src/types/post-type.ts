import type { AxiosHeaderValue } from 'axios';

interface PostType {
    id: number;
    user_id: number;
    title: string;
    body: string;
}

interface PostsQueryType {
    data: PostType[];
    headers: Record<string, AxiosHeaderValue | undefined>;
}

interface AddPostMutationType {
    title: string;
    body: string;
}

interface UpdatePostMutationType {
    title: string;
    body: string;
}

export type { PostType, PostsQueryType, AddPostMutationType, UpdatePostMutationType };
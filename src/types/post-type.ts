import type { AxiosHeaderValue } from 'axios';

interface PostType {
    id: string;
    user_id: string;
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

export type { PostType, PostsQueryType, AddPostMutationType };
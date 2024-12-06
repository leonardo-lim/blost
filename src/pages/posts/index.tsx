import type { NextPage } from 'next';
import type { PostType } from '@/types/post-type';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Alert, Col, Flex, Row, Typography } from 'antd';
import { getPosts } from '@/services/post-service';
import SearchInput from '@/components/post/SearchInput';
import PostCard from '@/components/post/PostCard';

const Posts: NextPage = () => {
    const accessToken = '';

    const { data: posts, isLoading, isError } = useQuery<PostType[]>({
        queryKey: ['posts', accessToken],
        queryFn: () => getPosts(accessToken)
    });

    const [filteredPosts, setFilteredPosts] = useState<PostType[]>([]);

    useEffect(() => {
        if (posts) {
            setFilteredPosts(posts);
        }
    }, [posts]);

    return (
        <>
            <Head>
                <title>Blost | Posts</title>
            </Head>

            <Flex className="pt-24 px-10 md:px-20">
                {isLoading && (
                    <Typography.Title level={5}>Getting posts...</Typography.Title>
                )}
                {isError && (
                    <Alert
                        message="Failed to get posts"
                        type="error"
                        showIcon
                        className="w-full"
                    />
                )}
                {posts && (
                    <Flex vertical className="w-full gap-6">
                        <SearchInput posts={posts} setFilteredPosts={setFilteredPosts} />
                        <Row gutter={[20, 20]}>
                            {filteredPosts.map((post, idx) => {
                                return (
                                    <Col key={idx} xs={24} md={12} xl={8}>
                                        <PostCard post={post} />
                                    </Col>
                                );
                            })}
                        </Row>
                    </Flex>
                )}
            </Flex>
        </>
    );
};

export default Posts;
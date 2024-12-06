import type { NextPage } from 'next';
import type { PostsQueryType, PostType } from '@/types/post-type';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Alert, Col, Flex, Pagination, Row, Typography } from 'antd';
import { getPosts } from '@/services/post-service';
import { getAccessToken } from '@/utils/auth';
import SearchInput from '@/components/post/SearchInput';
import PostCard from '@/components/post/PostCard';

const Posts: NextPage = () => {
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [postsTotal, setPostsTotal] = useState(0);

    const { data: posts, isLoading, isError } = useQuery<PostsQueryType>({
        queryKey: ['posts', currentPageNumber],
        queryFn: () => getPosts(getAccessToken(), currentPageNumber)
    });

    const [filteredPosts, setFilteredPosts] = useState<PostType[]>([]);

    const handleChangePageNumber = (page: number) => {
        setCurrentPageNumber(page);
    };

    useEffect(() => {
        if (posts) {
            setFilteredPosts(posts.data);

            const paginationTotal = posts.headers['x-pagination-total'];

            if (paginationTotal) {
                const total = parseInt(paginationTotal.toString());
                setPostsTotal(total);
            }
        }
    }, [posts]);

    return (
        <>
            <Head>
                <title>Blost | Posts</title>
            </Head>

            <Flex vertical className="gap-8 px-10 md:px-20 py-24">
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
                    <>
                        <Flex vertical className="w-full gap-6">
                            {posts.data.length > 0 && (
                                <SearchInput
                                    posts={posts.data}
                                    setFilteredPosts={setFilteredPosts}
                                />
                            )}
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
                        <Flex justify="center">
                            <Pagination
                                current={currentPageNumber}
                                pageSize={10}
                                total={postsTotal}
                                onChange={handleChangePageNumber}
                            />
                        </Flex>
                    </>
                )}
            </Flex>
        </>
    );
};

export default Posts;
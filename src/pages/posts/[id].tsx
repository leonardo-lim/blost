import type { NextPage } from 'next';
import type { PostType } from '@/types/post-type';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { Alert, Button, Card, Divider, Flex, Tag, Typography } from 'antd';
import { FaArrowLeft, FaStickyNote } from 'react-icons/fa';
import { getPost } from '@/services/post-service';
import { getUser } from '@/services/user-service';
import { getAccessToken } from '@/utils/auth';

const PostDetails: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const { data: post, isLoading: isPostLoading, isError: isPostError } = useQuery<PostType>({
        queryKey: ['post'],
        queryFn: () => getPost(getAccessToken(), id ? parseInt(id.toString()) : 0)
    });

    const { data: user, isLoading: isUserLoading, isError: isUserError } = useQuery({
        queryKey: ['user'],
        queryFn: () => getUser(getAccessToken())
    });

    return (
        <>
            <Head>
                <title>Blost | Post Details</title>
            </Head>

            <Flex vertical className="px-10 md:px-20 py-24">
                {(isPostLoading || isUserLoading) && (
                    <Typography.Title level={5}>Getting post details...</Typography.Title>
                )}
                {(isPostError || isUserError) && (
                    <Alert
                        message="Failed to get post details"
                        type="error"
                        showIcon
                        className="w-full"
                    />
                )}
                {(post && user) && (
                    <Card
                        bordered={false}
                        className="w-full md:w-2/3 2xl:w-2/4 !m-auto !rounded-xl"
                    >
                        <FaStickyNote size={256} className="mb-4 opacity-10" />
                        <Flex className="mb-2">
                            <Tag color="default">Authored by {user.name}</Tag>
                        </Flex>
                        <Typography.Title level={1}>{post.title}</Typography.Title>
                        <Divider className="!my-4" />
                        <Typography.Text className="-mt-3 text-base">{post.body}</Typography.Text>
                        <Link href="/posts">
                            <Button
                                color="default"
                                variant="solid"
                                size="large"
                                icon={<FaArrowLeft />}
                                block
                                className="mt-6"
                            >
                                Back
                            </Button>
                        </Link>
                    </Card>
                )}
            </Flex>
        </>
    );
};

export default PostDetails;
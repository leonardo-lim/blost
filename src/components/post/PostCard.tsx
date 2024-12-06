import type { PostType } from '@/types/post-type';
import { Button, Card, Flex, Typography } from 'antd';
import { FaEye, FaStickyNote } from 'react-icons/fa';

interface PostCardProps {
    post: PostType;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
    return (
        <Card bordered={false} className="!rounded-xl">
            <Flex vertical>
                <FaStickyNote size={128} className="mb-4 opacity-10" />
                <Typography.Title
                    level={2}
                    className="text-ellipsis whitespace-nowrap overflow-hidden"
                >
                    {post.title}
                </Typography.Title>
                <Typography.Text
                    className="-mt-3 text-ellipsis whitespace-nowrap overflow-hidden"
                >
                    {post.body}
                </Typography.Text>
                <Button
                    color="default"
                    variant="solid"
                    size="large"
                    icon={<FaEye />}
                    block
                    className="mt-4"
                >
                    See Details
                </Button>
            </Flex>
        </Card>
    );
};

export default PostCard;
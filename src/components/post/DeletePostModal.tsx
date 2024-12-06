import type { PostType } from '@/types/post-type';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Alert, Button, Modal, Typography } from 'antd';
import { FaTrash } from 'react-icons/fa';
import { deletePost } from '@/services/post-service';
import { getAccessToken } from '@/utils/auth';

interface DeletePostModalProps {
    post: PostType;
}

const DeletePostModal: React.FC<DeletePostModalProps> = ({ post }) => {
    const [open, setOpen] = useState(false);

    const router = useRouter();

    const { mutate, isPending, isError } = useMutation({
        mutationFn: () => deletePost(getAccessToken(), post.id),
        onSuccess: () => {
            setOpen(false);
            router.push('/posts');
        }
    });

    const removePost = () => {
        mutate();
    };

    return (
        <>
            <Button
                color="default"
                variant="solid"
                icon={<FaTrash />}
                onClick={() => setOpen(true)}
            />
            <Modal
                title="Delete Post"
                open={open}
                centered
                closable={false}
                maskClosable={false}
                okButtonProps={{
                    color: 'default',
                    variant: 'solid',
                    size: 'large'
                }}
                cancelButtonProps={{
                    color: 'default',
                    variant: 'filled',
                    size: 'large'
                }}
                okText="Delete"
                confirmLoading={isPending}
                onOk={removePost}
                onCancel={() => setOpen(false)}
            >
                {isError && (
                    <Alert
                        message="Failed to delete post"
                        type="error"
                        showIcon
                        className="mt-4 mb-2"
                    />
                )}
                <Typography.Text className="!text-base">
                    Are you sure want to delete this post?
                </Typography.Text>
            </Modal>
        </>
    );
};

export default DeletePostModal;
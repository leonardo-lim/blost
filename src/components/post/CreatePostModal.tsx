import type { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import type { FormProps } from 'antd';
import type { PostsQueryType } from '@/types/post-type';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Alert, Button, Form, Input, Modal } from 'antd';
import { FaPlus } from 'react-icons/fa';
import { addPost } from '@/services/post-service';
import { getAccessToken } from '@/utils/auth';

interface CreatePostFormType {
    title: string;
    body: string;
}

interface CreatePostModalProps {
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<PostsQueryType, Error>>;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ refetch }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [open, setOpen] = useState(false);

    const { mutate, isPending, isError } = useMutation({
        mutationFn: () => addPost(getAccessToken(), { title, body }),
        onSuccess: () => {
            refetch();
            setOpen(false);
        }
    });

    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleChangeBody = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBody(e.target.value);
    };

    const createPost: FormProps<CreatePostFormType>['onFinish'] = async () => {
        mutate();
    };

    return (
        <>
            <Button
                color="default"
                variant="solid"
                size="large"
                icon={<FaPlus />}
                onClick={() => setOpen(true)}
            >
                Create Post
            </Button>
            <Modal
                title="Create Post"
                open={open}
                centered
                footer={null}
                onCancel={() => setOpen(false)}
            >
                {isError && (
                    <Alert
                        message="Failed to create post"
                        type="error"
                        showIcon
                        className="mt-4 mb-2"
                    />
                )}
                <Form
                    name="addPost"
                    layout="vertical"
                    colon={false}
                    requiredMark={false}
                    onFinish={createPost}
                    autoComplete="off"
                    className="mt-4"
                >
                    <Form.Item<CreatePostFormType>
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: 'Title is required' }]}
                    >
                        <Input
                            value={title}
                            onChange={handleChangeTitle}
                            placeholder="Enter your title"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item<CreatePostFormType>
                        label="Body"
                        name="body"
                        rules={[{ required: true, message: 'Body is required' }]}
                    >
                        <Input.TextArea
                            value={body}
                            onChange={handleChangeBody}
                            placeholder="Enter your body"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item label={null}>
                        <Button
                            htmlType="submit"
                            color="default"
                            variant="solid"
                            size="large"
                            icon={<FaPlus />}
                            loading={isPending}
                            block
                            className="mt-2"
                        >
                            Create
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default CreatePostModal;
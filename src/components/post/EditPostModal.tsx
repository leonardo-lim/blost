import type { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import type { FormProps } from 'antd';
import type { PostType } from '@/types/post-type';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Alert, Button, Form, Input, Modal } from 'antd';
import { FaArrowUp, FaEdit } from 'react-icons/fa';
import { updatePost } from '@/services/post-service';
import { getAccessToken } from '@/utils/auth';

interface EditPostFormType {
    title: string;
    body: string;
}

interface EditPostModalProps {
    post: PostType;
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<PostType, Error>>;
}

const EditPostModal: React.FC<EditPostModalProps> = ({ post, refetch }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [open, setOpen] = useState(false);

    const [form] = Form.useForm();

    const { mutate, isPending, isError } = useMutation({
        mutationFn: () => updatePost(getAccessToken(), post.id, { title, body }),
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

    const editPost: FormProps<EditPostFormType>['onFinish'] = async () => {
        mutate();
    };

    useEffect(() => {
        form.setFieldsValue({
            title: post.title,
            body: post.body
        });
    }, [form, post]);

    return (
        <>
            <Button
                color="default"
                variant="solid"
                icon={<FaEdit />}
                onClick={() => setOpen(true)}
            />
            <Modal
                title="Edit Post"
                open={open}
                centered
                footer={null}
                onCancel={() => setOpen(false)}
            >
                {isError && (
                    <Alert
                        message="Failed to update post"
                        type="error"
                        showIcon
                        className="mt-4 mb-2"
                    />
                )}
                <Form
                    form={form}
                    name="editPost"
                    layout="vertical"
                    colon={false}
                    requiredMark={false}
                    onFinish={editPost}
                    autoComplete="off"
                    className="mt-4"
                >
                    <Form.Item<EditPostFormType>
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

                    <Form.Item<EditPostFormType>
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
                            icon={<FaArrowUp />}
                            loading={isPending}
                            block
                            className="mt-2"
                        >
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default EditPostModal;
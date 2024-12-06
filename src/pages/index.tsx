import type { NextPage } from 'next';
import type { FormProps } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Alert, Button, Card, Divider, Flex, Form, Input, Typography } from 'antd';
import { FaArrowRight } from 'react-icons/fa';
import { getUser } from '@/services/user-service';
import { getAccessToken, saveAccessToken } from '@/utils/auth';

interface LoginFormType {
    name: string;
    accessToken: string;
}

const Home: NextPage = () => {
    const [name, setName] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [isAuthenticating, setIsAuthenticating] = useState(true);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [isFailed, setIsFailed] = useState(false);

    const router = useRouter();

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleChangeAccessToken = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAccessToken(e.target.value);
    };

    const login: FormProps<LoginFormType>['onFinish'] = async () => {
        setIsLoggingIn(true);

        try {
            saveAccessToken(accessToken);
            await getUser(accessToken);
            setIsLoggingIn(false);
            router.push('/posts');
        } catch (error) {
            setIsFailed(true);
            setIsLoggingIn(false);
        }
    };

    const checkIsAuthenticated = async () => {
        try {
            await getUser(getAccessToken());
            router.push('/posts');
        } catch (error) {
            console.error(error);
            setIsAuthenticating(false);
        }
    };

    useEffect(() => {
        checkIsAuthenticated();
    }, []);

    return (
        <>
            <Head>
                <title>Blost</title>
            </Head>

            <Flex justify="center" align="center" className="h-screen">
                {isAuthenticating ? (
                    <Typography.Title level={5}>Loading...</Typography.Title>
                ) : (
                    <Card
                        bordered={false}
                        className="w-full sm:w-[500px] !mx-10 !md:mx-20 !rounded-xl"
                    >
                        <Flex vertical>
                            <Typography.Title level={2}>
                                Welcome to Blost!
                            </Typography.Title>
                            <Typography.Text type="secondary" className="-mt-3">
                                Where you share your blog posts.
                            </Typography.Text>
                        </Flex>
                        <Divider className="!my-4" />
                        {isFailed && (
                            <Alert
                                message="Invalid access token"
                                type="error"
                                showIcon
                                className="mb-2"
                            />
                        )}
                        <Form
                            name="login"
                            layout="vertical"
                            colon={false}
                            requiredMark={false}
                            onFinish={login}
                            autoComplete="off"
                        >
                            <Form.Item<LoginFormType>
                                label="Name"
                                name="name"
                                rules={[{ required: true, message: 'Name is required' }]}
                            >
                                <Input
                                    value={name}
                                    onChange={handleChangeName}
                                    placeholder="Enter your name"
                                    size="large"
                                />
                            </Form.Item>

                            <Form.Item<LoginFormType>
                                label="Access Token"
                                name="accessToken"
                                rules={[{ required: true, message: 'Access token is required' }]}
                            >
                                <Input
                                    value={name}
                                    onChange={handleChangeAccessToken}
                                    placeholder="Enter your access token"
                                    size="large"
                                />
                            </Form.Item>

                            <Form.Item label={null}>
                                <Button
                                    htmlType="submit"
                                    color="default"
                                    variant="solid"
                                    size="large"
                                    icon={<FaArrowRight />}
                                    loading={isLoggingIn}
                                    block
                                    className="mt-2"
                                >
                                    Login
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                )}
            </Flex>
        </>
    );
};

export default Home;
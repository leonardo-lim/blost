import axiosInstance from '@/lib/axios-instance';

const getUser = async (accessToken: string) => {
    const response = await axiosInstance.get('/users/7567035', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    return response.data;
};

export { getUser };
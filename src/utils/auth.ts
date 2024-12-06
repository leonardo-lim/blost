const getAccessToken = () => {
    const accessToken = localStorage.getItem('access-token') ?? '';
    return accessToken;
};

const saveAccessToken = (accessToken: string) => {
    localStorage.setItem('access-token', accessToken);
};

export { getAccessToken, saveAccessToken };
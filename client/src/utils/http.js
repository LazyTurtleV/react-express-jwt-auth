export const getDefaultFetchConfig = (accessToken) => ({
    headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken && `Bearer ${accessToken}`
    },
    credentials: 'include',
})

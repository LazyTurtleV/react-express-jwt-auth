export const getDefaultFetchConfig = (accessToken) => ({
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
    },
    credentials: 'include',
})

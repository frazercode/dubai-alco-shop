import request from "./request"

const getAuth = async () => {
    return await request({
        method: 'get',
        path: 'auth',
    })
}

const postAuth = async ({username,password}) => {
    return await request({
        method: 'post',
        path: 'auth',
        body: {username, password},
        type: 'application/json'
    })
}

const deleteAuth = async () => {
    return await request({
        method: 'delete',
        path: 'auth'
    })
}

export {
    getAuth,
    postAuth,
    deleteAuth
}
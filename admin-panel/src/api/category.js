import request from "./request"

const getCategories = async () => {
    return await request({
        method: 'get',
        path: 'category',
    })
}

const postCategory = async (formData) => {
    return await request({
        method: 'post',
        path: 'category',
        body: formData,
        type: 'multipart/form-data'
    })
}

const patchCategory = async (formData) => {
    return await request({
        method: 'patch',
        path: 'category',
        body: formData,
        type: 'multipart/form-data'
    })
}

const deleteCategory = async (_id) => {
    return await request({
        method: 'delete',
        path: 'category',
        type: 'application/json',
        params: {
            _id
        }
    })
}

export {
    getCategories,
    postCategory,
    patchCategory,
    deleteCategory
}
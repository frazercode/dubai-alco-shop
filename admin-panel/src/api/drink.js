import request from "./request"

const getDrinks = async (category) => {
    return await request({
        method: 'get',
        path: 'drink',
        params: {
            category
        }
    })
}

const postDrink = async (formData) => {
    return await request({
        method: 'post',
        path: 'drink',
        body: formData,
        type: 'multipart/form-data'
    })
}

const patchDrink = async (formData) => {
    return await request({
        method: 'patch',
        path: 'drink',
        body: formData,
        type: 'multipart/form-data'
    })
}

const deleteDrink = async (_id) => {
    return await request({
        method: 'delete',
        path: 'drink',
        type: 'application/json',
        params: {
            _id
        }
    })
}

export {
    getDrinks,
    postDrink,
    patchDrink,
    deleteDrink
}
import axios from "axios";

const request = async ({method, path, params, body, type}) => {
    try{
        let {data} = await axios({
            method,
            baseURL: window.location.origin.replace(":3000",""),
            url: path,
            withCredentials: true,
            params,
            headers: {
                'Content-Type': type
            },
            data: type === 'application/json' ? JSON.stringify(body) : body
        });
        return data;
    } catch(err) {
        return err.response?.data;
    }
}

export default request;
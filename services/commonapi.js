import axios from 'axios'

export const commonapi = async (httpmethod, url, reqbody) => {

    const reqconfig = {
        method: httpmethod,
        url,
        data: reqbody
    }

    return await axios(reqconfig).then((res) => {
        return res
    }).catch((err) => {
        return err
    })
}
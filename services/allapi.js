import { commonapi } from "./commonapi";
import { serverurl } from "./serverurl";

//add//

export const addapi = async (reqbody) => {

    return await commonapi('POST', `${serverurl}/employees`, reqbody)

}
//get//

export const getapi = async () => {
    return await commonapi('GET', `${serverurl}/employees`, "")
}
//delete //

export const deleteapi = async (id) => {
    return await commonapi('delete', `${serverurl}/employees/${id}`)
}

//getspecific//

export const getspecificapi = async (id) => {
    return await commonapi('GET', `${serverurl}/employees/${id}`, "")
}

//update the adta //

export const updateapi = async (id, reqbody) => {
    return await commonapi('PUT', `${serverurl}/employees/${id}`,reqbody)
}
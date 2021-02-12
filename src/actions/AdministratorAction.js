import { Types } from "../types/Types";
import { FetchConsult } from "../helpers/FetchService";

export const administratorStartLoading = () => {
    return async (dispatch) => {
        try {
            const resp = await FetchConsult('administradores');
            const body = await resp.json();
            if(body.status === "success"){
                
            
            const prueba =  JSON.parse(body.admins);
            console.log(prueba);
                dispatch(adminStartLoaded(body.admins))
            }else {
                console.log("Error", body.msg, "error")
            }
        }catch (error) {
            console.log(error);
          }
    }
};

const adminStartLoaded = (administrators) => ({
type: Types.ADMINISTRATOR_LOADED,
payload: administrators
})

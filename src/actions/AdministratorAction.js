import { Types } from "../types/Types";
import { FetchConsult } from "../helpers/FetchService";

export const administratorStartLoading = () => {
    return async (dispatch) => {
      try {
        const resp = await FetchConsult(`administradores`);
  
        const body = await resp.json();
        
        if (body.status === "success") {
  
          console.log(body.admins);
          dispatch(administratorLoaded(body.admins));
        } else {
          console.log("Error", body.msg, "error")
        }
      } catch (error) {
        console.log(error);
      }
    };
  };

  const administratorLoaded = (administrators) => ({
    type: Types.ADMINISTRATOR_LOADED,
    payload: administrators
})
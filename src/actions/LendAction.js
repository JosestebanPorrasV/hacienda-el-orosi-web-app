import { Types } from "../types/Types";
import { FetchConsult } from "../helpers/FetchService";

export const lendStartLoading = () => {
    return async (dispatch) => {
      try {
        const resp = await FetchConsult(`recursos-humanos/prestamo-activos`);
  
        const body = await resp.json();
        
        if (body.status === "success") {
  
          console.log(body.lends);
          dispatch(lendLoaded(body.lends));
        } else {
          console.log("Error", body.msg, "error")
        }
      } catch (error) {
        console.log(error);
      }
    };
  };

  const lendLoaded = (lends) => ({
    type: Types.LEND_LOADED,
    payload: lends
})
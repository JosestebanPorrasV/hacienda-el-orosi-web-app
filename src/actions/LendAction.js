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

  export const lendCanceltLoading = () => {
    return async (dispatch) => {
      try {
        const resp = await FetchConsult(`recursos-humanos/historial`);
  
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

  export const FeeStartLoading = (id_) => {
    return async (dispatch) => {
      try {
        const resp = await FetchConsult(`recursos-humanos/historial-cuotas/${id_}`);
  
        const body = await resp.json();
        
        if (body.status === "success") {
  
          console.log(body.fees);
          dispatch(feeLoaded(body.fees));
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

const feeLoaded = (fees) => ({
  type: Types.FEE_LOADED,
  payload: fees
})
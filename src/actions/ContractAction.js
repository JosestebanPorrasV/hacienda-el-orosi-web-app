import { Types } from "../types/Types";
import { FetchConsult } from "../helpers/FetchService";

export const contractStartLoading = () => {
  return async (dispatch) => {
    try {
      const resp = await FetchConsult(
        `recursos-humanos/ver-contratos`
      );

      const body = await resp.json();
      if (body.status === "success") {
        console.log(body.contracts);
        dispatch(contractLoaded(body.contracts));
      }else{
          console.log( "Error", body.msg, "error" );
      }
    }catch (error) {
        console.log(error);
    }
  };
};

const contractLoaded = (contracts) => ({
    types: Types.CONTRACT_LOADED,
    payload: contracts,
});

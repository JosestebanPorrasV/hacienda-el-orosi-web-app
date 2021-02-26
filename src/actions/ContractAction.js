import { Types } from "../types/Types";
import { FetchConsult } from "../helpers/FetchService";
import Swal from "sweetalert2";

export const contractsLoading = () => {
  return async (dispatch) => {
    try {
      const resp = await FetchConsult(`recursos-humanos/ver-contratos/active`);
      const body = await resp.json();

      if (body.status === "success") {
        dispatch(contractsLoaded(body));
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const contractsLoaded = (contracts) => ({
  type: Types.CONTRACTS_ACTIVES_LOADED,
  payload: contracts,
});

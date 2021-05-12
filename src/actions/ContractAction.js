import { Types } from "../types/Types";
import { FetchConsult } from "../helpers/FetchService";
import Swal from "sweetalert2";
import TopLoaderService from "top-loader-service";

export const contractsLoading = (status = "Activo", page = 1) => {
  return async (dispatch) => {
    await TopLoaderService.start();
    try {
      const resp = await FetchConsult(`recursos-humanos/ver-contratos/${status}/${page}`);
      const body = await resp.json();

      if (body.status) {
        await  dispatch(contractsLoaded(body.contracts));
        await TopLoaderService.end();
      } else {
        await TopLoaderService.end();
        await Swal.fire("Error", body.msg, "error");
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

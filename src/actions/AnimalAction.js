import { Types } from "../types/Types";
import { FetchConsult } from "../helpers/FetchService";
import Swal from "sweetalert2";
import TopLoaderService from "top-loader-service";

export const animalsByTypeLoading = (type = "Vaca lechera", page = 1) => {
  return async (dispatch) => {
    await TopLoaderService.start();
    try {
      const resp = await FetchConsult(`gestion-animal/tipo/${type}/${page}`);

      const body = await resp.json();
      
      if (body.status) {
        await dispatch(animalsLoaded(body.animals));
        await TopLoaderService.end();
      } else {
        await Swal.fire("Error", body.msg, "error");
        await TopLoaderService.end();
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const animalsLoaded = (animals) => ({
  type: Types.ANIMALS_LOADED,
  payload: animals,
});

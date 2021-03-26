import { Types } from "../types/Types";
import { FetchConsult } from "../helpers/FetchService";
import Swal from "sweetalert2";

export const DietsLoaded = () => {
  return async (dispatch) => {
    try {
      const resp = await FetchConsult(`gestion-animal/listar-dietas`);
      const body = await resp.json();

      if (body.status) {
        await dispatch(dietsLoaded(body));
      } else {
        await Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const AlimentsLoaded = () => {
  return async (dispatch) => {
    try {
      const resp = await FetchConsult(`gestion-animal/listar-alimentos`);
      const body = await resp.json();

      if (body.status) {
        await dispatch(alimentsLoaded(body));
      } else {
        await Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const dietsLoaded = (diets) => ({
  type: Types.DIETS_LOADED,
  payload: diets,
});

const alimentsLoaded = (aliments) => ({
  type: Types.ALIMENTS_LOADED,
  payload: aliments,
});

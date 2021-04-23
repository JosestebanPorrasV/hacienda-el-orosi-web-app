import { Types } from "../types/Types";
import { FetchConsult } from "../helpers/FetchService";
import { uiCloseModalDiet } from "./UIAction";
import Swal from "sweetalert2";
import TopLoaderService from "top-loader-service"

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

export function saveDiet(dietFormValues) {
  return async (dispatch) => {
    await TopLoaderService.start();
    const resp = await FetchConsult(
      "gestion-animal/guardar-dieta",
      {
        stage: dietFormValues.stage,
        diet_name: dietFormValues.diet_name,
        animal: dietFormValues.animal,
        aliment: dietFormValues.aliment,
      },
      "POST"
    );

    const body = await resp.json();

    if (body.status) {
      await dispatch(addDietSuccess(body.diet));
      await Swal.fire({
        icon: "success",
        title: body.msg,
        showConfirmButton: false,
        timer: 2000,
      });
      await dispatch(uiCloseModalDiet());
      await TopLoaderService.end();
    } else {
      await Swal.fire("Error", body.msg, "error");
      await TopLoaderService.end();
    }
  };
}

export function addAliment(alimentFormValues) {
  return async (dispatch) => {
    await TopLoaderService.start();
    const resp = await FetchConsult(
      "gestion-animal/agregar-alimento",
      {
        name_aliment: alimentFormValues.name_aliment,
        quantity_supplied: alimentFormValues.quantity_supplied,
        aliment_kg: alimentFormValues.aliment_kg,
        price_aliment: alimentFormValues.price_aliment,
      },
      "POST"
    );

    const body = await resp.json();
    if (body.status) {
      await dispatch(addAlimentSuccess(body.aliment));
      await Swal.fire({
        icon: "success",
        title: body.msg,
        showConfirmButton: false,
        timer: 2000,
      });

      await TopLoaderService.end();
    } else {
      await Swal.fire("Error", body.msg, "error");
      await TopLoaderService.end();
    }
  };
}

export const addDietSuccess = (diet) => ({
  type: Types.ADD_NEW_DIET,
  payload: diet,
});

export const addAlimentSuccess = (aliment) => ({
  type: Types.ADD_NEW_ALIMENT,
  payload: aliment,
});

export const dietSetActive = (diet) => ({
  type: Types.DIET_SET_ACTIVE,
  payload: diet,
});
export const dietClearActive = () => ({
  type: Types.DIET_CLEAR_ACTIVE,
});

export const alimentSetActive = (aliment) => ({
  type: Types.ALIMENT_SET_ACTIVE,
  payload: aliment,
});
export const alimentClearActive = () => ({
  type: Types.ALIMENT_CLEAR_ACTIVE,
});

const dietsLoaded = (diets) => ({
  type: Types.DIETS_LOADED,
  payload: diets,
});

const alimentsLoaded = (aliments) => ({
  type: Types.ALIMENTS_LOADED,
  payload: aliments,
});

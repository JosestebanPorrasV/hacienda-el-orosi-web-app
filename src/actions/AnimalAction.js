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

export function regMilk(animalID, reg, date) {
  return async (dispatch) => {
    await TopLoaderService.start();
    console.log(animalID, reg, date);

    const resp = await FetchConsult(
      `gestion-animal/registar-leche/vaca/${animalID}`,
      { liters: reg, registration_date: date },
      "POST"
    );

    const body = await resp.json();

    if (body.status) {
      await dispatch(regMilkSuccess(body.cow));

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

export function regWeight(animalID, reg, date) {
  return async (dispatch) => {
    await TopLoaderService.start();
    console.log(animalID, reg, date);

    const resp = await FetchConsult(
      `gestion-animal/${animalID}/registar-peso`,
      {
        weight: reg[0],
        date: date,
        observations: reg[1],
      },
      "POST"
    );
    const body = await resp.json();

    if (body.status) {
      await dispatch(regWeightSuccess(body.animal));

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

export function regCalving(animalID, reg, date) {
  return async (dispatch) => {
    await TopLoaderService.start();
    console.log(animalID, reg, date);

    const resp = await FetchConsult(
      `gestion-animal/${animalID}/registar-peso`,
      {
        weight: reg[0],
        date: date,
        observations: reg[1],
      },
      "POST"
    );
    const body = await resp.json();

    if (body.status) {
      await dispatch(regWCalvingSuccess(body.animal));

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

const animalsLoaded = (animals) => ({
  type: Types.ANIMALS_LOADED,
  payload: animals,
});

export const regMilkSuccess = (animal) => ({
  type: Types.REGISTER_MILK_SUCCESS,
  payload: animal,
});

export const regWeightSuccess = (animal) => ({
  type: Types.REGISTER_WEIGHT_SUCCESS,
  payload: animal,
});

export const regWCalvingSuccess = (animal) => ({
  type: Types.REGISTER_CALVING_SUCCESS,
  payload: animal,
});

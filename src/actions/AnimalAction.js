import { Types } from "../types/Types";
import { FetchConsult } from "../helpers/FetchService";
import Swal from "sweetalert2";
import TopLoaderService from "top-loader-service";

export const animalsLoading = () => {
  return async (dispatch) => {
    await TopLoaderService.start();
    try {
      const resp = await FetchConsult(`gestion-animal/todos/`);

      const body = await resp.json();

      if (body.status) {
        await dispatch(animalsLoaded(body));
        await dispatch(typeClearActive());
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

export const animalsByTypeLoading = (type) => {
  return async (dispatch) => {
    await TopLoaderService.start();
    try {
      const resp = await FetchConsult(`gestion-animal/tipo/${type}`);

      const body = await resp.json();

      if (body.status) {
        await dispatch(animalsLoaded(body));
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

export const animalsByTypeAndStatusLoading = (type, status) => {
  return async (dispatch) => {
    await TopLoaderService.start();
    try {
      const resp = await FetchConsult(
        `gestion-animal/tipo/${type}/estado/${status}`
      );

      const body = await resp.json();

      if (body.status) {
        await dispatch(animalsLoaded(body));
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

export const TypesLoading = () => {
  return async (dispatch) => {
    await TopLoaderService.start();
    try {
      const resp = await FetchConsult(`gestion-animal/ver-tipos`);

      const body = await resp.json();

      if (body.status) {
        await dispatch(typesLoaded(body));
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

export function regType(name, gender) {
  return async (dispatch) => {
    await TopLoaderService.start();

    const resp = await FetchConsult(
      `gestion-animal/registrar-tipo`,
      {
        name: name,
        gender: gender,
      },
      "POST"
    );
    const body = await resp.json();

    if (body.status) {
      await dispatch(regTypeSuccess(body.type));

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

export const typeDelete = (type) => {
  return async (dispatch) => {
    await TopLoaderService.start();
    try {
      const resp = await FetchConsult(
        `gestion-animal/remover-tipo/${type._id}`,
        { _id: type._id },
        "DELETE"
      );

      const body = await resp.json();

      if (body.status) {
        await Swal.fire("Eliminado", body.msg, "success");

        await dispatch(deleteOneType(body.type));

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

export const searchAnimal = (animalID) => {
  return async (dispatch) => {
    await TopLoaderService.start();
    try {
      const resp = await FetchConsult(`gestion-animal/ver-animal/${animalID}`);
      const body = await resp.json();
      if (body.status) {
        if (body.animal.type.gender === "Macho") {
          await TopLoaderService.end();
          return await Swal.fire(
            "Cuidado",
            "Solamente animales hembras",
            "warning"
          );
        }
        await dispatch(searchSetActive(body.animal));
        await Swal.fire({
          icon: "success",
          title: body.msg,
          showConfirmButton: false,
          timer: 2000,
        });
        await TopLoaderService.end();
      } else {
        await Swal.fire("Error", body.msg, "warning");
        await TopLoaderService.end();
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export function register(
  valuesForm,
  typeID,
  date_admission,
  next_due_date,
  daughter_of
) {
  return async (dispatch) => {
    await TopLoaderService.start();
    const resp = await FetchConsult(
      "gestion-animal/registrar",
      {
        plate_number: valuesForm.plate_number,
        plate_color: valuesForm.plate_color,
        type_animal: typeID,
        status: valuesForm.status,
        race: valuesForm.race,
        age: valuesForm.age,
        date_admission: date_admission,
        daughter_of: daughter_of,
        starting_weight: valuesForm.starting_weight,
        place_origin: valuesForm.place_origin,
        name: valuesForm.name,
        next_due_date: next_due_date,
      },
      "POST"
    );

    const body = await resp.json();
    if (body.status) {
      await dispatch(animalClearActive());
      await dispatch(addAnimalSuccess(body.animal));
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

export function update(
  animalID,
  valuesForm,
  typeID,
  date_admission,
  next_due_date,
  daughter_of
) {
  return async (dispatch) => {
    await TopLoaderService.start();
    const resp = await FetchConsult(
      `gestion-animal/actualizar/${animalID}`,
      {
        plate_number: valuesForm.plate_number,
        plate_color: valuesForm.plate_color,
        type_animal: typeID,
        status: valuesForm.status,
        race: valuesForm.race,
        age: valuesForm.age,
        date_admission: date_admission,
        daughter_of: daughter_of,
        starting_weight: valuesForm.starting_weight,
        place_origin: valuesForm.place_origin,
        name: valuesForm.name,
        next_due_date: next_due_date,
      },
      "PUT"
    );

    const body = await resp.json();
    if (body.status) {
      await dispatch(animalClearActive());
      await dispatch(updateAnimalSuccess(body.animal));

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

export function regMilk(animalID, reg, date) {
  return async (dispatch) => {
    await TopLoaderService.start();
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

const typesLoaded = (types) => ({
  type: Types.TYPES_LOADED,
  payload: types,
});

export const regTypeSuccess = (type) => ({
  type: Types.REGISTER_TYPE_ANIMAL_SUCCESS,
  payload: type,
});

export const deleteOneType = (type) => ({
  type: Types.DELETE_TYPE,
  payload: type,
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

export const typeSetActive = (type) => ({
  type: Types.TYPE_SET_ACTIVE,
  payload: type,
});

export const typeClearActive = () => ({
  type: Types.TYPE_CLEAR_ACTIVE,
});

export const animalSetActive = (animal) => ({
  type: Types.ANIMAL_SET_ACTIVE,
  payload: animal,
});

export const searchSetActive = (animal) => ({
  type: Types.SEARCH_SET_ACTIVE,
  payload: animal,
});
export const searchClearActive = () => ({
  type: Types.SEARCH_CLEAN_ACTIVE,
});

export const animalClearActive = () => ({
  type: Types.ANIMAL_CLEAR_ACTIVE,
});
export const addAnimalSuccess = (animal) => ({
  type: Types.ADD_NEW_ANIMAL,
  payload: animal,
});

export const updateAnimalSuccess = (animal) => ({
  type: Types.UPDATE_ANIMAL,
  payload: animal,
});

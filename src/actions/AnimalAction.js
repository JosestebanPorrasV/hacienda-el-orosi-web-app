import { Types } from '../types/Types';
import { FetchConsult, uploadImage } from '../helpers/FetchService';
import Swal from 'sweetalert2';
import TopLoaderService from 'top-loader-service';

export const animalsByTypeLoading = (type = 'undefined', page = 1) => {
  return async (dispatch) => {
    await TopLoaderService.start();
    try {
      const resp = await FetchConsult(`gestion-animal/tipo/${type}/${page}`);
      const body = await resp.json();

      if (body.status) {
        await dispatch(animalsLoaded(body));
        await TopLoaderService.end();
      } else {
        await Swal.fire('Error', body.msg, 'error');
        await TopLoaderService.end();
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const animalsByStatusLoading = (status, page = 1) => {
  return async (dispatch) => {
    await TopLoaderService.start();
    try {
      const resp = await FetchConsult(`gestion-animal/estado/${status}/${page}`);
      const body = await resp.json();

      if (body.status) {
        await dispatch(animalsLoaded(body));
        await TopLoaderService.end();
      } else {
        await Swal.fire('Error', body.msg, 'error');
        await TopLoaderService.end();
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const animalsByStatusAndTypeLoading = (type = 'undefined', status, page = 1) => {
  return async (dispatch) => {
    await TopLoaderService.start();
    try {
      const resp = await FetchConsult(`gestion-animal/tipo/${type}/estado/${status}/${page}`);
      const body = await resp.json();

      if (body.status) {
        await dispatch(animalsLoaded(body));
        await TopLoaderService.end();
      } else {
        await Swal.fire('Error', body.msg, 'error');
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
        await Swal.fire('Error', body.msg, 'error');
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
        gender: gender
      },
      'POST'
    );
    const body = await resp.json();

    if (body.status) {
      await dispatch(regTypeSuccess(body.type));

      await Swal.fire({
        icon: 'success',
        title: body.msg,
        showConfirmButton: false,
        timer: 2000
      });
      await TopLoaderService.end();
    } else {
      await Swal.fire('Error', body.msg, 'error');
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
        'DELETE'
      );

      const body = await resp.json();

      if (body.status) {
        await Swal.fire('Eliminado', body.msg, 'success');

        await dispatch(deleteOneType(body.type));

        await TopLoaderService.end();
      } else {
        await Swal.fire('Error', body.msg, 'error');
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
        if (body.animal.type.gender === 'Macho') {
          await TopLoaderService.end();
          return await Swal.fire('Cuidado', 'Solamente animales hembras', 'warning');
        }
        await dispatch(searchSetActive(body.animal));
        await Swal.fire({
          icon: 'success',
          title: body.msg,
          showConfirmButton: false,
          timer: 2000
        });
        await TopLoaderService.end();
      } else {
        await Swal.fire('Error', body.msg, 'warning');
        await TopLoaderService.end();
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export function register(valuesForm, typeID, date_admission, next_due_date, daughter_of) {
  return async (dispatch) => {
    await TopLoaderService.start();
    const resp = await FetchConsult(
      'gestion-animal/registrar',
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
        next_due_date: next_due_date
      },
      'POST'
    );

    const body = await resp.json();
    if (body.status) {
      await dispatch(animalClearActive());
      await dispatch(addAnimalSuccess(body.animal));

      if (valuesForm.photo) {
        await dispatch(uploadImg(valuesForm.photo, body.animal._id, 'foto-de-registro'));
      } else {
        await dispatch(updateAnimalSuccess(body.animal));
      }

      await TopLoaderService.end();
    } else {
      await Swal.fire('Error', body.msg, 'error');
      await TopLoaderService.end();
    }
  };
}

export function update(animalID, valuesForm, typeID, date_admission, next_due_date, daughter_of) {
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
        next_due_date: next_due_date
      },
      'PUT'
    );

    const body = await resp.json();
    if (body.status) {
      await dispatch(animalClearActive());
      console.log(valuesForm);
      if (valuesForm.photo) {
        await dispatch(uploadImg(valuesForm.photo, body.animal._id, 'foto-de-registro'));
      } else {
        await Swal.fire({
          icon: 'success',
          title: body.msg,
          showConfirmButton: false,
          timer: 2000
        });
        await dispatch(updateAnimalSuccess(body.animal));
      }

      await TopLoaderService.end();
    } else {
      await Swal.fire('Error', body.msg, 'error');
      await TopLoaderService.end();
    }
  };
}

export const uploadImg = (image, animalID, url) => {
  return async (dispatch) => {
    await TopLoaderService.start();

    let formData = new FormData();

    formData.append('image', image);

    const resp = await uploadImage(`gestion-animal/subir/${url}/${animalID}/`, formData);

    const body = await resp.json();
    await dispatch(updateAnimalSuccess(body.animal));
    if (body.status) {
      await Swal.fire({
        icon: 'success',
        title: body.msg,
        showConfirmButton: false,
        timer: 2000
      });
      await TopLoaderService.end();
    } else {
      await Swal.fire('Error', body.msg, 'error');
      await TopLoaderService.end();
    }
  };
};

export function regMilk(animalID, reg, date) {
  return async (dispatch) => {
    await TopLoaderService.start();
    const resp = await FetchConsult(
      `gestion-animal/registar-leche/vaca/${animalID}`,
      { liters: reg, registration_date: date },
      'POST'
    );

    const body = await resp.json();

    if (body.status) {
      await dispatch(regMilkSuccess(body.cow));

      await Swal.fire({
        icon: 'success',
        title: body.msg,
        showConfirmButton: false,
        timer: 2000
      });
      await TopLoaderService.end();
    } else {
      await Swal.fire('Error', body.msg, 'error');
      await TopLoaderService.end();
    }
  };
}

export function regWeight(animalID, reg, date) {
  return async (dispatch) => {
    await TopLoaderService.start();
    const resp = await FetchConsult(
      `gestion-animal/${animalID}/registar-peso`,
      {
        weight: reg[0],
        date: date,
        observations: reg[1]
      },
      'POST'
    );
    const body = await resp.json();

    if (body.status) {
      await dispatch(regWeightSuccess(body.animal));

      await Swal.fire({
        icon: 'success',
        title: body.msg,
        showConfirmButton: false,
        timer: 2000
      });
      await TopLoaderService.end();
    } else {
      await Swal.fire('Error', body.msg, 'error');
      await TopLoaderService.end();
    }
  };
}

export function regCalving(animalID, date, complications) {
  return async (dispatch) => {
    await TopLoaderService.start();
    console.log(animalID, date, complications);
    const resp = await FetchConsult(
      `gestion-animal/registar-parto/animal/${animalID}`,
      {
        date: date,
        complications: complications
      },
      'POST'
    );
    const body = await resp.json();

    if (body.status) {
      await dispatch(regWCalvingSuccess(body.animal));

      await Swal.fire({
        icon: 'success',
        title: body.msg,
        showConfirmButton: false,
        timer: 2000
      });
      await TopLoaderService.end();
    } else {
      await Swal.fire('Error', body.msg, 'error');
      await TopLoaderService.end();
    }
  };
}

export function changeStatus(id, status) {
  return async (dispatch) => {
    await TopLoaderService.start();

    const resp = await FetchConsult(
      `gestion-animal/actualizar-estado/${id}`,
      { status: status },
      'PUT'
    );

    const body = await resp.json();

    if (body.status) {
      await dispatch(changeStatusSuccess(body.animal));

      await Swal.fire({
        icon: 'success',
        title: body.msg,
        showConfirmButton: false,
        timer: 2000
      });
      await TopLoaderService.end();
    } else {
      await Swal.fire('Error', body.msg, 'error');
      await TopLoaderService.end();
    }
  };
}

export function changeNextDueDate(id, date) {
  return async (dispatch) => {
    await TopLoaderService.start();

    const resp = await FetchConsult(
      `gestion-animal/actualizar/fecha-proxima-de-parto/${id}`,
      { next_due_date: date },
      'PUT'
    );

    const body = await resp.json();

    if (body.status) {
      await dispatch(changeNextDueDateSuccess(body.animal));

      await Swal.fire({
        icon: 'success',
        title: body.msg,
        showConfirmButton: false,
        timer: 2000
      });
      await TopLoaderService.end();
    } else {
      await Swal.fire('Error', body.msg, 'error');
      await TopLoaderService.end();
    }
  };
}

export function deleteRegisterWeight(animalID, weightID) {
  return async (dispatch) => {
    await TopLoaderService.start();
    try {
      const resp = await FetchConsult(
        `gestion-animal/${animalID}/eliminar-peso/${weightID}`,
        { animalID: animalID },
        'DELETE'
      );

      const body = await resp.json();

      if (body.status) {
        await dispatch(deleteRegisterWeightSuccess(body.animal));

        await Swal.fire({
          icon: 'success',
          title: body.msg,
          showConfirmButton: false,
          timer: 2000
        });
        await TopLoaderService.end();
      } else {
        await Swal.fire('Error', body.msg, 'error');
        await TopLoaderService.end();
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteRegisterMilk(animalID, milkID) {
  return async (dispatch) => {
    await TopLoaderService.start();
    try {
      const resp = await FetchConsult(
        `gestion-animal/vaca/${animalID}/eliminar-registro/leche/${milkID}`,
        { animalID: animalID },
        'DELETE'
      );

      const body = await resp.json();

      if (body.status) {
        await dispatch(deleteRegisterMilkSuccess(body.animal));

        await Swal.fire({
          icon: 'success',
          title: body.msg,
          showConfirmButton: false,
          timer: 2000
        });
        await TopLoaderService.end();
      } else {
        await Swal.fire('Error', body.msg, 'error');
        await TopLoaderService.end();
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteRegisterCalving(animalID, calvingID) {
  return async (dispatch) => {
    await TopLoaderService.start();
    try {
      const resp = await FetchConsult(
        `gestion-animal/${animalID}/eliminar-parto/${calvingID}`,
        { animalID: animalID },
        'DELETE'
      );

      const body = await resp.json();

      if (body.status) {
        await dispatch(deleteRegisterCalvingSuccess(body.animal));

        await Swal.fire({
          icon: 'success',
          title: body.msg,
          showConfirmButton: false,
          timer: 2000
        });
        await TopLoaderService.end();
      } else {
        await Swal.fire('Error', body.msg, 'error');
        await TopLoaderService.end();
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export const deleteRegisterWeightSuccess = (animal) => ({
  type: Types.ANIMAL_REMOVE__WEIGHT,
  payload: animal
});
export const deleteRegisterCalvingSuccess = (animal) => ({
  type: Types.ANIMAL_REMOVE__CALVING,
  payload: animal
});

export const deleteRegisterMilkSuccess = (animal) => ({
  type: Types.ANIMAL_REMOVE__MILK,
  payload: animal
});

export const changeNextDueDateSuccess = (animal) => ({
  type: Types.ANIMAL_CHANGE__NEXT_DUE_DATE,
  payload: animal
});

export const changeStatusSuccess = (animal) => ({
  type: Types.ANIMAL_CHANGE_STATUS,
  payload: animal
});

const animalsLoaded = (animals) => ({
  type: Types.ANIMALS_LOADED,
  payload: animals
});

const typesLoaded = (types) => ({
  type: Types.TYPES_LOADED,
  payload: types
});

export const regTypeSuccess = (type) => ({
  type: Types.REGISTER_TYPE_ANIMAL_SUCCESS,
  payload: type
});

export const deleteOneType = (type) => ({
  type: Types.DELETE_TYPE,
  payload: type
});

export const regMilkSuccess = (animal) => ({
  type: Types.REGISTER_MILK_SUCCESS,
  payload: animal
});

export const regWeightSuccess = (animal) => ({
  type: Types.REGISTER_WEIGHT_SUCCESS,
  payload: animal
});

export const regWCalvingSuccess = (animal) => ({
  type: Types.REGISTER_CALVING_SUCCESS,
  payload: animal
});

export const typeSetActive = (type) => ({
  type: Types.TYPE_SET_ACTIVE,
  payload: type
});

export const typeClearActive = () => ({
  type: Types.TYPE_CLEAR_ACTIVE
});

export const animalSetActive = (animal) => ({
  type: Types.ANIMAL_SET_ACTIVE,
  payload: animal
});

export const searchSetActive = (animal) => ({
  type: Types.SEARCH_SET_ACTIVE,
  payload: animal
});
export const searchClearActive = () => ({
  type: Types.SEARCH_CLEAN_ACTIVE
});

export const animalClearActive = () => ({
  type: Types.ANIMAL_CLEAR_ACTIVE
});
export const addAnimalSuccess = (animal) => ({
  type: Types.ADD_NEW_ANIMAL,
  payload: animal
});

export const updateAnimalSuccess = (animal) => ({
  type: Types.UPDATE_ANIMAL,
  payload: animal
});

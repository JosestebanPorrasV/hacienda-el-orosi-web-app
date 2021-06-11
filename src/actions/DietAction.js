import { Types } from '../types/Types';
import { FetchConsult } from '../helpers/FetchService';
import Swal from 'sweetalert2';
import TopLoaderService from 'top-loader-service';

export const DietsLoaded = () => {
  return async (dispatch) => {
    try {
      const resp = await FetchConsult(`gestion-animal/listar-dietas`);
      const body = await resp.json();
      if (body.status) {
        await dispatch(dietsLoaded(body));
      } else {
        await Swal.fire('Error', body.msg, 'error');
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const AlimentsLoaded = (id) => {
  return async (dispatch) => {
    try {
      const resp = await FetchConsult(`gestion-animal/listar-alimentos/${id}`);
      const body = await resp.json();
      if (body.status) {
        await dispatch(alimentsLoaded(body));
      } else {
        await Swal.fire('Error', body.msg, 'error');
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export function saveDiet(dietFormValues) {
  return async (dispatch) => {
    await TopLoaderService.start();
    console.log(dietFormValues.diet_name);
    const resp = await FetchConsult(
      'gestion-animal/guardar-dieta',
      {
        diet_name: dietFormValues.diet_name,
        description: dietFormValues.description
      },
      'POST'
    );

    const body = await resp.json();
    if (body.status) {
      console.log(body);
      await dispatch(addDietSuccess(body.diet));
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

export function addAliment({ _id }, alimentFormValues) {
  return async (dispatch) => {
    await TopLoaderService.start();
    const resp = await FetchConsult(
      `gestion-animal/agregar-alimento/${_id}`,
      {
        product_code: alimentFormValues.product,
        quantity_supplied: alimentFormValues.quantity_supplied
      },
      'POST'
    );

    const body = await resp.json();
    if (body.status) {
      await dispatch(AlimentsLoaded(_id));
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

export function updateDiet(dietID, dietFormValues) {
  return async (dispatch) => {
    await TopLoaderService.start();

    const resp = await FetchConsult(`gestion-animal/modificar-dieta/${dietID}`, 
    {
       diet_name: dietFormValues.diet_name,
       description: dietFormValues.description
    }, 
    'PUT'
    );

    const body = await resp.json();
    if (body.status) {
      await dispatch(DietsLoaded());
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

export function editAliment(dietID, alimentID, newQuantity) {
  return async (dispatch) => {
    await TopLoaderService.start();
    const resp = await FetchConsult(
      `gestion-animal/modificar-alimento/${alimentID}`,
      {
        quantity_supplied: newQuantity
      },
      'PUT'
    );
    const body = await resp.json();

    if (body.status) {
      await dispatch(AlimentsLoaded(dietID));
      Swal.fire({
        icon: 'success',
        title: body.msg,
        showConfirmButton: false,
        timer: 2000
      });

      await TopLoaderService.end();
    } else {
      Swal.fire('Error', body.msg, 'error');
      await TopLoaderService.end();
    }
  };
}

export const oneDietDelete = ({ _id }) => {
  return async (dispatch) => {
    await TopLoaderService.start();
    try {
      const resp = await FetchConsult(`gestion-animal/remover-dieta/${_id}`, {}, 'DELETE');

      const body = await resp.json();
      if (body.status) {
        await Swal.fire('Eliminado', body.msg, 'success');

        await dispatch(deleteOneDiet());
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

export const oneAlimentDelete = ({ _id }) => {
  return async (dispatch) => {
    await TopLoaderService.start();
    try {
      const resp = await FetchConsult(`gestion-animal/remover-alimento/${_id}`, {}, 'DELETE');

      const body = await resp.json();
      if (body.status) {
        await Swal.fire('Eliminado', body.msg, 'success');

        await dispatch(deleteOneAliment());
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

export const deleteOneAliment = () => ({
  type: Types.DELETE_ALIMENT
});

export const deleteOneDiet = () => ({
  type: Types.DELETE_DIET
});

export const addDietSuccess = (diet) => ({
  type: Types.ADD_NEW_DIET,
  payload: diet
});

export const addAlimentSuccess = (aliment) => ({
  type: Types.ADD_NEW_ALIMENT,
  payload: aliment
});

export const dietSetActive = (diet) => ({
  type: Types.DIET_SET_ACTIVE,
  payload: diet
});
export const dietClearActive = () => ({
  type: Types.DIET_CLEAR_ACTIVE
});

export const alimentSetActive = (aliment) => ({
  type: Types.ALIMENT_SET_ACTIVE,
  payload: aliment
});
export const alimentClearActive = () => ({
  type: Types.ALIMENT_CLEAR_ACTIVE
});

const dietsLoaded = (diets) => ({
  type: Types.DIETS_LOADED,
  payload: diets
});

const alimentsLoaded = (aliments) => ({
  type: Types.ALIMENTS_LOADED,
  payload: aliments
});

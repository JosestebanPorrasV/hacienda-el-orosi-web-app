import { Types } from "../types/Types";
import { FetchConsult } from "../helpers/FetchService";
import Swal from "sweetalert2";
import TopLoaderService from "top-loader-service";

export const ProductsLoaded = (page = 1) => {
  return async (dispatch) => {
    await TopLoaderService.start();
    try {
      const resp = await FetchConsult(
        `gestion-animal/listar-productos/${page}`
      );
      const body = await resp.json();
      if (body.status) {
        await dispatch(productsLoaded(body.products));

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

export function addProduct(productFormValues) {
  return async (dispatch) => {
    await TopLoaderService.start();
    const resp = await FetchConsult(
      "gestion-animal/guardar-producto",
      {
        name: productFormValues.name,
        kilograms: productFormValues.kilograms,
        liters: productFormValues.liters,
        price: productFormValues.price,
      },
      "POST"
    );

    const body = await resp.json();
    if (body.status) {
      await dispatch(addProductSuccess(body.product));

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

export const searchProduct = (productName) => {
  return async (dispatch) => {
    await TopLoaderService.start();
    try {
      const resp = await FetchConsult(
        `gestion-animal/ver-producto/${productName}`
      );
      const body = await resp.json();
      if (body.status) {
        await dispatch(productSetActive(body.product));

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

export const oneProductDelete = ({ _id }) => {
  return async (dispatch) => {
    await TopLoaderService.start();
    try {
      const resp = await FetchConsult(
        `gestion-animal/remover-producto/${_id}`,
        {},
        "DELETE"
      );

      const body = await resp.json();
      if (body.status) {
        await Swal.fire("Eliminado", body.msg, "success");

        await dispatch(deleteOneProduct());
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

export const deleteOneProduct = () => ({
  type: Types.DELETE_PRODUCT,
});

export const addProductSuccess = (product) => ({
  type: Types.ADD_NEW_PRODUCT,
  payload: product,
});

export const productSetActive = (product) => ({
  type: Types.PRODUCT_SET_ACTIVE,
  payload: product,
});
export const productClearActive = () => ({
  type: Types.PRODUCT_CLEAR_ACTIVE,
});

const productsLoaded = (products) => ({
  type: Types.PRODUCTS_LOADED,
  payload: products,
});

import { Types } from "../types/Types";
import { FetchConsult } from "../helpers/FetchService";

import Swal from "sweetalert2";

export const startLogin = (document_id, password) => {
  return async (dispatch) => {
    const resp = await FetchConsult(
      "ingresar",
      { document_id, password },
      "POST"
    );
    const body = await resp.json();

    if (body.status === "success") {
      localStorage.setItem("identity", JSON.stringify(body.user));
      localStorage.setItem("token", JSON.stringify(body.token));
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(
        login({
          id: body.user.id,
          document_id: body.user.document_id,
          email: body.user.email,
          name: body.user.name,
          surname: body.user.surname,
          role: body.user.role,
        })
      );
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};
export const setRecoveryKey = (email, status) => {
  return async (dispatch) => {
    const resp = await FetchConsult(`recuperar/cuenta/${email}`);
    const body = await resp.json();

    if (body.status === "success") {
      Swal.fire("Correo registrado", body.msg, "success");

      dispatch(
        recoveryStatus({
          recoveryState: status,
          findMail: email,
        })
      );
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

export const verifyRecoveryKey = (email, code, status) => {
  return async (dispatch) => {
    const resp = await FetchConsult(`verificar/codigo/${email}/${code}`);
    const body = await resp.json();

    if (body.status === "success") {
      Swal.fire("Ultimo paso", body.msg, "success");

      dispatch(
        recoveryStatus({
          recoveryState: status,
        })
      );
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

export const changePass = (email, password, status) => {
  return async (dispatch) => {
    const resp = await FetchConsult(
      `/editar/cuenta/${email}`,
      { password },
      "PUT"
    );
    const body = await resp.json();

    if (body.status === "success") {
      Swal.fire("Muchas gracias", body.msg, "success");

      dispatch(changePassword());

      recoveryStatus({
        recoveryState: status,
      });
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

const changePassword = () => ({ type: Types.CHANGE_PASSWORD });

export const startChecking = () => {
  return async (dispatch) => {
    const resp = await FetchConsult("informacion-administrador");
    const body = await resp.json();

    if (body.status === "success") {
      localStorage.setItem("identity", JSON.stringify(body.user));
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(
        login({
          id: body.user.id,
          document_id: body.user.document_id,
          email: body.user.email,
          name: body.user.name,
          surname: body.user.surname,
          role: body.user.role,
        })
      );
    } else {
      dispatch(checkingFinish());
    }
  };
};

const recoveryStatus = (recoveryState) => ({
  type: Types.CHECK_RECOVERY_STATUS,
  payload: recoveryState,
});

const checkingFinish = () => ({ type: Types.CHECK_LOGIN_FINISH });

const login = (user) => ({
  type: Types.LOGIN,
  payload: user,
});

export const logout = () => ({ type: Types.LOGOUT });
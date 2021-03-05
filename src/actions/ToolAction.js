import { Types } from "../types/Types";
import { FetchConsult } from "../helpers/FetchService";
import Swal from "sweetalert2";

export const tooltStartLoading = (page) => {
  return async (dispatch) => {
    try {
      const resp = await FetchConsult(`herramientas/registradas/${page}`);
      const body = await resp.json();
      
      if (body.status === "success") {
        dispatch(toolLoaded(body.tools));
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};


export const toolsStartLoading = (status = "stock", page) => {
  return async (dispatch) => {
    try {
      const resp = await FetchConsult(`herramientas/ver/${status}/${page}`);
      const body = await resp.json();
      
      if (body.status === "success") {
        dispatch(toolLoaded(body.tools));
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const activeToolStartLoading = (page_) => {
  return async (dispatch) => {
    try {
      const resp = await FetchConsult(`herramientas/activas/${page_}`);
      const body = await resp.json();
      
      if (body.status === "success") {
        dispatch(activesLoaded(body));
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export function registerTool(toolFormValues) {
  return async (dispatch) => {
    const resp = await FetchConsult(
      "herramientas/registrar",
      {
        name: toolFormValues.name
      },
      "POST"
    );

    const body = await resp.json();
    if (body.status === "success") {
      await dispatch(addToolSuccess(body.tool));
      await dispatch(toolsStartLoading());
      await Swal.fire({
        icon: "success",
        title: body.msg,
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
}

export const deleteBulk = (collaborator_id, data) => {
  return async (dispatch) => {
    try {
      const resp = await FetchConsult(
        `herramientas/eliminar-activos/${collaborator_id}`,
        { data: data },
        "DELETE"
      );
      const body = await resp.json();
      if (body.status === "success") {
        Swal.fire("Eliminados", body.msg, "success");
        dispatch(toolsStartLoading());
        dispatch(deleteActivesSuccess());
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addToolSuccess = (tool) => ({
  type: Types.ADD_NEW_TOOL,
  payload: tool,
});

export const deleteActivesSuccess = () => ({
  type: Types.ACTIVES_DELETE,
});

const toolLoaded = (tools) => ({
  type: Types.TOOLS_LOADED,
  payload: tools,
});

const activesLoaded = (active) => ({
  type: Types.ACTIVES_LOADED,
  payload: active,
});

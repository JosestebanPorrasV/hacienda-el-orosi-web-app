import { Types } from "../types/Types";
import { FetchConsult } from "../helpers/FetchService";
import Swal from "sweetalert2";
import { uiCloseModalAddTool } from "./../actions/UIAction";

export const toolsLoading = (status = "stock") => {
  return async (dispatch) => {
    try {
      const resp = await FetchConsult(`herramientas/ver/${status}`);
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

export const activeToolByCollaboratorLoading = (collaboratorId) => {
  return async (dispatch) => {
    try {
      const resp = await FetchConsult(`herramientas/activas/colaborador/${collaboratorId}`);
      const body = await resp.json();
      console.log(body);
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
        name: toolFormValues.name,
        liters: toolFormValues.liters,
      },
      "POST"
    );

    const body = await resp.json();
    if (body.status === "success") {
      await dispatch(addToolSuccess());
      await dispatch(toolsLoading());
      await dispatch(uiCloseModalAddTool());
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
        dispatch(toolsLoading());
        dispatch(deleteActivesSuccess());
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addToolSelected = (tool) => {
  return async (dispatch) => {
    dispatch(addToSelectedTools(tool));
  };
};

export const addToSelectedTools = (tool) => ({
  type: Types.ADD_TO_SELECT_TOOLS,
  payload: tool,
});

export const removeInSelectedTools = (tool_id) => ({
  type: Types.REMOVE_IN_SELECT_TOOLS,
  payload: tool_id,
});

export const cleanSelectedTools = () => ({
  type: Types.CLEAN_SELECT_TOOLS,
});

export const addToolSuccess = () => ({
  type: Types.ADD_NEW_TOOL,
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

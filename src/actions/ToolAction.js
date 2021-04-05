import { Types } from "../types/Types";
import { FetchConsult } from "../helpers/FetchService";
import Swal from "sweetalert2";
import { uiCloseModalAddTool } from "./../actions/UIAction";
import TopLoaderService from "top-loader-service";

export const toolsLoading = (status = "En bodega") => {
  return async (dispatch) => {
    await TopLoaderService.start();
    try {
      const resp = await FetchConsult(`herramientas/ver/${status}`);
      const body = await resp.json();

      if (body.status) {
        await dispatch(toolLoaded(body.tools));
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

export const activesToolsLoaded = () => {
  return async (dispatch) => {
    await TopLoaderService.start();
    try {
      const resp = await FetchConsult(`herramientas/activas`);
      const body = await resp.json();

      if (body.status) {
        await dispatch(activesLoaded(body.actives));
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

export function registerTool(toolFormValues) {
  return async (dispatch) => {
    await TopLoaderService.start();
    const resp = await FetchConsult(
      "herramientas/registrar",
      {
        name: toolFormValues.name,
      },
      "POST"
    );

    const body = await resp.json();
    if (body.status) {
      await dispatch(addToolSuccess());
      await dispatch(toolsLoading());
      await dispatch(uiCloseModalAddTool());
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

export function changeStatus(tool_id, status) {
  return async (dispatch) => {
    await TopLoaderService.start();
    const resp = await FetchConsult(
      `herramientas/cambiar-estado/${tool_id}`,
      { status },
      "PUT"
    );

    const body = await resp.json();
    if (body.status) {

      await dispatch(changeStatusSuccess(body.tool));

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

export const removeTools = (data) => {
  return async (dispatch) => {
    await TopLoaderService.start();
    try {
      const resp = await FetchConsult(
        `herramientas/eliminar-activos`,
        { tools: data },
        "DELETE"
      );
      const body = await resp.json();

      if (body.status) {
        data.forEach(async function (element) {
          await dispatch(removeInActives(element.active_id));
        });

        await dispatch(cleanSelectedActives());

        await Swal.fire("Eliminados", body.msg, "success");
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

export const registerActives = (data) => {
  return async (dispatch) => {
    await TopLoaderService.start();
    try {
      const resp = await FetchConsult(
        `herramientas/registrar-activos`,
        { tools: data },
        "POST"
      );
      const body = await resp.json();

      if (body.status) {
        await dispatch(toolsLoading());
        await dispatch(cleanSelectedTools());
        await dispatch(toolsLoading());

        await Swal.fire("Todo bien", body.msg, "success");
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

export const toolSetActive = (tool) => ({
  type: Types.TOOL_SET_ACTIVE,
  payload: tool,
});

export const toolClearActive = () => ({
  type: Types.TOOL_CLEAR_ACTIVE,
});

export const addToolSelected = (tool) => {
  return async (dispatch) => {
    dispatch(addToSelectedTools(tool));
  };
};

export const addActiveSelected = (tool) => {
  return async (dispatch) => {
    dispatch(addToSelectedActives(tool));
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

export const addToSelectedActives = (tool) => ({
  type: Types.ADD_TO_SELECT_ACTIVES,
  payload: tool,
});

export const removeInSelectedActives = (tool_id) => ({
  type: Types.REMOVE_IN_SELECT_ACTIVES,
  payload: tool_id,
});

export const removeInActives = (tool_id) => ({
  type: Types.REMOVE_IN_ACTIVES,
  payload: tool_id,
});

export const changeStatusSuccess = (tool) => ({
  type: Types.TOOL_CHANGE_STATUS,
  payload: tool,
});

export const cleanSelectedTools = () => ({
  type: Types.CLEAN_SELECT_TOOLS,
});

export const cleanSelectedActives = () => ({
  type: Types.CLEAN_SELECT_ACTIVES,
});

export const addToolSuccess = () => ({
  type: Types.ADD_NEW_TOOL,
});

const toolLoaded = (tools) => ({
  type: Types.TOOLS_LOADED,
  payload: tools,
});

const activesLoaded = (actives) => ({
  type: Types.ACTIVES_LOADED,
  payload: actives,
});

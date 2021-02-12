import {Types} from "../types/Types";
import {FetchConsult} from "../helpers/FetchService";

//listar collaboradores
export const collaboratorStartLoading = (page_) => {
    return async (dispatch) => {
        try{
            const resp = await FetchConsult(`recursos-humanos/colaboradores-activos/${page_}`, null);
            const body = await resp.json();

            if (body.status === "success") {
                console.log("este es mi colaborador", body.collaborators)
                dispatch(collaboratorsLoaded(body.collaborators))
            }else {
                console.log("Error", body.msg, "error")
            }
        }catch (error) {
            console.log(error);
          }
    }
};

const collaboratorsLoaded = (collaborators) => ({
    type: Types.COLLABORATOR_LOADED,
    payload: collaborators
})
import { Types } from "../types/Types";
import { FetchConsult } from "../helpers/FetchService";

import Swal from "sweetalert2";

export const startLogin = (  document_id, password ) => {
    return async (dispatch) => {
   
        const resp = await FetchConsult( 'ingresar', { document_id, password }, 'POST' );
        const body = await resp.json();

        if( body.status === "success" ) {
   
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
                role: body.user.role
              })
            );

        } else {
            Swal.fire('Error', body.msg, 'error');
        }
        
    }
}

const login = (user) => ({
    type: Types.LOGIN,
    payload: user,
  });


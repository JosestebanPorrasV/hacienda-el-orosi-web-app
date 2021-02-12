import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { UseForm } from "../../hooks/UseForm";

import {
  collaboratorStartLoading
} from "../../actions/CollaboratorAction";

export const CollaboratorScreen = () => {
    const dispatch = useDispatch();

  const { collaborators, count } = useSelector(
    (state) => state.collaborator
  );

  
  useEffect(
    (page) => {
      dispatch(collaboratorStartLoading(1));
    },
    [dispatch]
  );
  return(
      <div>
          <h1>Esto es la vista de colaborador</h1>
          <br></br>
          <table>
        <thead>
          <tr>
            <th>Metros cuadrados</th>
            <th>Número de aparto</th>
          </tr>
        </thead>
        <tbody>
          {collaborators.map((item, index) => (
            <tr key={index}>
              <th>{item.name}</th>
              <th>{item.surname}</th>
              <th>{item.document_id}</th>
              <th>{item.direction}</th>
              <th>{item.cel}</th>
              <th>{item.tel}</th>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
  )
}

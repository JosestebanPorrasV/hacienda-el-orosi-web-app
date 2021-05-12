import React from 'react';

export const Report = ({ collaborator }) => {
  return (
    <>
      {collaborator ? (
        <table hidden={true} id="collaborator-table-to-xls">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Cedula</th>
              <th>Trabajo</th>
              <th>Nacionalidad</th>
              <th>Direccion</th>
              <th>Telefono #1</th>
              <th>Telefono #2</th>
              <th>Inicio de contrato</th>
              <th>Fin de contrato</th>
            </tr>
          </thead>
          <tbody>
            {collaborator.map((collaborator) => (
              <tr key={collaborator._id}>
                <td>{collaborator.name}</td>
                <td>{collaborator.surname}</td>
                <td>{collaborator.document_id}</td>
                <td>{collaborator.job.name}</td>
                <td>{collaborator.nationality}</td>
                <td>{collaborator.direction}</td>
                <td>{collaborator.tel}</td>
                <td>{collaborator.cel}</td>
                <td>{collaborator.date_admission}</td>
                <td>{collaborator.dispatch_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </>
  );
};

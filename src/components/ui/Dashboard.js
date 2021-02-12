import React from "react";

import { Link } from "react-router-dom";

export const Dashboard = () => {
  return (
    <div>
      <h1>Este es el menu principal</h1>


      <Link class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" to="/prestamos"> Ir prestamos </Link>

      <Link class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" to="/listar-administradores"> Ir Administradores </Link>

    </div>
  );
};

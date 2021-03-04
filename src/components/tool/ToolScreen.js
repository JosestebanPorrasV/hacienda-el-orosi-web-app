import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { tooltStartLoading } from "../../actions/ToolAction";
import SearchResults from "react-filter-search";

export const ToolScreen = () => {
  const dispatch = useDispatch();
  const { tools, count } = useSelector((state) => state.tool);

  useEffect(() => {
    dispatch(tooltStartLoading(1));
  }, [dispatch]);
  return (
    <>
      <div className="bg-green-700 rounded-lg px-4 lg:px-8 py-4 lg:py-6 mt-8 flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-12">
        <div>
          <h2>HERRAMIENTAS</h2>
          <p className="text-blue-100 opacity-70">
            Funcionalidades principales
          </p>
        </div>
        <nav className="md:flex md:space-x-4 space-y-2 md:space-y-0">
          <button className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-green-800 rounded-lg hover:bg-gray-800 w-35">
            <i className="fas fa-hand-holding-usd"></i>
            <span className="text-white font-bold">Agregar Herramienta</span>
          </button>
          <button className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-green-800 rounded-lg hover:bg-gray-800 w-35">
            <i className="fas fa-chart-line"></i>
            <span className="text-white font-bold">Listar activos</span>
          </button>
          <button className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-green-800 rounded-lg hover:bg-gray-800 w-35">
            <i className="fas fa-strikethrough"></i>
            <span className="text-white font-bold">Listar En Bodega</span>
          </button>
        </nav>
      </div>
    
      <div className="overflow-x-auto py-4">

        <div className="align-middle inline-block min-w-full overflow-hidden">
          <table id="table-tools" className="min-w-full">
            <thead className="bg-gray-600">
              <tr className="bg-gray-600 text-white text-lg">
                <th className="py-2 px-3">
                  <i className="fas fa-user"></i> Herramienta
                </th>
                <th className="py-2 px-3">
                  <i className="fas fa-id-card"></i> Codigo
                </th>
                <th className="py-2 px-3">
                  <i className="fas fa-funnel-dollar"></i> Fecha
                </th>
                <th className="py-2 px-3">
                  <i className="fas fa-comments-dollar"></i> Litros
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-grey-600 divide-solid text-blue-100 text-opacity-80 whitespace-nowrap">
              {tools.map((tool) => (
                <tr key={tool._id}>
                  <th className="py-3 px-3">{tool.name}</th>
                  <th className="py-3 px-3">{tool.active_num}</th>
                  <th className="py-3 px-3">{tool.date}</th>
                  <th className="py-3 px-3">{tool.liters}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
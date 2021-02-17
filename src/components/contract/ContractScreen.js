import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {contractStartLoading } from "../../actions/ContractAction";

export const ContractScreen = () => {
    const dispatch = useDispatch();
    const { contracts } = useSelector ((state) => state.contracts);

    useEffect(() => {
        dispatch(contractStartLoading());
    },[dispatch]);
    return (
        <div class = "main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">
         <div class="bg-gradient-to-b from-gray-300 to-gray-100 uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-5">
         <h5 class="font-bold uppercase text-gray-600">Contratos Realizados</h5>
         </div>
         <div class = "p-5">
        <table class="w-full p-5 text-gray-700">
            <thead class="justify-between">
            <tr class="bg-gray-800 text-gray-300">
                <th> Contrato Realizado Por el Administrador </th>
                <th> Nombre del Contraro </th>
                <th class="px-16 py-2"> ID del documento </th>
                <th class="px-16 py-2"> Fecha de contrato </th>
                <th class="px-16 py-2"> Dia de pago </th>
                <th class="px-16 py-2"> Describcion del trabajo </th>
                <th class="px-16 py-2"> Precio </th>
                <th class="px-16 py-2"> Telefono de contacto </th>
                <th class="px-16 py-2"> Correo electronico del contacto </th>

            </tr>
            </thead>
            <tbody class = "bg-gay-200">
              
            </tbody>
        </table>
         </div>
         </div>
    );
};
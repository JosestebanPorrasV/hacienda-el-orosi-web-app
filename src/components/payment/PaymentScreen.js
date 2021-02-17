import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { paymentStartLoading } from "../../actions/PaymentAction";

export const PaymentScreen = () => {
 const dispatch = useDispatch();
 const { payments, count } =useSelector ((state) => state.payment);

 useEffect(() => {
     dispatch(paymentStartLoading(1));
 },[dispatch]);
 return(
     <div className = "main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">
         <div className="bg-gradient-to-b from-gray-300 to-gray-100 uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-5">
         <h5 className="font-bold uppercase text-gray-600">Pagos realizados</h5>
         </div>
         <div className = "p-5">
        <table className="w-full p-5 text-gray-700">
            <thead className="justify-between">
            <tr className="bg-gray-800 text-gray-300">
                <th>Pago Realizado Por el Administrador</th>
                <th>Colaborador</th>
                <th className="px-16 py-2"> Fecha de pago</th>
                <th className="px-16 py-2"> Salario neto</th>
                <th className="px-16 py-2"> Salario final</th>
                <th className="px-16 py-2"> Detalles</th>
            </tr>
            </thead>
            <tbody className = "bg-gay-200">
              
            </tbody>
        </table>
         </div>
         </div>
 );
};
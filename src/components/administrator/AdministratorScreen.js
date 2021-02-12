import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import{
    administratorStartLoading
} from '../../actions/AdministratorAction';

export const AdministratorScreen = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(administratorStartLoading());
      }, [dispatch]);
    return(
        <div>
            <h1>Esta es la vista de Administradorees perro</h1>
        </div>
        )
}
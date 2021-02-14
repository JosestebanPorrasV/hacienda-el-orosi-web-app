import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { lendStartLoading } from "../../actions/LendAction";

export const LendScreen = () => {
  const dispatch = useDispatch();

  const { lends, count } = useSelector((state) => state.lend);

  useEffect(() => {
    dispatch(lendStartLoading(1));
  }, [dispatch]);
  return (
    <div>
      <h1>Esta es la vista de prestamos perro</h1>
    </div>
  );
};

import React, { useEffect, useCallback } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";

import * as actions from "../../../store/actions/index";

const Logout = () => {
  
  const dispatch = useDispatch();
  const onLogout =  useCallback(() => dispatch(actions.logout()),[dispatch]);

  useEffect(() => {
    onLogout();
  }, [onLogout]);

  return <Redirect to="/" />;
};

export default Logout;

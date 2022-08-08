import React, { useEffect } from "react";

const Alert = ({ type, msg, remAlert, list }) => {
    
  useEffect(() => {
    const pause = setTimeout(() => {
      remAlert();
    }, 2000);
    return () => clearTimeout(pause);
  }, [list, remAlert]);
  return <p className={`alert alert-${type}`}> <strong>{msg}</strong> </p>;
};
export default Alert;

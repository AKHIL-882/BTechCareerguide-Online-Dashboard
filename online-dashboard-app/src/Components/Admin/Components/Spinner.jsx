import React from "react";
import CLipLoader from "react-spinners/ClipLoader";

const override={
display:'block',
margin:'0'
}

const Spinner = ({loading,color,size}) => {
  return (
    <CLipLoader
    color={color}
    loading={loading}
    cssOverride={override}
    size={size}
    />
  );
};

export default Spinner;

import React from "react";

const FormContainer = ({ children }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center sm:flex-row">
        {children}
      </div>
    </>
  );
};

export default FormContainer;

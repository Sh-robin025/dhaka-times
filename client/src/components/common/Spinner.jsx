import React from "react";
import loader from "../../assets/spinner.gif";

const Spinner = () => (
  <div className="flex justify-center mt-10">
    <div className="animate-spin rounded-full h-36 w-36 border-t-3 border-b-2 border-primary">
      <img src={loader} alt="" className="mx-auto h-full" />
    </div>
  </div>
);

export default Spinner;

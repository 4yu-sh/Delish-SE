import React from "react";
import { FcLike, FcBiohazard, FcLikePlaceholder } from "react-icons/fc";

const Freshness = ({ value }) => {
  return (
    <div className="m-1">
      <span>
        {value <= "2" ? (
          <FcLike />
        ) : value > "2" && value <= "4" ? (
          <FcLikePlaceholder />
        ) : (
          <FcBiohazard />
        )}
      </span>
    </div>
  );
};

export default Freshness;

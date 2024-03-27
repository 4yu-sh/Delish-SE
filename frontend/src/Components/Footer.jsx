import React from "react";
import Delishinfo from "./Delishinfo";
import Footerquote from "./Footerquote";
import Sociallinks from "./Sociallinks";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="bg-grad">
      <Delishinfo />
      <Footerquote />
      <Sociallinks />
      <div className=" flex justify-between p-5">
        <div>
          <a>T & C*</a>
        </div>
        <div>
          <a href="https://originxchaos.com">
            originxchaos &copy; {currentYear}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;

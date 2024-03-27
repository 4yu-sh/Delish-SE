import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Sociallinks = () => {
  return (
    <>
      <div className="w-48 m-auto gap-3  grid grid-flow-col-dense grid-cols-4 ">
        <Link to="https://www.facebook.com" target="_blank">
          <FaFacebookF className="text-3xl" />
        </Link>
        <Link to="https://www.instagram.com" target="_blank">
          <FaInstagram className="text-3xl" />
        </Link>
        <Link to="https://www.youtube.com" target="_blank">
          <FaYoutube className="text-3xl" />
        </Link>
        <Link to="https://www.tiktok.com" target="_blank">
          <FaTiktok className="text-3xl" />
        </Link>
      </div>
    </>
  );
};

export default Sociallinks;

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const Searchbox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword);

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      setKeyword(); //this isnt working

      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <form onSubmit={submitHandler} className="flex">
      <input
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        className="p-2 rounded-l-md border border-r-0"
        placeholder="Search Products..."
      ></input>
      <button
        type="submit"
        className="p-2 bg-yellow-500 text-white rounded-r-md border border-l-0"
      >
        <FaSearch />
      </button>
    </form>
  );
};

export default Searchbox;

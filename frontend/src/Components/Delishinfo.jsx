import React from "react";

const DelishInfo = () => {
  return (
    <div>
      <div className="grid grid-flow-col grid-cols-3 gap-24 align-top justify-center place-items-center">
        <div>
          <ul className="font-sub text-lg">
            <span className="font-heading ">Delish</span>
            <li>
              <a>Return Policy</a>
            </li>
            <li>
              <a>Sources</a>
            </li>
            <li>
              <a>Farmer's Story</a>
            </li>
            <li>
              <a>About Us</a>
            </li>
          </ul>
        </div>
        <div>
          <ul className="font-sub text-lg px-10">
            <span className="font-heading ">Contact</span>
            <li>
              <a>Customer Care</a>
            </li>
            <li>
              <a>Feedback</a>
            </li>
            <li>
              <a>Become A Seller</a>
            </li>
          </ul>
        </div>
        <div>
          <ul className="font-sub text-lg px-10">
            <span className="font-heading ">Delish Aid</span>
            <li>
              <a>Delish Foundation</a>
            </li>
            <li>
              <a>Donations</a>
            </li>
            <li>
              <a>Share Skill</a>
            </li>
            <li>
              <a>Collaboration</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DelishInfo;

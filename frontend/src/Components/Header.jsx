import React, { useEffect, useState } from "react";
import nameLogo from "../Assets/Images/nameLogo.png";
import { LinkContainer } from "react-router-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";

const Header = () => {
  const [isSticky, setSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = (
    <>
      <li>
        <details>
          <summary>Vegetables</summary>
          <ul>
            <li>
              <Link to="/seasonal-vegetables">Season</Link>
            </li>
            <li>
              <Link to="/offseasonal-vegetables">Off-Season</Link>
            </li>
          </ul>
        </details>
      </li>

      <li href="/meat">
        <details>
          <summary>Meat</summary>
          <ul className="p-2">
            <li>
              <Link to="/white-meat">White</Link>
            </li>
            <li>
              <Link to="/red-meat">Red</Link>
            </li>
          </ul>
        </details>
      </li>
      <li href="/fruits">
        <details>
          <summary>Fruits</summary>
          <ul className="p-2">
            <li>
              <Link to="/seasonal-fruits">Seasonal</Link>
            </li>
            <li>
              <Link to="/tropical-fruits">Tropical</Link>
            </li>
            <li>
              <Link to="/exotic-fruits">Exotic</Link>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <Link to="/dairy">Dairy</Link>
      </li>
    </>
  );

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(cartItems);
  const logoutHandler = async () => {
    // console.log("Logout");
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <header className="max-w-screen-2xl container mx-auto fixed top-0 right-0 left-0 transition-all duration-500 ease-in-out z-10 bg-yellow">
        <div
          className={`navbar xl:px-6 ${
            isSticky
              ? "shadow-md transition-all duration-500 ease-in-out bg-yellow"
              : ""
          }`}
        >
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {navItems}
              </ul>
            </div>
            <Link to="/">
              <img src={nameLogo} />
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navItems}</ul>
          </div>
          <div className="navbar-end">
            <div className="flex gap-2">
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Search"
                  className="input input-bordered w-24 md:w-auto"
                />
              </div>

              <div className="flex-none">
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle"
                  >
                    <div className="indicator">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      {cartItems.length > 0 && (
                        <span className="badge badge-sm indicator-item">
                          {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div
                    tabIndex={0}
                    className="mt-3 z-[1] p-2 card card-compact dropdown-content w-52 bg-base-100 shadow"
                  >
                    <span className="font-bold text-sm  ">
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)} Item
                    </span>
                    <span className="text-info">
                      Subtotal: NRS{" "}
                      {cartItems.reduce(
                        (acc, item) => acc + item.qty * item.price,
                        0
                      )}
                    </span>
                    <div className="card-actions">
                      <LinkContainer to="/cart">
                        <button className="btn btn-primary btn-block">
                          View cart
                        </button>
                      </LinkContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {userInfo ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="p-1 btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <FaUserCircle className="text-4xl" />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link to="/profile" className="justify-between">
                      Profile
                      <span className="badge">2</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="settings">Settings</Link>
                  </li>
                  <li>
                    <div onClick={logoutHandler}>Logout</div>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="btn btn-ghost">
                {" "}
                Login{" "}
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

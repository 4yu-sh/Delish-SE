import React, { useEffect } from "react";
import FormContainer from "../Components/FormContainer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Loader from "../Components/Loader";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <div className="bg-grad">
        <FormContainer>
          <div className="w-96 m-auto my-36 ">
            <h1 className="text-3xl font-bold text-center">Sign up</h1>
            <form onSubmit={submitHandler}>
              <div className="mb-3">
                <label
                  htmlFor="name"
                  className="block text-lg font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  id="name"
                  placeholder="Enter Name"
                  value={name}
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="block text-lg font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="email"
                  placeholder="Enter Email"
                  value={email}
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="password"
                  className="block text-lg font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  value={password}
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="password"
                  className="block text-lg font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  id="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 mt-2 text-lg font-medium text-white bg-amber-500 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                disabled={isLoading}
              >
                Login
              </button>
              {isLoading && <Loader />}
            </form>
            <div>
              <p className="text-center mt-3">
                Already Have an Account?{" "}
                <Link
                  to={redirect ? `/login?redirect=${redirect}` : "/login"}
                  className="text-indigo-500"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </FormContainer>
      </div>
    </>
  );
};

export default RegisterScreen;

import React, { useEffect } from "react";
import FormContainer from "../Components/FormContainer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Loader from "../Components/Loader";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
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
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <div className="bg-grad">
        <FormContainer>
          <div className="w-96 m-auto my-56 ">
            <h1 className="text-3xl font-bold text-center">Login</h1>
            <form onSubmit={submitHandler}>
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
                New Customer?{" "}
                <Link
                  to={redirect ? `/register?redirect=${redirect}` : "/register"}
                  className="text-indigo-500"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </FormContainer>
      </div>
    </>
  );
};

export default LoginScreen;

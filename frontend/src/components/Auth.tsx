import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signinInput, signupInput } from "@jayaspackages/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Spinner } from "./Spinner";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  function resetInputs() {
    setPostInputs({
      name: "",
      email: "",
      password: "",
    });
  }

  async function sendRequest() {
    try {
      const { success } =
        type === "signup"
          ? signupInput.safeParse(postInputs)
          : signinInput.safeParse(postInputs);
      if (!success) {
        alert("Please enter valid inputs");
        resetInputs();
        return;
      }
      setLoading(true);
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
      const jwt = response.data.jwt;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (e) {
      alert("Error while signing in: " + e?.response?.data?.message);
      resetInputs();
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col">
      {loading && (
        <div className="flex justify-center pb-10">
          <Spinner />
        </div>
      )}
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-3xl font-extrabold">Create an account</div>
            <div className="text-slate-500">
              {type === "signin"
                ? "Don't have an account?"
                : "Already have an account?"}
              <Link
                className="pl-2 underline"
                to={type === "signin" ? "/signup" : "/signin"}
              >
                {type === "signin" ? "Sign up" : "Sign in"}
              </Link>
            </div>
          </div>
          <div className="pt-8">
            {type === "signup" ? (
              <LabelledInput
                id="name"
                label="Name"
                placeholder="Username"
                value={postInputs.name}
                onChange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    name: e.target.value,
                  });
                }}
              />
            ) : null}
            <LabelledInput
              id="email"
              label="Email"
              placeholder="username@gmail.com"
              value={postInputs.email}
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  email: e.target.value,
                });
              }}
            />
            <LabelledInput
              id="password"
              label="Password"
              type={"password"}
              placeholder="123456"
              value={postInputs.password}
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  password: e.target.value,
                });
              }}
            />
            <button
              onClick={(e) => {
                sendRequest();
                e.currentTarget.blur();
              }}
              type="button"
              className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              {type === "signup" ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputType {
  id: string;
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  type?: string;
}

function LabelledInput({
  id,
  label,
  placeholder,
  onChange,
  value,
  type,
}: LabelledInputType) {
  return (
    <div>
      <label className="block mb-2 text-sm text-black font-semibold pt-4">
        {label}
      </label>
      <input
        onChange={onChange}
        value={value}
        type={type || "text"}
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
}

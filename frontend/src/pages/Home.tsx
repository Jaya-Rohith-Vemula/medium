import { Blogs } from "./Blogs";
import { Signin } from "./Signin";

export const Home = () => {
  return localStorage.getItem("token") ? <Blogs /> : <Signin />;
};

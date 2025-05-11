import { Link, useNavigate } from "react-router-dom";

export const Appbar = () => {
  const navigate = useNavigate();
  return (
    <div className="border-b flex justify-between px-10 py-4">
      <Link
        to={"/blogs"}
        className="flex flex-col justify-center cursor-pointer"
      >
        Pen Pulse
      </Link>
      <div>
        <Link to={`/publish`}>
          <button
            type="button"
            className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 "
          >
            New
          </button>
        </Link>

        <button
          type="button"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/signin");
          }}
          className="mr-4 text-white bg-gray-600 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 "
        >
          Logout
        </button>
      </div>
    </div>
  );
};

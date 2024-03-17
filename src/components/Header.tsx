import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="min-h-[60px] bg-black flex items-center justify-center px-4">
        <div className="max-w-[1320px] w-full flex">
          <div
            className="text-white cursor-pointer"
            onClick={() => navigate("/")}
          >
            Voors Pizzaria
          </div>
          <ul className="text-white flex-1 hidden justify-end pr-3  sm:flex">
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;

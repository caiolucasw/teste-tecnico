import "./App.css";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="flex justify-center flex-col min-h-[100vh]">
      <Header />
      <div className="pt-3 max-w-[1320px] flex-1 lg:mx-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default App;

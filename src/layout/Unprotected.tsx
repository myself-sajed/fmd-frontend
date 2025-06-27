import { Outlet } from "react-router-dom";

const Unprotected = () => {
    return (
        <div className="min-h-screen">
            <Outlet />
        </div>
    );
};

export default Unprotected;

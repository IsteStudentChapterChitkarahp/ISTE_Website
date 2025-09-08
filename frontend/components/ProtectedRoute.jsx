import { useContext } from "react";
import { UserContext } from "../utils/UserContext";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = ({component}) => {
    const navigate = useNavigate();
    const {role} = useContext(UserContext);
    
    if(!role) return <Navigate to="/" replace />;

    return component;
};

export default ProtectedRoute;

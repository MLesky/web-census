import { createBrowserRouter } from "react-router-dom"
import { Navbar } from "./components";
import { routeNames } from "./constants";
import { MainDashboard, RegisterPage } from "./pages";

const routes = createBrowserRouter([
    {
        path: routeNames.register,
        element: <RegisterPage />
    },

    {
        path: routeNames.dashboard,
        element: <Navbar />,
        children: [
            {
                path: '',
                element: <MainDashboard />
            }
        ]
    },

    {
        path: routeNames.error,
        element: <div>ErrorPage</div>
    }
]);

export default routes;
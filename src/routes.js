import Login from "./authenticate/login";
import { createBrowserRouter } from "react-router-dom"
import { Navbar } from "./components";
import { routeNames } from "./constants";
import { Divisions, ErrorPage, MainDashboard, People, Regions, RegisterPage, SubDivisions } from "./pages";

const routes = createBrowserRouter([
    {
        path: routeNames.register,
        element: <RegisterPage />
    },

    {
        path: routeNames.login,
        element: <Login />
    },

    {
        path: '',
        element: <Navbar />,
        children: [
            {
                path: routeNames.dashboard,
                element: <MainDashboard />
            },
            {
                path: routeNames.region,
                element: <Regions />
            },
            {
                path: routeNames.divisions,
                element: <Divisions />
            },
            {
                path: routeNames.subDivisions,
                element: <SubDivisions />
            },
            {
                path: routeNames.people,
                element: <People />
            }

        ]
    },

    {
        path: routeNames.error,
        element: <ErrorPage />
    }
]);

export default routes;
import { createBrowserRouter } from "react-router-dom"
import { Navbar } from "./components";
import { routeNames } from "./constants";
import { RegisterPage } from "./pages";

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
                element: <div>Hello There</div>
            }
        ]
    },

    {
        path: routeNames.error,
        element: <div>ErrorPage</div>
    }
]);

export default routes;
import Home from "../views/Home";
import BookDetail from "../views/BookDetail";
import TypePage from "../views/TypePage";
import ReadPage from "../views/ReadPage";
import Mine from "../views/Mine";
import Login from '../views/Login'

export default [
    { path: "/home", Component: Home },
    { path: "/detail", Component: BookDetail },
    { path: "/type", Component: TypePage },
    { path: "/readPage", Component: ReadPage },
    { path: "/login", Component: Login },
    { path: "/mine", Component: Mine, loginRequired: true }
];

import Home from "../views/Home";
import BookDetail from "../views/BookDetail";
import TypePage from "../views/TypePage";
import ReadPage from "../views/ReadPage";

export default [
    { path: "/home", Component: Home },
    { path: "/detail", Component: BookDetail },
    { path: "/type", Component: TypePage },
    { path: "/readPage", Component: ReadPage }
];

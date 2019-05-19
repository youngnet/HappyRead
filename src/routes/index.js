import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    Redirect
} from "react-router-dom";
import { getNavList } from "../api/home";
import Home from "../views/Home";
import BookDetail from "../views/BookDetail";
import TypePage from "../views/TypePage";
import NavList from "../components/NavList";
import ScrollToTop from "../components/ScrollToTop";


export default function MyRoute() {
    const [navList, setNavList] = useState([]);

    const fetchNav = async () => {
        let res = await getNavList();
        setNavList(res.data);
    };

    useEffect(() => {
        fetchNav();
        return () => {};
    }, []);
    return (
        <Router>
            <ScrollToTop>
                <NavList navList={navList} />
                <Switch>
                    <Route exact path='/home' component={Home} />
                    {/* <Route exact path='/home/:link' component={Home} /> */}
                    <Route path='/detail' component={BookDetail} />
                    <Route path='/type' component={TypePage} />
                    <Redirect to='/home' />
                </Switch>
            </ScrollToTop>
        </Router>
    );
}

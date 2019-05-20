import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";
import { getNavList } from "../api/home";
import routerList from "./router";
import NavList from "../components/NavList";
import ScrollToTop from "../components/ScrollToTop";
import { getQuery } from "../utils/utils";

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
                    {routerList.map((RouterInfo, index) => {
                        return (
                            <Route
                                exact
                                key={index}
                                path={RouterInfo.path}
                                component={props => (
                                    <RouterInfo.Component
                                        {...props}
                                        query={getQuery(props.location.search)}
                                    />
                                )}
                            />
                        );
                    })}
                    {/* <Route
                        exact
                        path='/home'
                        component={props => (
                            <Home
                                {...props}
                                query={getQuery(props.location.search)}
                            />
                        )}
                    /> */}
                    {/* <Route exact path='/home/:link' component={Home} /> */}
                    <Redirect to='/home' />
                </Switch>
            </ScrollToTop>
        </Router>
    );
}

import React, { useState, useEffect } from "react";
import {
    HashRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";
import routerList from "./router";
import NavList from "../components/NavList";
import ScrollToTop from "../components/ScrollToTop";
import { getQuery } from "../utils/utils";

export default function MyRoute() {
    const [data, setData] = useState(undefined);
    useEffect(() => {
        console.log(data);
        setData(1);
    }, [data]);
    return (
        <Router>
            <ScrollToTop>
                <NavList />
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

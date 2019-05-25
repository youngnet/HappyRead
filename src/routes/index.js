import React, { useState, useEffect, useReducer } from "react";
import { getUserInfo } from "../api/auth";
import * as TYPES from "../store/constants";
import reducer from "../store/user";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import routerList from "./router";
import NavList from "../components/NavList";
import ScrollToTop from "../components/ScrollToTop";
import { getQuery } from "../utils/utils";
import history from "./history";
export const myContext = React.createContext(null);

export default function MyRoute() {
    const [user, dispatch] = useReducer(reducer,{});

    useEffect(() => {
        async function fetchUser() {
            let res = await getUserInfo();
            if (res.cd == 0) {
                dispatch({ type: TYPES.ADD_USER_INFO, user: res.data });
            }
        }
        fetchUser();
        return () => {};
    }, []);

    return (
        <Router history={history}>
            <myContext.Provider value={{ user, dispatch }}>
                <ScrollToTop>
                    <NavList />
                    <Switch>
                        {routerList.map((RouterInfo, index) => {
                            return (
                                <Route
                                    exact
                                    key={index}
                                    path={RouterInfo.path}
                                    component={props => {
                                        if (
                                            RouterInfo.path === "/login" &&
                                            user.id
                                        ) {
                                            props.history.replace("/home");
                                        }
                                        return (
                                            <RouterInfo.Component
                                                {...props}
                                                query={getQuery(
                                                    props.location.search
                                                )}
                                                // userInfo={user}
                                            />
                                        );
                                    }}
                                />
                            );
                        })}
                        <Redirect to='/home' />
                    </Switch>
                </ScrollToTop>
            </myContext.Provider>
        </Router>
    );
}

// export default class MyRoute extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { a: 1 };
//     }
//     componentDidMount() {
//         this.setState({ a: 2 });
//     }

//     render() {
//         return (
//             <Router history={history}>
//                 <ScrollToTop>
//                     <NavList />
//                     <Switch>
//                         {routerList.map((RouterInfo, index) => {
//                             return (
//                                 <Route
//                                     exact
//                                     key={index}
//                                     path={RouterInfo.path}
//                                     component={props => (
//                                         <RouterInfo.Component
//                                             {...props}
//                                             query={getQuery(
//                                                 props.location.search
//                                             )}
//                                         />
//                                     )}
//                                 />
//                             );
//                         })}
//                         <Redirect to='/home' />
//                     </Switch>
//                 </ScrollToTop>
//             </Router>
//         );
//     }
// }

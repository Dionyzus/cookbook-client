import React from "react";
import { Switch } from "react-router-dom";
import { routes as applicationRoutes } from "./applicationRoutes";
import Route, { RouteProps } from "./route";

const routes: Array<RouteProps> = [...applicationRoutes];

export default function ApplicationRouter() {
    return (
        <Switch>
            {routes.map((route) => (
                <Route key={route.path} {...route} />
            ))}
        </Switch>
    );
}
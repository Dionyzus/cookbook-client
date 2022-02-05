import React from "react";
import { Route as RRoute } from "react-router-dom";
import { RouteComponentProps } from "react-router";

export interface RouteProps {
    path: string;
    exact?: boolean;
    Component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
    Layout?: React.ComponentType<any>;
}

function Route({ Component, Layout, ...rest }: RouteProps) {

    const route = (
        <RRoute {...rest} render={(props) => <Component {...props} />} />
    );

    if (Layout) {
        return <Layout>{route}</Layout>;
    }
    return route;
}

export default React.memo(Route);
import React, { ReactNode } from "react";
import ApplicationHeader from "./applicationHeader";

interface IProps {
    children: ReactNode;
}

export default function Layout(props: IProps) {
    return (
        <>
            <div>
                <ApplicationHeader />
            </div>
            <div>
                {props.children}
            </div>
        </>
    );
}
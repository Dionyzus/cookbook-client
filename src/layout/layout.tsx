import React, { ReactNode } from "react";
import ApplicationHeader from "./applicationHeader";

import styles from "../styles/content.module.css";

interface IProps {
    children: ReactNode;
}

export default function Layout(props: IProps) {
    return (
        <>
            <ApplicationHeader />
            <main className={styles.container}>

                <div className={styles.wrapper}>
                    {props.children}
                </div>
            </main>
        </>
    );
}
import React from 'react';
import { useHistory } from 'react-router';

import styles from "../../../styles/table.module.css";
import contentStyles from "../../../styles/content.module.css";

export default function Home() {

    const history = useHistory();

    return (
        <div>
            <header className={contentStyles.text}>Welcome to the cookbook. Here you can find variety of recipes to make your lunch, dinner or desert.</header>

            <div style={{ textAlign: "center" }}>
                <button className={styles.button} onClick={() => history.push("/recipes")}
                    color="primary">View Recipe Collection
                </button>
            </div>
        </div>
    )
}
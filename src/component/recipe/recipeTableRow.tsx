import React from "react";
import { IAction } from "../../interface/IAction";
import { IRecipe } from "../../interface/IRecipe";

import styles from "../../styles/table.module.css";

interface IProps {
    index: number | null;
    element: IRecipe;
    actions: IAction[];
}

export default function RecipeTableRow(props: IProps) {

    const { index, element, actions } = props;
    return (
        <>
            <td className={styles.tableCell}>{index}</td>
            <td className={styles.tableCell}>{element.name}</td>
            <td className={styles.tableCell}>{element.description}</td>

            {actions != null && actions.map((el: IAction, index: number) =>
                <td className={styles.tableCell} key={index}>
                    <button className={styles.button} onClick={() => actions[index].action(element)}
                        color="primary"
                    >{actions[index].actionName}</button>
                </td>
            )}
        </>
    );
}
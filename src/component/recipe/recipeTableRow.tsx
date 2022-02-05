import React from "react";
import { IAction } from "../../interface/IAction";
import { IRecipe } from "../../interface/IRecipe";

interface IProps {
    index: number | null;
    element: IRecipe;
    actions: IAction[];
}

export default function RecipeTableRow(props: IProps) {

    const { index, element, actions } = props;
    return (
        <>
            <td>{index}</td>
            <td>{element.name}</td>
            <td>{element.ingredients}</td>
            <td>{element.description}</td>

            {actions != null && actions.map((el: IAction, index: number) =>
                <td key={index}>
                    <button onClick={() => actions[index].action(element)}
                        color="primary"
                    >{actions[index].actionName}</button>
                </td>
            )}
        </>
    );
}
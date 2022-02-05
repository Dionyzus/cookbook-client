import React from "react";
import { IAction } from "../../interface/IAction";
import { IRecipe } from "../../interface/IRecipe";

interface IProps {
    element: IRecipe;
    actions: IAction[];
}

export default function RecipeDetails(props: IProps) {

    const { element, actions } = props;
    return (
        <>
            <div>Name: {element.name}</div>
            <div>Ingredients: {element.ingredients}</div>
            <div>Description: {element.description}</div>

            <div>
                {actions != null && actions.map((el: IAction, index: number) =>
                    <div key={index}>
                        <button onClick={() => actions[index].action(element)}
                            color="primary"
                        >{actions[index].actionName}</button>
                    </div>
                )}
            </div>
        </>
    );
}
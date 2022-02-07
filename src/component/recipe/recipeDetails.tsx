import React from "react";
import { IAction } from "../../interface/IAction";
import { IIngredient } from "../../interface/IIngredient";
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
            <div>Ingredients:
                {element.ingredients != null && element.ingredients.map((el: IIngredient, index: number) =>
                    <div key={index}>
                        <div>{el.ingredient}</div>
                        <div>{el.amount.value} {el.amount.unit}</div>
                    </div>
                )}
            </div>
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
import React from "react";
import { IAction } from "../../interface/IAction";
import { IIngredient } from "../../interface/IIngredient";
import { IRecipe } from "../../interface/IRecipe";

import tableStyles from "../../styles/table.module.css";
import contentStyles from "../../styles/content.module.css";

interface IProps {
    element: IRecipe;
    actions: IAction[];
}

export default function RecipeDetails(props: IProps) {

    const { element, actions } = props;
    return (
        <div className={contentStyles.box}>
            <h5 className={contentStyles.name}>{element.name}</h5>
            <h6 className={contentStyles.listTitle}>Ingredients:</h6>
            <div className={contentStyles.textarea}>
                {element.ingredients != null && element.ingredients.map((el: IIngredient, index: number) =>
                    <div key={index}>
                        <div>{el.ingredient}: {el.amount.value} {el.amount.unit}</div>
                    </div>
                )}
            </div>
            <h6 className={contentStyles.listTitle}>Description:</h6>
            <section className={contentStyles.textarea}>{element.description}</section>

            <div className={contentStyles.textarea}>
                {actions != null && actions.map((el: IAction, index: number) =>
                    <div key={index}>
                        <button className={tableStyles.button} onClick={() => actions[index].action(element)}
                            color="primary"
                        >{actions[index].actionName}</button>
                    </div>
                )}
            </div>
        </div>
    );
}
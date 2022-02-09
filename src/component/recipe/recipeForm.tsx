import React, { useState } from "react";
import { IIngredient } from "../../interface/IIngredient";
import { IRecipe } from "../../interface/IRecipe";
import { isNullOrEmpty } from "../../util/stringUtil";
import IngredientForm from "../ingredient/ingredientForm";

import tableStyles from "../../styles/table.module.css";
import formStyles from "../../styles/form.module.css";

interface IProps {
    element: IRecipe;
    onSubmitHandler: (event: React.FormEvent<HTMLFormElement>, recipe: IRecipe) => void;
    onChangeHandler: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onIngredientChangeHandler: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => void;
    onIngredientAmountChangeHandler: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => void;
    submitText: string;
}

export default function RecipeForm(props: IProps) {

    const { element, onSubmitHandler, onChangeHandler, onIngredientChangeHandler, onIngredientAmountChangeHandler, submitText } = props;
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [ingredient, setIngredient] = useState<IIngredient>(
        {
            ingredient: "",
            amount: {
                value: "",
                unit: "g"
            }
        }
    );

    function handleSubmit() {
        if (isNullOrEmpty(element.ingredients[currentIndex].ingredient) || isNullOrEmpty(element.ingredients[currentIndex].amount.value)) {
            return;
        }
        element.ingredients.push(ingredient);
        const newIngredient = {
            ingredient: "",
            amount: {
                value: "",
                unit: "g"
            }
        };
        setCurrentIndex(element.ingredients.length - 1);
        setIngredient(newIngredient);
    }

    function handleChange(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) {
        onIngredientChangeHandler(event, index);
    }


    function handleIngredientAmountChange(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) {
        onIngredientAmountChangeHandler(event, index);
    }

    return (
        <div className={formStyles.formBox}>
            <h5 className={formStyles.formName}>Recipe</h5>
            <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => onSubmitHandler(event, element)}>
                <div>
                    <label className={formStyles.label}>
                        Name
                        <input
                            className={formStyles.input}
                            id="name"
                            type="text"
                            name="name"
                            value={element.name}
                            onChange={onChangeHandler}
                        />
                    </label>
                </div>
                <div>
                    <label className={formStyles.label}>Ingredients</label>
                    <table className={tableStyles.table}>
                        <thead className={tableStyles.tableRowHeader}>
                            <tr>
                                <th className={tableStyles.tableHeader}>#</th>
                                <th className={tableStyles.tableHeader}>Name</th>
                                <th className={tableStyles.tableHeader}>Amount</th>
                                <th className={tableStyles.tableHeader}>Unit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {element.ingredients != null && element.ingredients.map((el: IIngredient, index: number) =>
                                <tr className={tableStyles.tableRowItems} key={index}>
                                    <IngredientForm element={element} onChangeHandler={handleChange}
                                        onAmountChangeHandler={handleIngredientAmountChange} index={index}></IngredientForm>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className={tableStyles.tableFooter}>
                        <button className={tableStyles.button} type="button" onClick={() => handleSubmit()}>Add Another</button>
                    </div>
                </div>
                <div>
                    <label className={formStyles.label}>
                        Description
                        <textarea
                            className={formStyles.textarea}
                            id="description"
                            name="description"
                            value={element.description}
                            onChange={onChangeHandler}
                        />
                    </label>
                </div>
                <input className={tableStyles.button} type="submit" value={submitText || "submit"} />
            </form>
        </div>
    )
}
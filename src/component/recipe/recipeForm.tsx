import React, { useState } from "react";
import { IIngredient } from "../../interface/IIngredient";
import { IRecipe } from "../../interface/IRecipe";
import { isNullOrEmpty } from "../../util/stringUtil";
import IngredientForm from "../ingredient/ingredientForm";

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
            ingredientName: "",
            amount: {
                value: "",
                unit: "g"
            }
        }
    );

    function handleSubmit() {
        if (isNullOrEmpty(element.ingredients[currentIndex].ingredientName) || isNullOrEmpty(element.ingredients[currentIndex].amount.value)) {
            return;
        }
        element.ingredients.push(ingredient);
        const newIngredient = {
            ingredientName: "",
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
        <>
            <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => onSubmitHandler(event, element)}>
                <div>
                    <label style={{ display: "block" }}>Recipe
                        <input
                            style={{ display: "block" }}
                            id="name"
                            type="text"
                            name="name"
                            value={element.name}
                            onChange={onChangeHandler}
                        />
                    </label>
                </div>
                <div>
                    Ingredients
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Amount</th>
                                <th>Unit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {element.ingredients != null && element.ingredients.map((el: IIngredient, index: number) =>
                                <tr key={index}>
                                    <IngredientForm element={element} onChangeHandler={handleChange}
                                        onAmountChangeHandler={handleIngredientAmountChange} index={index}></IngredientForm>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <button type="button" onClick={() => handleSubmit()}>add</button>
                </div>
                <div>
                    <label style={{ display: "block" }}>
                        Description

                        <textarea
                            style={{ display: "block" }}
                            id="description"
                            name="description"
                            value={element.description}
                            onChange={onChangeHandler}
                        />
                    </label>
                </div>
                <input type="submit" value={submitText || "submit"} />
            </form>
        </>
    )
}
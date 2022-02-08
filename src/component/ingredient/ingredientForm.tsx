import React from "react";
import { IRecipe } from "../../interface/IRecipe";

interface IProps {
    element: IRecipe;
    onChangeHandler: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => void;
    onAmountChangeHandler: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => void;
    index: number;
}

export default function IngredientForm(props: IProps) {

    const { element, onChangeHandler, onAmountChangeHandler, index } = props;
    const unitChoices = ["g", "kg", "ml", "l", "num"];

    return (
        <>
            <td>{index}</td>
            <td>
                <input
                    id="ingredient"
                    type="text"
                    name="ingredient"
                    value={element.ingredients[index].ingredient}
                    onChange={(event: any) => onChangeHandler(event, index)}
                />
            </td>
            <td>
                <input
                    id="value"
                    type="number"
                    name="value"
                    value={element.ingredients[index].amount?.value}
                    onChange={(event: any) => onAmountChangeHandler(event, index)}
                />
            </td>
            <td>
                <select
                    id="unit"
                    name="unit"
                    onChange={(event: any) => onAmountChangeHandler(event, index)}
                    value={element.ingredients[index].amount?.unit || "g"}>
                    {unitChoices.map((el: string, i: number) =>
                    (<option key={i}
                        value={el}>{el}</option>
                    ))
                    }
                </select>
            </td>
        </>
    )
}
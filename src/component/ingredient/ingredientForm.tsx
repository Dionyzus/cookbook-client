import React from "react";
import { IRecipe } from "../../interface/IRecipe";

import tableStyles from "../../styles/table.module.css";
import selectStyles from "../../styles/select.module.css";
import formStyles from "../../styles/form.module.css";

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
            <td className={tableStyles.tableCell}>{index}</td>
            <td className={tableStyles.tableCell}>
                <input
                    className={formStyles.inputTable}
                    id="ingredient"
                    type="text"
                    name="ingredient"
                    value={element.ingredients[index].ingredient}
                    onChange={(event: any) => onChangeHandler(event, index)}
                />
            </td>
            <td className={tableStyles.tableCell}>
                <input
                    className={formStyles.inputTable}
                    id="value"
                    type="number"
                    name="value"
                    value={element.ingredients[index].amount?.value}
                    onChange={(event: any) => onAmountChangeHandler(event, index)}
                />
            </td>
            <td className={tableStyles.tableCell}>
                <div className={selectStyles.select}>
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
                </div>
            </td>
        </>
    )
}
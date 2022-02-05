import React from "react";
import { IRecipe } from "../../interface/IRecipe";

interface IProps {
    element: IRecipe;
    handleOnSubmit: (event: React.FormEvent<HTMLFormElement>, recipe: IRecipe) => void;
    handleOnChange: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}


export default function RecipeForm(props: IProps) {

    const { element, handleOnSubmit: submitAction, handleOnChange: changeAction } = props;

    return (
        <>
            <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => submitAction(event, element)}>
                <label>Name:
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={element.name}
                        onChange={changeAction}
                    />
                </label>
                <label>Ingredients:
                    <textarea
                        id="ingredients"
                        name="ingredients"
                        value={element.ingredients}
                        onChange={changeAction}
                    />
                </label>
                <label>description:
                    <textarea
                        id="description"
                        name="description"
                        value={element.description}
                        onChange={changeAction}
                    />
                </label>
                <input type="submit" />
            </form>
        </>
    )
}
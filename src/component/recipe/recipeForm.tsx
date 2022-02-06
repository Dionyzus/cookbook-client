import React from "react";
import { IRecipe } from "../../interface/IRecipe";

interface IProps {
    element: IRecipe;
    onSubmitHandler: (event: React.FormEvent<HTMLFormElement>, recipe: IRecipe) => void;
    onChangeHandler: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    submitText: string;
}

export default function RecipeForm(props: IProps) {

    const { element, onSubmitHandler, onChangeHandler, submitText } = props;

    return (
        <>
            <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => onSubmitHandler(event, element)}>
                <label>Name:
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={element.name}
                        onChange={onChangeHandler}
                    />
                </label>
                <label>Ingredients:
                    <textarea
                        id="ingredients"
                        name="ingredients"
                        value={element.ingredients}
                        onChange={onChangeHandler}
                    />
                </label>
                <label>description:
                    <textarea
                        id="description"
                        name="description"
                        value={element.description}
                        onChange={onChangeHandler}
                    />
                </label>
                <input type="submit" value={submitText || "submit"} />
            </form>
        </>
    )
}
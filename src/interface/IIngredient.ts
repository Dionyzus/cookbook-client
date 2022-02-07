export interface IIngredient {
    ingredientName: string;
    amount: {
        value: number | string
        unit: string
    },
}
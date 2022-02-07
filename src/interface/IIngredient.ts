export interface IIngredient {
    ingredient: string;
    amount: {
        value: number | string
        unit: string
    },
}
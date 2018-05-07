import { ingredientType } from '../state'

// each const defines the type of the action
// its interface defines what should be in the action
// this adds typing for reducer
// e.g. type ADD_INGREDIENT's payload will have ingredient and amount properties
export const ADD_INGREDIENT = 'ADD_INGREDIENT'
export interface IAddIngredient {
  type: typeof ADD_INGREDIENT
  payload: { ingredient: ingredientType }
}

export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT'
export interface IRemoveIngredient {
  type: typeof REMOVE_INGREDIENT
  payload: { ingredient: ingredientType }
}

// export a union type for reducer to use
export type All = IAddIngredient | IRemoveIngredient

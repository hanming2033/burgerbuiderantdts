import { initialState as BurgerState } from './reducers/burgerReducer'
import { initialState as UiState } from './reducers/uiReducer'

export default interface IAppState {
  burger: typeof BurgerState
  ui: typeof UiState
}

export type ingredientType = 'bread-bottom' | 'bread-top' | 'meat' | 'cheese' | 'salad' | 'bacon'

export interface IHasIngredients {
  ingredients: {
    salad: number
    bacon: number
    cheese: number
    meat: number
  }
}

export interface IHasPrice {
  totalPrice: number
}

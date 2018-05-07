import * as Actions from './burgerActions'

// *optional interface declaration: if there is initial value like 0
// *try to use it if no initial value
interface IburgerState {
  ingredients: { salad: number; bacon: number; cheese: number; meat: number }
  totalPrice: number
}

// export initialState so that the main state interface can
// use typeof this initialState as type of its property
export const initialState: IburgerState = {
  ingredients: { salad: 1, bacon: 1, cheese: 1, meat: 1 },
  totalPrice: 6.8
}

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.7,
  meat: 1.5,
  bacon: 1.1
}

export const MAX_NUMBER = {
  salad: 2,
  cheese: 2,
  meat: 2,
  bacon: 2
}

export const MIN_NUMBER = {
  salad: 1,
  cheese: 0,
  meat: 1,
  bacon: 0
}

const handleAddIngredient = (oldState: typeof initialState, action: Actions.IAddIngredient) => {
  console.log('handleAddIngredient')
  const ingre = action.payload.ingredient
  const amount = oldState.ingredients[ingre] < MAX_NUMBER[ingre] ? oldState.ingredients[ingre] + 1 : oldState.ingredients[ingre]
  const price = oldState.ingredients[ingre] < MAX_NUMBER[ingre] ? oldState.totalPrice + INGREDIENT_PRICES[ingre] : oldState.totalPrice
  return { ...oldState, ingredients: { ...oldState.ingredients, [ingre]: amount }, totalPrice: price }
}

const handleRemoveIngredient = (oldState: typeof initialState, action: Actions.IRemoveIngredient) => {
  const ingre = action.payload.ingredient
  const amount = oldState.ingredients[ingre] > MIN_NUMBER[ingre] ? oldState.ingredients[ingre] - 1 : oldState.ingredients[ingre]
  const price = oldState.ingredients[ingre] > MIN_NUMBER[ingre] ? oldState.totalPrice - INGREDIENT_PRICES[ingre] : oldState.totalPrice
  return { ...oldState, ingredients: { ...oldState.ingredients, [ingre]: amount }, totalPrice: price }
}

const burgerReducer = (oldState = initialState, action: Actions.All) => {
  switch (action.type) {
    case Actions.ADD_INGREDIENT:
      // actions are defined with type being the constant
      // typescript knows in this block, action can only be of type ADD_INGREDIENT
      // whatever payload that defined in the actions file are applied here
      return handleAddIngredient(oldState, action)
    case Actions.REMOVE_INGREDIENT:
      return handleRemoveIngredient(oldState, action)
    default:
      return oldState
  }
}

export default burgerReducer

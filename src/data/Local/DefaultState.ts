// * DefaultState.ts
// create types in default state to prevent typo
export const types = {
  BURGER: 'burger',
  UI: 'ui'
}

export interface IIngredients {
  salad: number
  bacon: number
  cheese: number
  meat: number
}

// create interface for state
interface IState {
  burger: {
    __typename: string
    ingredients: IIngredients
    totalPrice: number
  }
  ui: {
    __typename: string
    showSummaryModal: boolean
    loadingState: boolean
    errorBurgerBuilder: boolean
  }
}

// create default values for state
const defaultState: IState = {
  burger: {
    __typename: types.BURGER,
    ingredients: { salad: 0, bacon: 0, cheese: 0, meat: 0 },
    totalPrice: 6.8
  },
  ui: {
    __typename: types.UI,
    showSummaryModal: false,
    loadingState: false,
    errorBurgerBuilder: false
  }
}

export default defaultState

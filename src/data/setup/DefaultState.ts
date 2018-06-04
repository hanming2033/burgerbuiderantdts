// * DefaultState.ts
// create types in default state to prevent typo
export const types = {
  FORMS: 'forms',
  BURGER: 'Burger',
  UI: 'UI',
  BURGER_INGREDIENT: 'BurgerIngredients',
  STATE: 'State'
}

export interface IIngredients {
  __typename: string
  salad: number
  bacon: number
  cheese: number
  meat: number
}

// create interface for state
interface IState {
  __typename: string
  burger: {
    __typename: string
    ingredients: IIngredients
    totalPrice: number
  }
  ui: {
    __typename: string
    showSummaryModal: boolean
    loadingState: boolean
    error: boolean
  }
  forms: {
    __typename: string
    input_Signup_Name: string
    input_Signup_Email: string
    input_Signup_Password: string
    input_Login_Email: string
    input_Login_Password: string
  }
}

// create default values for state
const defaultState: IState = {
  __typename: types.STATE,
  burger: {
    __typename: types.BURGER,
    ingredients: { __typename: types.BURGER_INGREDIENT, salad: 1, bacon: 1, cheese: 1, meat: 1 },
    totalPrice: 6.8
  },
  ui: {
    __typename: types.UI,
    showSummaryModal: false,
    loadingState: false,
    error: false
  },
  forms: {
    __typename: types.FORMS,
    input_Signup_Name: '',
    input_Signup_Email: '',
    input_Signup_Password: '',
    input_Login_Email: '',
    input_Login_Password: ''
  }
}

export default defaultState
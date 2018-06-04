const typeDefs = `
  type Query {
    state: State!
    burger: Burger!
    ui: UI!
    ingredients: Ingredients!
    forms: forms!
  }

  type UI {
    showSummaryModal: Boolean!
    loadingState: Boolean!
    error: Boolean!
  }

  type Burger {
    ingredients: Ingredients!
    totalPrice: Float!
  }

  type Ingredients {
    salad: Int!
    bacon: Int!
    cheese: Int!
    meat: Int!
  }

  type State {
    burger: Burger!
    ui: UI!
  }

  type forms {
    input_Signup_Name: String!
    input_Signup_Email: String!
    input_Signup_Password: String!
    input_Login_Email: String!
    input_Login_Password: String!
  }

`

export default typeDefs
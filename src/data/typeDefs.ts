const typeDefs = `
type Query {
  state: State!
  burger: Burger!
  ui: UI!
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
`

export default typeDefs

import gql from 'graphql-tag'

export const GET_BURGERBUILDER_STATES = gql`
  query GetBurgerBuilderStates {
    burger @client {
      ingredients {
        salad
        bacon
        cheese
        meat
      }
      totalPrice
    }
    ui @client {
      showSummaryModal
      loadingState
      error
    }
  }
`

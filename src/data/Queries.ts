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

export const GET_BURGER_DETAILS = gql`
  query GetBurgerDetails {
    burger @client {
      ingredients {
        salad
        bacon
        cheese
        meat
      }
      totalPrice
    }
  }
`

export const GET_SIGN_UP_INPUTS = gql`
  query GetSignUpInputs {
    forms @client {
      __typename
      input_Signup_Name
      input_Signup_Email
      input_Signup_Password
    }
  }
`

export const GET_LOGIN_INPUTS = gql`
  query GetLoginInputs {
    forms @client {
      __typename
      input_Login_Email
      input_Login_Password
    }
  }
`

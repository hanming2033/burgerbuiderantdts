import * as React from 'react'
import CheckoutSummary from './CheckoutSummary'
import { RouteComponentProps } from 'react-router-dom'
import { Query } from 'react-apollo'
import { GET_BURGER_DETAILS } from '../../data/actions/Queries'
import { GetBurgerDetailsQuery } from '../../data/graphql-types'
import ContactForm from './ContactForm'
import { Auth } from 'aws-amplify'

export interface ICheckoutProps {}

export interface ICheckoutState {}

// TODO: add getUser & updateUser to AuthProxy
const getUser = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser()
    return user
  } catch (error) {
    return error
  }
}

// TODO: retrieve information for cognito
const Checkout: React.SFC<ICheckoutProps & RouteComponentProps<{}>> = props => {
  getUser().then(user => {
    console.log(user)
  })
  return (
    <Query<GetBurgerDetailsQuery> query={GET_BURGER_DETAILS}>
      {qryRes => {
        if (qryRes.loading) return <p>Loading...</p>
        if (!qryRes.data) return <p>Error !!</p>
        const { totalPrice } = qryRes.data.burger
        const ingredients = { ...qryRes.data.burger.ingredients }
        delete ingredients.__typename
        return (
          <>
            <CheckoutSummary ingredients={ingredients} />
            <ContactForm ingredients={ingredients} totalPrice={totalPrice} {...props} cancelCheckout={() => props.history.goBack()} />
          </>
        )
      }}
    </Query>
  )
}

export default Checkout

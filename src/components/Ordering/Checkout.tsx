import * as React from 'react'
import CheckoutSummary from './CheckoutSummary'
import { RouteComponentProps, Route } from 'react-router-dom'
import ContactInfo from './ContactForm'
import { GetBurgerDetailsQuery } from '../../data/clientSchema-types'
import { Query } from 'react-apollo'
import { GET_BURGER_DETAILS } from '../../data/Queries'

export interface ICheckoutProps {}

export interface ICheckoutState {}

class WithQuery extends Query<GetBurgerDetailsQuery> {}

const Checkout: React.SFC<ICheckoutProps & RouteComponentProps<{}>> = props => {
  return (
    <WithQuery query={GET_BURGER_DETAILS}>
      {qryRes => {
        if (qryRes.loading) return <p>Loading...</p>
        if (!qryRes.data) return <p>Error !!</p>
        const { totalPrice } = qryRes.data.burger
        const ingredients = { ...qryRes.data.burger.ingredients }
        delete ingredients.__typename
        return (
          <>
            <CheckoutSummary
              cancelCheckout={() => props.history.goBack()}
              continueCheckout={() => props.history.replace('/checkout/contact-form')}
              ingredients={ingredients}
            />
            <Route
              path={`${props.match.path}/contact-form`}
              render={() => <ContactInfo ingredients={ingredients} totalPrice={totalPrice} {...props} />}
            />
          </>
        )
      }}
    </WithQuery>
  )
}

export default Checkout

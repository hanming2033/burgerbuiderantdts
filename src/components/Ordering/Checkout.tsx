import * as React from 'react'
import CheckoutSummary from './CheckoutSummary'
import { IBurgerProps } from '../BurgerBuilder/BurgerDisplay/Burger'
import { RouteComponentProps, Route } from 'react-router-dom'
import ContactInfo from './ContactForm'

export interface ICheckoutProps {}

export interface ICheckoutState {}

class Checkout extends React.Component<ICheckoutProps & IBurgerProps & RouteComponentProps<{}>, ICheckoutState> {
  public state = {
    ingredients: {
      salad: 1,
      bacon: 1,
      cheese: 1,
      meat: 1
    },
    totalPrice: 0
  }

  public componentDidMount() {
    const query = new URLSearchParams(this.props.location.search)
    const saladCount = (query.get('salad') !== null ? query.get('salad') : 0) as number
    const cheeseCount = (query.get('salad') !== null ? query.get('cheese') : 0) as number
    const baconCount = (query.get('salad') !== null ? query.get('bacon') : 0) as number
    const meatCount = (query.get('salad') !== null ? query.get('meat') : 0) as number
    const price = (query.get('price') !== null ? query.get('price') : 0) as number
    this.setState({ ingredients: { salad: saladCount, cheese: cheeseCount, bacon: baconCount, meat: meatCount }, totalPrice: price })
  }

  public handleCancelCheckout = () => {
    this.props.history.goBack()
  }

  public handleContinueCheckout = () => {
    this.props.history.replace('/checkout/contact-form')
  }

  public render() {
    return (
      <>
        <CheckoutSummary
          cancelCheckout={this.handleCancelCheckout}
          continueCheckout={this.handleContinueCheckout}
          ingredients={this.state.ingredients}
        />
        <Route
          path={`${this.props.match.path}/contact-form`}
          render={() => <ContactInfo ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} {...this.props} />}
        />
      </>
    )
  }
}

export default Checkout

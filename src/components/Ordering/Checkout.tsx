import * as React from 'react'
import CheckoutSummary from './CheckoutSummary'
import { RouteComponentProps, Route } from 'react-router-dom'
import ContactInfo from './ContactForm'
import IAppState, { IHasIngredients, IHasPrice } from '../../store/state'
import { connect } from 'react-redux'

export interface IStateProps extends IHasIngredients, IHasPrice {}

const mapStateToProps = (state: IAppState): IStateProps => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice
  }
}

class Checkout extends React.Component<IStateProps & RouteComponentProps<{}>> {
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
          ingredients={this.props.ingredients}
        />
        <Route path={`${this.props.match.path}/contact-form`} component={ContactInfo} />
      </>
    )
  }
}

export default connect(mapStateToProps)(Checkout)

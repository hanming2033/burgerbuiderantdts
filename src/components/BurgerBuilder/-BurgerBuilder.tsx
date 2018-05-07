import * as React from 'react'
import Burger from './BurgerDisplay/Burger'
import BuilControls from './BuildControls/BuildControls'
import orderAxios from '../../http/axios-order'
import { RouteComponentProps } from 'react-router-dom'
import { Progress } from 'antd'
import { Modal } from 'antd'
import BurgerOrderSummary from './BurgerDisplay/BurgerOrderSummary'
import handleHttpError from '../../http/handleHttpError'

// imports for redux: redux adds props to component
// connect is to link this component to Provider
// Dispatch is a generic type, Dispatch<ActionDeclaration>
import { connect, Dispatch } from 'react-redux'
// IAppState is the app level state in redux
import IAppState from '../../store/state'
// BurgerAction contains all actions defined in burgerAction file
import * as burgerActions from '../../store/reducers/burgerActions'
import { ingredientType } from 'src/store/state'
import { IHasIngredients, IHasPrice } from '../../store/state'

export interface IBurgerBuilderState {
  showSummaryModal?: boolean
  loadingState?: boolean
  error?: boolean
}

class BurgerBuilder extends React.Component<RouteComponentProps<{}> & IStateProps & IDispathProps, IBurgerBuilderState> {
  public state = {
    showSummaryModal: false,
    loadingState: false,
    error: false
  }

  public componentDidMount() {
    // orderAxios
    //   .get('/ingredients.json')
    //   .then(res => {
    //     this.setState({ ingredients: res.data })
    //     return res
    //   })
    //   .catch(err => {
    //     this.setState({ error: true })
    //   })
  }

  public toggleSummaryModal = () => {
    this.setState(prevState => {
      return { showSummaryModal: !prevState.showSummaryModal }
    })
  }

  public handlePurchaseContinue = () => {
    this.props.history.push({ pathname: '/checkout' })
  }

  public render() {
    let CompBurger = (
      <>
        <Burger ingredients={this.props.ingredients} />
        <BuilControls
          loadingState={this.state.loadingState}
          toggleSummaryModal={this.toggleSummaryModal}
          totalPrice={this.props.totalPrice}
          ingredients={this.props.ingredients}
          addIngredient={(t: ingredientType) => this.props.handleAddIngredient(t)}
          removeIngredient={(t: ingredientType) => this.props.handleRemoveIngredient(t)}
        />
      </>
    )
    CompBurger = this.props.ingredients.meat === 10 ? <Progress percent={50} status="active" /> : CompBurger
    CompBurger = this.state.error ? <p>App Failed. Mother Fucker!!</p> : CompBurger

    return (
      <>
        <Modal
          title="Burger Order Summary"
          wrapClassName="vertical-center-modal"
          visible={this.state.showSummaryModal}
          onOk={this.handlePurchaseContinue}
          onCancel={this.toggleSummaryModal}
        >
          <BurgerOrderSummary ingredients={this.props.ingredients} totalPrice={this.props.totalPrice} />
        </Modal>
        {CompBurger}
      </>
    )
  }
}

// this IStateProps is the props to represent the props that are passed
// from mapStateToProps to component
interface IStateProps extends IHasIngredients, IHasPrice {}
// redux will manage the state, and it is doing so through this.props.
// to get the totalPrice use this.props.totalPrice
// mapStateToProps must return IStateProps
const mapStateToProps = (state: IAppState): IStateProps => {
  return {
    // burger is defined in AppState and rootReducer(combineReducer takes AppState as type)
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice
  }
}
// *Alternative is to dispatch in component itself: DispatchProps<{}>
// this IDispatchProps is the props to represent the props that are passed
// from mapDispatchToProps to component
interface IDispathProps {
  handleAddIngredient: (ingredientName: string) => void
  handleRemoveIngredient: (ingredientName: string) => void
}
// this function received the dispatch function which we can use to dispatch action to redux
// call this.props.xxx to dispatch actions
// mapDispatchToProps must return IDispatchProps
const mapDispatchToProps = (dispatch: Dispatch<burgerActions.All>): IDispathProps => {
  return {
    handleAddIngredient: (ingredientName: string) =>
      dispatch({ type: burgerActions.ADD_INGREDIENT, payload: { ingredient: ingredientName } }),
    handleRemoveIngredient: (ingredientName: string) =>
      dispatch({ type: burgerActions.REMOVE_INGREDIENT, payload: { ingredient: ingredientName } })
  }
}
// connect is a finction what returns a function which then takes a component as input
// connect first create the function with the mapping of state and actions
// which is returning a HOC to wrap around the component
export default connect(mapStateToProps, mapDispatchToProps)(handleHttpError(BurgerBuilder, orderAxios))

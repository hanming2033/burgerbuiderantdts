import * as React from 'react'
import Burger from './BurgerDisplay/Burger'
import BuilControls from './BuildControls/BuildControls'
import orderAxios from '../../http/axios-order'
import { RouteComponentProps } from 'react-router-dom'
import { Progress } from 'antd'
import { IBurgerProps } from './BurgerDisplay/Burger'
import { IBurgerIngredientType } from './BurgerDisplay/BurgerIngredient'
import { Modal } from 'antd'
import BurgerOrderSummary from './BurgerDisplay/BurgerOrderSummary'
import handleHttpError from '../../http/handleHttpError'

export interface IBurgerBuilderProps {}

export interface IBurgerBuilderState extends IBurgerProps {
  totalPrice: number
  showSummaryModal?: boolean
  loadingState?: boolean
  error?: boolean
}

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.7,
  meat: 1.5,
  bacon: 1.1
}

export const MAX_NUMBER = {
  salad: 2,
  cheese: 2,
  meat: 2,
  bacon: 2
}

export const MIN_NUMBER = {
  salad: 1,
  cheese: 0,
  meat: 1,
  bacon: 0
}

class BurgerBuilder extends React.Component<IBurgerBuilderProps & RouteComponentProps<{}>, IBurgerBuilderState> {
  public state = {
    ingredients: { salad: 0, bacon: 0, cheese: 0, meat: 0 },
    totalPrice: 6.8,
    showSummaryModal: false,
    loadingState: false,
    error: false
  }

  public componentDidMount() {
    orderAxios
      .get('/ingredients.json')
      .then(res => {
        this.setState({ ingredients: res.data })
        return res
      })
      .catch(err => {
        this.setState({ error: true })
      })
  }

  public handleAddIngredient = (igType: IBurgerIngredientType) => {
    this.setState(prevState => {
      const newState = { ...prevState }
      if (newState.ingredients[igType] < MAX_NUMBER[igType]) {
        newState.ingredients[igType]++
        newState.totalPrice = newState.totalPrice + INGREDIENT_PRICES[igType]
      }
      return newState
    })
  }

  public handleRemoveIngredient = (igType: IBurgerIngredientType) => {
    this.setState(prevState => {
      const newState = { ...prevState }
      if (newState.ingredients[igType] > 0 && newState.ingredients[igType] > MIN_NUMBER[igType]) {
        newState.ingredients[igType]--
        newState.totalPrice = newState.totalPrice - INGREDIENT_PRICES[igType]
      }
      return newState
    })
  }

  public toggleSummaryModal = () => {
    this.setState(prevState => {
      return { showSummaryModal: !prevState.showSummaryModal }
    })
  }

  public handlePurchaseContinue = () => {
    // this.setState({ loading: true })
    const queryParam = []
    for (const i in this.state.ingredients) {
      if (this.state.ingredients.hasOwnProperty(i)) {
        queryParam.push(`${i}=${this.state.ingredients[i]}`)
      }
    }
    queryParam.push(`price=${this.state.totalPrice}`)
    const queryString = queryParam.join('&')
    this.props.history.push({ pathname: '/checkout', search: `?${queryString}` })
  }

  public render() {
    let CompBurger = (
      <>
        <Burger ingredients={this.state.ingredients} />
        <BuilControls
          loadingState={this.state.loadingState}
          toggleSummaryModal={this.toggleSummaryModal}
          totalPrice={this.state.totalPrice}
          ingredients={this.state.ingredients}
          addIngredient={(t: IBurgerIngredientType) => this.handleAddIngredient(t)}
          removeIngredient={(t: IBurgerIngredientType) => this.handleRemoveIngredient(t)}
        />
      </>
    )
    CompBurger = this.state.ingredients.meat === 0 ? <Progress percent={50} status="active" /> : CompBurger
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
          <BurgerOrderSummary ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} />
        </Modal>
        {CompBurger}
      </>
    )
  }
}

export default handleHttpError(BurgerBuilder, orderAxios)

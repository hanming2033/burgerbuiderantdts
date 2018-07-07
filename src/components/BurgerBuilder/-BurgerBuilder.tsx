import * as React from 'react'
import Burger from './BurgerDisplay/Burger'
import BuilControls from './BuildControls/BuildControls'
import orderAxios from '../../http/axios-order'
import { RouteComponentProps } from 'react-router-dom'
import { Progress, Modal } from 'antd'
import { IBurgerIngredientType } from './BurgerDisplay/BurgerIngredient'
import BurgerOrderSummary from './BurgerDisplay/BurgerOrderSummary'
import handleHttpError from '../../http/handleHttpError'
import { Query, QueryResult } from 'react-apollo'
import { GET_BURGERBUILDER_STATES } from '../../data/actions/Queries'
import { GetBurgerBuilderStatesQuery } from '../../data/graphql-types';

export interface IBurgerBuilderProps {}

export interface IBurgerBuilderState {}

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

// class WithQuery extends Query<GetBurgerBuilderStatesQuery> {}

class BurgerBuilder extends React.Component<IBurgerBuilderProps & RouteComponentProps<{}>, IBurgerBuilderState> {
  // public componentDidMount() {
  //   orderAxios
  //     .get('/ingredients.json')
  //     .then(res => {
  //       this.setState({ ingredients: res.data })
  //       return res
  //     })
  //     .catch(err => {
  //       this.setState({ error: true })
  //     })
  // }

  public handleAddIngredient = (igType: IBurgerIngredientType, qryRes: QueryResult<GetBurgerBuilderStatesQuery>) => {
    if (qryRes.data) {
      const qty: number = qryRes.data.burger.ingredients[igType]
      let price: number = qryRes.data.burger.totalPrice
      const newIngredients = { ...qryRes.data.burger.ingredients }
      if (qty < MAX_NUMBER[igType]) {
        newIngredients[igType] = qty + 1
        price = price + INGREDIENT_PRICES[igType]
      }
      const newData: GetBurgerBuilderStatesQuery = {
        ...qryRes.data,
        burger: {
          ...qryRes.data.burger,
          totalPrice: price,
          ingredients: newIngredients
        }
      }
      qryRes.client.writeData({ data: newData })
    }
  }

  public handleRemoveIngredient = (igType: IBurgerIngredientType, qryRes: QueryResult<GetBurgerBuilderStatesQuery>) => {
    if (qryRes.data) {
      const qty: number = qryRes.data.burger.ingredients[igType]
      let price: number = qryRes.data.burger.totalPrice
      const newIngredients = { ...qryRes.data.burger.ingredients }
      if (qty > 0 && qty > MIN_NUMBER[igType]) {
        newIngredients[igType] = qty - 1
        price = price - INGREDIENT_PRICES[igType]
      }
      const newData: GetBurgerBuilderStatesQuery = {
        ...qryRes.data,
        burger: {
          ...qryRes.data.burger,
          totalPrice: price,
          ingredients: newIngredients
        }
      }
      qryRes.client.writeData({ data: newData })
    }
  }

  public handlePurchaseContinue = (qryRes: QueryResult<GetBurgerBuilderStatesQuery>) => {
    if (qryRes.data) {
      const newData: GetBurgerBuilderStatesQuery = {
        ...qryRes.data,
        ui: {
          ...qryRes.data.ui,
          showSummaryModal: false
        }
      }
      qryRes.client.writeData({ data: newData })
    }
    this.props.history.push({ pathname: '/checkout' })
  }

  public handleToggleStatus = (field: string, qryRes: QueryResult<GetBurgerBuilderStatesQuery>) => {
    if (qryRes.data) {
      const newData: GetBurgerBuilderStatesQuery = {
        ...qryRes.data,
        ui: {
          ...qryRes.data.ui,
          [field]: !qryRes.data.ui[field]
        }
      }
      qryRes.client.writeData({ data: newData })
    }
  }

  public render() {
    return (
      // tslint:disable-next-line:no-unused-expression
      <Query<GetBurgerBuilderStatesQuery> query={GET_BURGERBUILDER_STATES}>
        {qryRes => {
          if (qryRes.loading) return 'loading'
          if (qryRes.error || !qryRes.data) return 'error'
          const {
            data: { burger, ui }
          } = qryRes
          // create ingredients and delete __typename from it
          const ingredients = { ...burger.ingredients }
          delete ingredients.__typename
          if (ingredients.meat === 0) return <Progress percent={50} status="active" />
          if (ui.error) return <p>App Failed. Mother Fucker!!</p>
          return (
            <>
              <Modal
                title="Burger Order Summary"
                wrapClassName="vertical-center-modal"
                visible={ui.showSummaryModal}
                onOk={() => this.handlePurchaseContinue(qryRes)}
                onCancel={e => this.handleToggleStatus('showSummaryModal', qryRes)}
              >
                <BurgerOrderSummary ingredients={ingredients} totalPrice={burger.totalPrice} loadingState={ui.loadingState} />
              </Modal>
              <Burger ingredients={ingredients} />
              <BuilControls
                toggleSummaryModal={() => this.handleToggleStatus('showSummaryModal', qryRes)}
                totalPrice={burger.totalPrice}
                ingredients={ingredients}
                addIngredient={(t: IBurgerIngredientType) => this.handleAddIngredient(t, qryRes)}
                removeIngredient={(t: IBurgerIngredientType) => this.handleRemoveIngredient(t, qryRes)}
              />
            </>
          )
        }}
      </Query>
    )
  }
}

export default handleHttpError(BurgerBuilder, orderAxios)

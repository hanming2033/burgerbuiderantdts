import * as React from 'react'
import styled from 'styled-components'
import { Progress } from 'antd'

interface IOrderSummaryProps {
  totalPrice: number
  ingredients: any
  loadingState: boolean
}

const IngredientListItem = styled.li`
  list-style: none;
`

const IngredientName = styled.span`
  text-transform: capitalize;
`

const BurgerOrderSummary: React.SFC<IOrderSummaryProps> = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(ingredient => (
    <IngredientListItem key={ingredient}>
      <IngredientName>{ingredient}</IngredientName> : {props.ingredients[ingredient]}
    </IngredientListItem>
  ))

  return (
    <>
      <h3>Your Order : ${props.totalPrice.toFixed(2)}</h3>
      <p>A delicious burger with the below ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>Continue to Checkout</p>
      {props.loadingState && <Progress percent={99} status="active" />}
    </>
  )
}

export default BurgerOrderSummary

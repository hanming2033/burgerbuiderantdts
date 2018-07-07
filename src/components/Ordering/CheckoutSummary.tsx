import * as React from 'react'
import Burger, { IBurgerProps } from '../BurgerBuilder/BurgerDisplay/Burger'
import styled from 'styled-components'
import Spacer from '../.elements/Spacer'

export interface ICheckoutSummaryProps extends IBurgerProps {}

const Wrapper = styled.div`
  text-align: center;
`

const CheckoutSummary: React.SFC<ICheckoutSummaryProps> = props => {
  return (
    <Wrapper>
      <h1>What a delicious Burger!</h1>
      <Burger ingredients={props.ingredients} />
      <Spacer margin="0 3px" />
    </Wrapper>
  )
}

export default CheckoutSummary

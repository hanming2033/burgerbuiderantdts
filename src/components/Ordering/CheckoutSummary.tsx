import * as React from 'react'
import Burger, { IBurgerProps } from '../BurgerBuilder/BurgerDisplay/Burger'
import { Button } from 'antd'
import styled from 'styled-components'
import Spacer from '../.elements/Spacer'

export interface ICheckoutSummaryProps extends IBurgerProps {
  cancelCheckout: () => void
  continueCheckout: () => void
}

const Wrapper = styled.div`
  text-align: center;
`

const CheckoutSummary: React.SFC<ICheckoutSummaryProps> = (props: ICheckoutSummaryProps) => {
  return (
    <Wrapper>
      <h1>What a delicious Burger!</h1>
      <Burger ingredients={props.ingredients} />
      <Button onClick={props.cancelCheckout} type="primary">
        Cancel
      </Button>
      <Spacer margin="0 3px" />
      <Button onClick={props.continueCheckout} type="danger">
        Continue
      </Button>
    </Wrapper>
  )
}

export default CheckoutSummary

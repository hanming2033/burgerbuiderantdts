import * as React from 'react'
import styled from 'styled-components'
import { IBurgerBuilderState } from '../-BurgerBuilder'
import { MAX_NUMBER, MIN_NUMBER } from '../../../store/reducers/burgerReducer'
import { Button } from 'antd'
import Spacer from '../../.elements/Spacer'
import { ingredientType } from 'src/store/state'

interface IbuildControlProps extends Partial<IBurgerBuilderState> {
  ingredients: {
    salad: number
    bacon: number
    cheese: number
    meat: number
  }
  label: string
  addIngredient: () => void
  removeIngredient: () => void
  type: ingredientType
}

const BuildControl = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
`

const Label = styled.div`
  padding: 10px;
  width: 80px;
`

const buildControl: React.SFC<IbuildControlProps> = props => {
  const disableAdd = props.ingredients && props.ingredients[props.type] >= MAX_NUMBER[props.type] ? true : false
  const disableRemove = props.ingredients && props.ingredients[props.type] <= MIN_NUMBER[props.type] ? true : false

  return (
    <BuildControl>
      <Label>{props.label}</Label>
      <Button shape="circle" icon="minus" size="default" onClick={props.removeIngredient} disabled={disableRemove} />
      <Spacer margin="0 5px" />
      <Button shape="circle" icon="plus" size="default" onClick={props.addIngredient} disabled={disableAdd} />
    </BuildControl>
  )
}

export default buildControl

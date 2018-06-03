import * as React from 'react'
import styled from 'styled-components'
import { MIN_NUMBER, MAX_NUMBER } from '../-BurgerBuilder'
import { Button } from 'antd'
import { IBurgerIngredientType } from '../BurgerDisplay/BurgerIngredient'
import Spacer from '../../.elements/Spacer'

interface IbuildControlProps {
  label: string
  ingredients: any
  addIngredient: () => void
  removeIngredient: () => void
  type: IBurgerIngredientType
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

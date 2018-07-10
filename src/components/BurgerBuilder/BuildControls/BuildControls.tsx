import * as React from 'react'
import styled from 'styled-components'
import BuildControl from './BuildControl'
import { Button } from 'antd'
import { IBurgerIngredientType } from '../BurgerDisplay/BurgerIngredient'
import { IBurgerProps } from '../BurgerDisplay/Burger'

interface IBuildControlsProps extends IBurgerProps {
  totalPrice: number
  addIngredient: (igType: IBurgerIngredientType) => void
  removeIngredient: (igType: IBurgerIngredientType) => void
  toggleSummaryModal: () => void
}

const MainControls = styled.div`
  width: 100%;
  background-color: #3f97f6;
  display: flex;
  flex-flow: column;
  align-items: center;
  box-shadow: 0 2xp 1xp #ccc;
  margin: auto;
  padding: 10px 0;
`

export const PriceParagraph = styled.p`
  font-weight: bold;
`

// BuildControls data optional
export const buildContolsData: Array<{ label: string; type: IBurgerIngredientType }> = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
]

const BuildControls: React.SFC<IBuildControlsProps> = props => {
  const CompBuildControls = (data: Array<{ label: string; type: IBurgerIngredientType }>) =>
    data.map(row => (
      <BuildControl
        ingredients={props.ingredients}
        key={row.label}
        label={row.label}
        type={row.type}
        addIngredient={() => props.addIngredient(row.type)}
        removeIngredient={() => props.removeIngredient(row.type)}
      />
    ))
  return (
    <MainControls>
      <PriceParagraph>Current Price : ${props.totalPrice.toFixed(2)}</PriceParagraph>
      {CompBuildControls(buildContolsData)}
      <Button type="danger" onClick={props.toggleSummaryModal}>
        ORDER NOW
      </Button>
    </MainControls>
  )
}

export default BuildControls

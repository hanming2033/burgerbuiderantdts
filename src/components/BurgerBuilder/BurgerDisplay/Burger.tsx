import * as React from 'react'
import styled from 'styled-components'
import BurgerIngredient from './BurgerIngredient'
import { ingredientType } from 'src/store/state'

export interface IBurgerProps {
  ingredients: {
    salad: number
    bacon: number
    cheese: number
    meat: number
  }
}

const BurgerWrapper = styled.div`
  width: 100%;
  margin: auto;
  height: 300px;
  text-align: center;
  font-weight: bold;
  font-size: 1.2rem;

  @media (min-width: 500px) and (min-height: 400px) {
    width: 350px;
    height: 300px;
  }

  @media (min-width: 500px) and (min-height: 401px) {
    width: 450px;
    height: 400px;
  }
`
// recursive function to add ingredient types into an array
const addToArray = (igType: ingredientType, num: number, arr: any[]) => {
  if (num <= 0) {
    return
  }
  arr.push(<BurgerIngredient key={igType + num} type={igType} />)
  num--
  addToArray(igType, num, arr)
}

const Burger: React.SFC<IBurgerProps> = props => {
  // takes the ingredients object from props and split it into arrays of ingredient
  // Object.keys(props.ingredients): take the keys of an object
  const CompBurgerIngredients: JSX.Element[] | JSX.Element = Object.keys(props.ingredients).reduce((arr: any[], igType: ingredientType) => {
    addToArray(igType, props.ingredients[igType], arr)
    return arr
  }, [])

  return (
    <BurgerWrapper>
      <BurgerIngredient type="bread-top" />
      {CompBurgerIngredients}
      <BurgerIngredient type="bread-bottom" />
    </BurgerWrapper>
  )
}

export default Burger

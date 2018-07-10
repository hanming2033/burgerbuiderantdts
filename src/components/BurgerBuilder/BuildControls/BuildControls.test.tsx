import * as React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import BuildControls, { PriceParagraph } from './BuildControls'
import BuildControl from './BuildControl'

// connect enzyme to react and jest
configure({ adapter: new Adapter() })

const ingredients = {
  salad: 1,
  bacon: 2,
  cheese: 2,
  meat: 1
}

const dummyFunction = () => {
  console.log('hihi')
}

// describe is the container that contains all the related tests
describe('<BuildControls />', () => {
  let wrapper: any
  beforeEach(() => {
    // shallow testing renders the component without its actual content
    wrapper = shallow(
      <BuildControls
        ingredients={ingredients}
        totalPrice={8.6}
        addIngredient={dummyFunction}
        removeIngredient={dummyFunction}
        toggleSummaryModal={dummyFunction}
      />
    )
  })

  // it defines individual tests
  it('should render render 4 <BuildControl />', () => {
    expect(wrapper.find(BuildControl)).toHaveLength(4)
  })

  it('should render render price 8.6', () => {
    expect(wrapper.find(PriceParagraph).html()).toMatch(/Current Price : \$8\.6/)
  })
})

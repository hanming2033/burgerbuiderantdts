/* tslint:disable */
//  This file was automatically generated and should not be edited.

export interface GetBurgerBuilderStatesQuery {
  burger:  {
    __typename: "Burger",
    ingredients:  {
      __typename: "Ingredients",
      salad: number,
      bacon: number,
      cheese: number,
      meat: number,
    },
    totalPrice: number,
  },
  ui:  {
    __typename: "UI",
    showSummaryModal: boolean,
    loadingState: boolean,
    error: boolean,
  },
};

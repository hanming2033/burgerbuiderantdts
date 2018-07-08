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

export interface GetBurgerDetailsQuery {
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
};

export interface GetLocalStatesQuery {
  forms:  {
    __typename: "forms",
    input_Email: string,
  } | null,
  nav:  {
    __typename: "nav",
    nextPath: string,
  } | null,
};

export interface GetAllOrdersDangerousQuery {
  listOrders:  {
    __typename: "OrderConnection",
    items:  Array< {
      __typename: "Order",
      id: string,
      totalPrice: number,
      meat: number,
      salad: number,
      cheese: number,
      bacon: number,
      country: string,
      deliveryMethod: string,
      email: string,
      name: string,
      street: string,
      zipCode: string,
    } | null > | null,
  } | null,
};

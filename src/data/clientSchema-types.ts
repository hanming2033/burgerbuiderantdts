/* tslint:disable */
//  This file was automatically generated and should not be edited.

export interface SignupUserMutationVariables {
  email: string,
  name: string,
  password: string,
};

export interface SignupUserMutation {
  signup:  {
    __typename: "AuthPayload",
    token: string,
  },
};

export interface LoginUserMutationVariables {
  email: string,
  password: string,
};

export interface LoginUserMutation {
  login:  {
    __typename: "LoginResponse",
    payload:  {
      __typename: "AuthPayload",
      token: string,
    } | null,
    error:  {
      __typename: "Error",
      field: string,
      msg: string,
    } | null,
  },
};

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

export interface GetSignUpInputsQuery {
  forms:  {
    __typename: "forms",
    input_Signup_Name: string,
    input_Signup_Email: string,
    input_Signup_Password: string,
  },
};

export interface GetLoginInputsQuery {
  forms:  {
    __typename: "forms",
    input_Login_Email: string,
    input_Login_Password: string,
  },
};

export interface GetMyOrdersQuery {
  me:  {
    __typename: "User",
    name: string,
    email: string,
    orders:  Array< {
      __typename: "Order",
      id: string,
      ingredients:  {
        __typename: "Ingredients",
        bacon: number,
        cheese: number,
        meat: number,
        salad: number,
      },
      country: string,
      delivery: string,
      street: string,
      zipCode: string,
      price: number,
    } | null >,
  } | null,
};

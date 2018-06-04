import * as React from 'react'
import orderAxios from '../../http/axios-order'
import { IBurgerProps } from '../BurgerBuilder/BurgerDisplay/Burger'
import { Card, Icon, Avatar } from 'antd'
import styled from 'styled-components'
import { GetMyOrdersQuery } from '../../data/clientSchema-types'
import { Query } from 'react-apollo'
import { GET_MY_ORDERS } from '../../data/Queries'
const { Meta } = Card

export interface IOrdersProps {}

export interface ISingleOrderProps extends IBurgerProps {
  id: string
  customer: {
    adress: {
      country: string
      postalCode: string
      street: string
    }
    name: string
    email: string
  }
  deliveryMethod: string
  price: string
}

export interface IOrdersState {
  orders: ISingleOrderProps[]
  loading: boolean
}

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  padding: 0 60px;
`

const CompOrders = (orders: ISingleOrderProps[]) => {
  return orders.map(order => {
    const price = 'Price: $' + order.price
    const ingredients = `${order.ingredients.salad} portion of salad, ${order.ingredients.cheese} portion of cheese, ${
      order.ingredients.bacon
    } portion of bacon, ${order.ingredients.meat} portion of meat`
    return (
      <Card
        key={order.id}
        style={{ width: 270, margin: '10px 10px' }}
        cover={<img alt="example" src="http://www.chatelaine.com/wp-content/uploads/2017/05/Bibimbap-homemade-burgers.jpg" />}
        actions={[<Icon key="setting" type="setting" />, <Icon key="edit" type="edit" />, <Icon key="ellipsis" type="ellipsis" />]}
      >
        <Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={price}
          description={ingredients}
        />
      </Card>
    )
  })
}

class WithGetOrdersQuery extends Query<GetMyOrdersQuery> {}

export default class Orders extends React.Component<IOrdersProps, IOrdersState> {
  public state = {
    orders: [],
    loading: true
  }

  public componentDidMount() {
    orderAxios
      .get('/orders.json')
      .then(res => {
        const orders = Object.keys(res.data).map(orderId => ({ ...res.data[orderId], id: orderId }))
        this.setState({ loading: false, orders })
      })
      .catch(err => {
        this.setState({ loading: false })
      })
  }

  public render() {
    return (
      <WithGetOrdersQuery query={GET_MY_ORDERS}>
        {qryRes => {
          if (qryRes.loading) return <p>Loading...</p>
          if (!qryRes.data) return <p>Error</p>
          console.log(qryRes.data)

          return <Wrapper>{CompOrders(this.state.orders)}</Wrapper>
        }}
      </WithGetOrdersQuery>
    )
  }
}

// todo: figure out how to auth

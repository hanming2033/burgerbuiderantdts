import * as React from 'react'
import { Card, Icon, Avatar } from 'antd'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import { GetAllOrdersDangerousQuery } from '../../data/graphql-types'
import { GET_ALL_ORDERS_DANGEROUS } from '../../data/actions/Queries'
const { Meta } = Card

export interface IOrdersProps {}


export interface IOrdersState {
  loading: boolean
}

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  padding: 0 60px;
`

const CompOrders = (orderQry: GetAllOrdersDangerousQuery) => {
  if (!orderQry.listOrders || !orderQry.listOrders.items) return <h1>No Orders</h1>
  return orderQry.listOrders.items.map(order => {
    if (!order) return <h1>No Orders</h1>
    const price = 'Price: $' + order.totalPrice
    const ingredients = `${order.salad} portion of salad, ${order.cheese} portion of cheese, ${order.bacon} portion of bacon, ${
      order.meat
    } portion of meat`
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

class WithGetOrdersQuery extends Query<GetAllOrdersDangerousQuery> {}

export default class Orders extends React.Component<IOrdersProps, IOrdersState> {
  public state = {
    orders: [],
    loading: true
  }

  public render() {
    return (
      <WithGetOrdersQuery query={GET_ALL_ORDERS_DANGEROUS}>
        {qryRes => {
          if (qryRes.loading) return <p>Loading...</p>
          if (!qryRes.data || !qryRes.data.listOrders) return <p>Error</p>
          return <Wrapper>{CompOrders(qryRes.data)}</Wrapper>
        }}
      </WithGetOrdersQuery>
    )
  }
}

// todo: figure out how to auth

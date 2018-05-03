import * as React from 'react'
import { Menu, Icon } from 'antd'
import { ClickParam } from 'antd/lib/menu'
import Spacer from '../.elements/Spacer'
import styled from 'styled-components'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import Logo from '../Logo/Logo'

export interface ITopNavProps {}

export interface ITopNavState {
  current: string
}

const FlexMenu = styled(Menu)`
  display: flex;
`

const SmallScreenMenuItem: any = styled(Menu.SubMenu)`
  display: block;
  @media (min-width: 600px) {
    display: none;
  }
`

const BigScreenMenuItem = styled(Menu.Item)`
  display: none;
  @media (min-width: 600px) {
    display: block;
  }
`

class TopNav extends React.Component<ITopNavProps & RouteComponentProps<{}>, ITopNavState> {
  public state = { current: 'createburger' }

  public handleClick = (e: ClickParam) => {
    this.props.history.push({ pathname: `/${e.key}` })
    this.setState({ current: e.key === 'home' ? 'createburger' : e.key })
  }

  public render() {
    return (
      <FlexMenu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
        <Menu.Item key="home">
          <Logo height="18px" />Burgerr
        </Menu.Item>
        <Spacer margin="auto" />
        <BigScreenMenuItem key="createburger">
          <Icon type="edit" /> Create Burger
        </BigScreenMenuItem>
        <BigScreenMenuItem key="orders">
          <Icon type="appstore" />Orders
        </BigScreenMenuItem>
        <SmallScreenMenuItem
          title={
            <span>
              <Icon type="setting" />MENU
            </span>
          }
        >
          <Menu.ItemGroup>
            <Menu.Item key="createburger">Create Burger</Menu.Item>
            <Menu.Item key="orders">Orders</Menu.Item>
          </Menu.ItemGroup>
        </SmallScreenMenuItem>
      </FlexMenu>
    )
  }
}

export default withRouter(TopNav)

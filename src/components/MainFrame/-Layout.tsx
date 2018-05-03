import * as React from 'react'
import TopNav from './-TopNav'
import styled from 'styled-components'

interface ILayoutProps {}
export interface ILayoutState {}

const MainContainer = styled.main`
  margin-top: 70px;
`

class Layout extends React.Component<ILayoutProps, ILayoutState> {
  public render() {
    return (
      <>
        <TopNav />
        <MainContainer>{this.props.children}</MainContainer>
      </>
    )
  }
}

export default Layout

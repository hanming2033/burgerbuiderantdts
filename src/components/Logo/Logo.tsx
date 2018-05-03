import * as React from 'react'
import styled from 'styled-components'
// BurgerLogo will be a path
import burgerLogo from '../../assets/images/burger-logo.png'

interface ILogoProps {
  height: string
}

const Background = styled.div`
  display: inline;
  padding: 8px;
  text-align: center;
`

const Image = styled.img`
  height: ${(p: ILogoProps) => p.height};
`

const Logo: React.SFC<ILogoProps> = props => {
  return (
    <Background>
      <Image height={props.height} src={burgerLogo} alt="BurgerStop" />
    </Background>
  )
}

export default Logo

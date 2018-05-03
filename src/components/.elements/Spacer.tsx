import styled from 'styled-components'

interface ISpacerProps {
  margin: string
}

const Spacer = styled.div`
  display: inline;
  margin: ${(p: ISpacerProps) => p.margin};
`

export default Spacer

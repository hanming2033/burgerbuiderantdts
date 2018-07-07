// import * as React from 'react'
// import { QueryResult } from 'react-apollo'
// import { Input } from 'antd'

// interface IInputElProps {
//   type?: string
//   keyName: string
//   qryRes: QueryResult
//   value: string
//   placeholder: string
// }

// const handleInputChange = (e: React.SyntheticEvent<HTMLInputElement>, childKey: string, qryRes: QueryResult<GetSignUpInputsQuery>) => {
//   if (qryRes.data) {
//     const newData: GetSignUpInputsQuery = {
//       ...qryRes.data,
//       forms: {
//         ...qryRes.data.forms,
//         [childKey]: e.currentTarget.value
//       }
//     }
//     qryRes.client.writeData({ data: newData })
//   }
// }

// const InputEl: React.SFC<IInputElProps> = props => {
//   return (
//     <Input
//       type={props.type || 'text'}
//       value={props.value}
//       onChange={e => handleInputChange(e, props.keyName, props.qryRes)}
//       placeholder={props.placeholder}
//     />
//   )
// }

// export default InputEl

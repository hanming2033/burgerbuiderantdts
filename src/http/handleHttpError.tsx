import * as React from 'react'
import { AxiosInstance } from 'axios'
import { notification } from 'antd'
// tslint:disable-next-line:no-submodule-imports
import { IconType } from 'antd/lib/notification'

const openNotificationWithIcon = (type: IconType) => {
  notification[type]({
    message: 'Network Error',
    description: 'Something went wrong with the network: a request cannot be sent or received.'
  })
}

function handleHttpError<P>(InnerComponent: React.ComponentType<P>, axios: AxiosInstance) {
  return class extends React.Component<P> {
    public resInterceptor: number

    constructor(props: P) {
      super(props)

      this.resInterceptor = axios.interceptors.response.use(
        res => res,
        err => {
          openNotificationWithIcon('error')
          Promise.reject(err)
        }
      )
    }

    public componentWillUnmount() {
      axios.interceptors.response.eject(this.resInterceptor)
    }
    public render() {
      return <InnerComponent {...this.props} />
    }
  }
}
export default handleHttpError

import axios from 'axios'

const orderAxios = axios.create({
  baseURL: 'https://react-burger-builder-8b532.firebaseio.com/'
})

export default orderAxios

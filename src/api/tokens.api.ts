import { get } from './httpClient'
const END_POINT = '/tokens'

const getTokens = () => {
  //@ts-ignore
  return get(END_POINT)
}

export { getTokens }

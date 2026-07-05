import axios from 'axios'
import queryString from 'query-string'

export const subscribe = ({ email }) => {
  const url = queryString.stringifyUrl({
    url: '/subscribe',
    query: {
      email
    }
  })

  return axios({
    url,
    method: 'post',
    data: {
      email
    }
  }).then((resp) => {
    if (resp.data?.success) return resp.data
    if (
      resp.data &&
      resp.data.success == false &&
      resp.data.message == 'already exists'
    )
      return resp.data

    return Promise.reject(resp.data)
  })
}

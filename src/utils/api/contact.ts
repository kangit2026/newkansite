import axios from 'axios'

export const contact = (data) => {
  return axios({
    method: 'post',
    url: '/contact',
    data
  }).then((resp) => {
    if (resp.data?.success) return resp.data

    return Promise.reject(resp.data)
  })
}

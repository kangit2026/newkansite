import axios from 'axios'

export type ContactFormPayload = {
  name: string
  phone: string
  email: string
  message: string
  website?: string
  recaptcha_token?: string
  source_page?: string
}

export const contact = (data: ContactFormPayload) => {
  return axios({
    method: 'post',
    url: '/contact',
    data
  }).then((resp) => {
    if (resp.data?.success) return resp.data

    return Promise.reject(resp.data)
  })
}

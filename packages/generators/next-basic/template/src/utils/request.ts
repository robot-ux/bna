import { useFetch } from 'use-http'
import qs from 'query-string'

const request = (url: string, options: RequestInit) => {
  return fetch(url, options)
    .then((res) => {
      const { status } = res
      if (status >= 200 && status < 300) {
        return res.json()
      }
      return Promise.reject(res)
    })
    .catch((err) => {
      console.error('Request error: ', err)
      return Promise.reject(err)
    })
}

const get = (url: string, data?: object, options?: RequestInit) => {
  const _url = data ? `${url}?${qs.stringify(data)}` : url
  return request(_url, { ...options, method: 'GET' })
}

const post = (url: string, data?: object, options?: RequestInit) =>
  request(url, {
    ...options,
    method: 'POST',
    body: data ? JSON.stringify(data) : null,
  })

export { useFetch, request, post, get }

export default request

import axios from 'axios'
import domain from '@/environment'

export const login = async (email, password) => {
  return await axios.post(domain + '/users/auth', { email, password })
}

export const register = async (userData) => {
  return await axios.post(domain + '/users', userData)
}

export const updateUser = async (token, userData) => {
  return await axios.patch(domain + '/users', userData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

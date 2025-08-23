import axios from 'axios'
import domain from '@/environment'

export const login = async (email, password) => {
  return await axios.post(domain + '/users/auth', { email, password })
}

export const register = async (userData) => {
  return await axios.post(domain + '/users', userData)
}

export const getUserById = async (token, ID) => {
  return await axios.get(domain + '/users/' + ID, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const updateUser = async (token, userData) => {
  const url = domain + (userData.id ? '/users/' + userData.id : '/users/me')

  return axios.patch(
    url,
    {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      birthDate: userData.birthDate
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
}

export const completeFile = async (token, id, userData) => {
  return axios.patch(domain + '/users/complete/' + id, userData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

import axios from 'axios'
import domain from '@/environment'

export const getMedecines = async (searchQuery) => {
  return await axios.get(domain + '/medicine', { params: searchQuery })
}

export const getMedecineById = async (ID) => {
  return await axios.get(domain + '/medicine/' + ID)
}

export const getCategories = async () => {
  return await axios.get(domain + '/categories')
}

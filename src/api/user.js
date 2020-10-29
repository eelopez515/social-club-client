import apiUrl from '../apiConfig'
import axios from 'axios'

export const addUser = (picture) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/user',
    data: picture
  })
}

export const showUser = (user) => {
  return axios({
    url: apiUrl + '/user',
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {}
  })
}

export const updateUser = (data, userId, user) => {
  return axios({
    url: apiUrl + '/user/' + `${userId}`,
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: data
  })
}

export const delteOrder = (userId, user) => {
  return axios({
    url: apiUrl + '/user/' + `${userId}`,
    method: 'DELETE',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {}
  })
}

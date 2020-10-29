import apiUrl from '../apiConfig'
import axios from 'axios'

export const addPic = (picture) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/pictures',
    data: picture
  })
}

export const showPics = (user) => {
  return axios({
    url: apiUrl + '/pictures',
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

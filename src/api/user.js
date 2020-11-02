import apiUrl from '../apiConfig'
import axios from 'axios'

export const showUser = (user) => {
  return axios({
    url: apiUrl + '/profile',
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {}
  })
}

export const updateProfile = (user) => {
  return axios({
    url: apiUrl + '/update-profile',
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: user
  })
}

import apiUrl from '../apiConfig'
import axios from 'axios'

export const addPic = (picture, user) => {
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

export const updatePic = (picture, pictureId, user) => {
  return axios({
    url: apiUrl + '/pictures/' + `${pictureId}`,
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: picture
  })
}

export const delteOrder = (pictureId, user) => {
  return axios({
    url: apiUrl + '/pictures/' + `${pictureId}`,
    method: 'DELETE',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {}
  })
}

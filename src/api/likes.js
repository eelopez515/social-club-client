import apiUrl from '../apiConfig'
import axios from 'axios'

export const createLike = (data, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/likes',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      likes: {
        name: data.name,
        bio: data.bio,
        image: data.image,
        zipcode: data.zipcode,
        gender: data.gender,
        isLiked: true
      }
    }
  })
}

export const showLikes = (user) => {
  return axios({
    url: apiUrl + '/likes',
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {}
  })
}

export const deleteLike = (likeId, user) => {
  return axios({
    url: apiUrl + '/likes/' + `${likeId}`,
    method: 'DELETE',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {}
  })
}

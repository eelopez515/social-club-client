import React, { Component } from 'react'
import { showLikes, deleteLike } from '../../api/likes'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

class Profile extends Component {
  constructor (props) {
    super()
    this.state = {
      user: null,
      isLoaded: false,
      msgAlerts: [],
      likes: [],
      isDeleted: false
    }
  }
  componentDidMount () {
    const user = this.props.user
    showLikes(user)
      .then(response => (
        this.setState({
          likes: response.data.user[0].likes
        })
      ))
  }
  onClick = event => {
    const user = this.props.user
    const likeId = event.target.id
    deleteLike(likeId, user)
      .then(response => (
        this.setState({
          likes: response.data.user.likes
        })
      ))
  }
  render () {
    const { likes } = this.state
    return (
      <div className='profile'>
        <h2>Your Profile</h2>
        <Link to="/update-profile">
          Update Profile
        </Link>
        <p>First Name: {this.props.user.firstName}</p>
        <p>Last Name: {this.props.user.lastName}</p>
        <p>Zipcode: {this.props.user.zipcode}</p>
        <p>Gender: {this.props.user.gender}</p>
        <p>Email: {this.props.user.email}</p>
        <div className='likes'>
          <p>Likes:</p>{likes.map(like => (
            <div key={like._id}>
              <p className='like'>{like.name}</p>
              <Button id={like._id} variant='primary' onClick={this.onClick}>Delete</Button>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
export default Profile

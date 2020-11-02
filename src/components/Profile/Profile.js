import React, { Component, Fragment } from 'react'
import { showLikes, deleteLike } from '../../api/likes'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import TinderCard from 'react-tinder-card'
import messages from '../AutoDismissAlert/messages'

class Profile extends Component {
  constructor (props) {
    super()
    this.state = {
      user: '',
      isLoaded: false,
      msgAlerts: [],
      likes: [],
      isDeleted: false
    }
  }
  componentDidMount () {
    const { user } = this.props
    showLikes(user)
      .then(response => (
        this.setState({
          user: response.data.user,
          likes: response.data.user[0].likes,
          isLoaded: true
        })
      ))
  }
  onClick = event => {
    const user = this.props.user
    const likeId = event.target.id
    const { msgAlert } = this.props
    deleteLike(likeId, user)
      .then(response => (
        this.setState({
          user: response.data.user,
          likes: response.data.user.likes
        })
      ))
      .then(() => msgAlert({
        heading: 'Like Deleted',
        message: messages.onDeleteLikeSuccess,
        variant: 'success'
      }))
      .catch(() => msgAlert({
        heading: 'Delete Failed',
        message: messages.onDeleteLikeFailure,
        variant: 'danger'
      }))
  }
  render () {
    const { likes } = this.state
    return (
      <Fragment>
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
            <p>Likes:</p>
            {likes.map(like => (
              <TinderCard
                className='liked-card-container'
                key={like.name}
                preventSwipe={['up', 'down', 'left', 'right']}
              >
                <div
                  key={like._id}
                  style={{ backgroundImage: `url(${like.image})` }}
                  className='liked-card'
                >
                  <div className='like-card-info'>
                    <p>{like.name}</p>
                  </div>
                </div>
                <Button id={like._id} variant='primary' className='delete-button' onClick={this.onClick}>Delete</Button>
              </TinderCard>
            ))}
          </div>
        </div>
      </Fragment>
    )
  }
}
export default Profile

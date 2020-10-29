import React, { Component } from 'react'
import { showLikes } from '../../api/likes'

class Profile extends Component {
  constructor (props) {
    console.log(props)
    super()
    this.state = {
      user: null,
      msgAlerts: []
    }
  }
  componentDidMount () {
    const user = this.props.user
    showLikes(user)
      .then(response => { console.log(response) })
  }
  render () {
    return (
      <div>
        <h2>Your Profile</h2>
        <p>First Name: {this.props.user.firstName}</p>
        <p>Last Name: {this.props.user.lastName}</p>
        <p>Zipcode: {this.props.user.zipcode}</p>
        <p>Gender: {this.props.user.gender}</p>
        <p>Email: {this.props.user.email}</p>
        <p>Likes: {this.props.user.likes[1].name}</p>
      </div>
    )
  }
}
export default Profile

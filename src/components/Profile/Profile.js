import React, { Component } from 'react'

class Profile extends Component {
  constructor (props) {
    console.log(props)
    super()
    this.state = {
      user: null,
      msgAlerts: []
    }
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
        <p>Likes: {this.props.user.likes}</p>
      </div>
    )
  }
}
export default Profile

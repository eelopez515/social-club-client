import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { updateProfile } from '../../api/user'
import Button from 'react-bootstrap/Button'

class ProfileUpdate extends Component {
  constructor (props) {
    console.log(props)
    super(props)
    this.state = {
      user: '',
      isLoaded: false,
      isUpdated: false
    }
  }
  componentDidMount () {
    this.setState({
      user: this.props.user
    })
  }
  handleSubmit = (event) => {
    event.preventDefault()
    const user = this.state.user
    console.log(user)
    updateProfile(user)
      .then(response => (
        console.log(response)
        // this.setState({
        //   isUpdated: true
        // })
      ))
  }
  handleChange = (event) => {
    const userInput = event.target.value
    const userKey = event.target.name
    const userCopy = Object.assign(this.state.user)
    userCopy[userKey] = userInput
    this.setState({
      user: userCopy
    })
  }
  render () {
    const { isUpdated } = this.state
    console.log(this.state.user)
    if (isUpdated === true) {
      return <Redirect to={'/profile'} />
    }
    return (
      <div>
        <h2>Update Profile</h2>
        <form onSubmit={this.handleSubmit}>
          <input name='firstName' type='text' value={this.state.value} onChange={this.handleChange} placeholder={this.state.user.firstName}/><br/>
          <input name='lastName' type='text' value={this.state.value} onChange={this.handleChange} placeholder={this.state.user.lastName}/><br/>
          <input name='gender' type='text' value={this.state.value} onChange={this.handleChange} placeholder={this.state.user.gender}/><br/>
          <input name='zipcode' type='text' value={this.state.value} onChange={this.handleChange} placeholder={this.state.user.zipcode}/><br/>
          <Button variant='primary' value='Cancel'/>
          <Button variant='primary' type='Submit'/>
        </form>
      </div>
    )
  }
}
export default ProfileUpdate

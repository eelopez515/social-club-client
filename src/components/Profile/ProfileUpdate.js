import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { updateProfile } from '../../api/user'
import { showLikes } from '../../api/likes'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import messages from '../AutoDismissAlert/messages'

class ProfileUpdate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: '',
      like: [],
      isLoaded: false,
      isUpdated: false
    }
  }
  componentDidMount () {
    const user = this.props.user
    showLikes(user)
      .then(response => (
        this.setState({
          user: response.data.user[0],
          isLoaded: true
        })
      ))
  }
  handleSubmit = (event) => {
    event.preventDefault()
    const { msgAlert } = this.props
    const user = this.state.user
    updateProfile(user)
      .then(response => (
        this.setState({
          user: response.data.user,
          isUpdated: true,
          isLoaded: true
        })
      ))
      .then(() => msgAlert({
        heading: 'Updated Profile successfully',
        message: messages.onUpdateSuccess,
        variant: 'success'
      }))
      .catch(() => msgAlert({
        heading: 'Failed To Update',
        message: messages.onUpdateFailure,
        variant: 'danger'
      }))
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
    let jsx
    const { isUpdated, isLoaded, user } = this.state
    if (isLoaded === false) {
      jsx = <p><em>Loading...</em></p>
    } else if (isUpdated === true) {
      return <Redirect to={'/profile'} />
    } else {
      jsx = <div className='row'>
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Update Profile</h3>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId='update'>
              <Form.Control name='firstName' type='text' value={this.state.value} onChange={this.handleChange} placeholder={user.firstName}/><br/>
              <Form.Control name='lastName' type='text' value={this.state.value} onChange={this.handleChange} placeholder={user.lastName}/><br/>
              <Form.Control name='gender' type='text' value={this.state.value} onChange={this.handleChange} placeholder={user.gender}/><br/>
              <Form.Control name='zipcode' type='text' value={this.state.value} onChange={this.handleChange} placeholder={user.zipcode}/><br/>
              <Link to='/profile'>
                <Button variant='primary' value='Cancel' className='update-button'>Cancel</Button>
              </Link>
              <Button variant='primary' type='Submit' className='update-button'>Submit</Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    }
    return (
      <div>
        {jsx}
      </div>
    )
  }
}
export default ProfileUpdate

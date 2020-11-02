import React, { Component, Fragment } from 'react'
import TinderCard from 'react-tinder-card'
import messages from '../AutoDismissAlert/messages'
// import Modal from 'react-bootstrap/Modal'
// import Button from 'react-bootstrap/Button'
// import people from '../../people/people'
import { createLike } from '../../api/likes'

class Person extends Component {
  constructor (props) {
    super()
    this.state = {
      user: '',
      isLiked: false
    }
  }
onClick = (event) => {
}
onSwipe = direction => {
  const { user, msgAlert, name } = this.props
  const data = this.props
  if (direction === 'right') {
    createLike(data, user)
      .then(response => (
        this.setState({
          user: response.data.user,
          isLiked: false
        })
      ))
      .then(() => msgAlert({
        heading: 'Like Success',
        message: messages.onSwipeRight + `${name}`,
        variant: 'success'
      }))
      .catch(console.error)
  }
  if (direction === 'left') {
    msgAlert({
      heading: 'Skipped',
      message: messages.onSwipeLeft + `${name}`,
      variant: 'danger'
    })
  }
}

render () {
  const { name, image } = this.props
  let jsx
  if (this.props.user !== null) {
    jsx =
      <Fragment>
        <div className='person-card'>
          <div className='person-card-container'>
            <TinderCard
              className='swipe'
              key={name}
              preventSwipe={['up', 'down']}
              onSwipe={this.onSwipe}
            >
              <div
                style={{ backgroundImage: `url(${image})` }}
                className='card'
                onClick={this.onClick}
                person={this.props}
              >
                <h4>{name}</h4>
              </div>
            </TinderCard>
          </div>
        </div>
      </Fragment>
  }
  return (
    <div>
      {jsx}
    </div>
  )
}
}

export default Person

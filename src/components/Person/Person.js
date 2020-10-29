import React, { Component, Fragment } from 'react'
import TinderCard from 'react-tinder-card'
// import Modal from 'react-bootstrap/Modal'
// import Button from 'react-bootstrap/Button'
// import people from '../../people/people'
import { createLike } from '../../api/likes'

class Person extends Component {
  constructor (props) {
    console.log(props)
    super()
    this.state = {
      user: null,
      isLiked: false
    }
  }
onClick = (event) => {
}
onSwipe = direction => {
  const { user } = this.props
  const data = this.props
  console.log('you swiped ', this.props)
  if (direction === 'right') {
    createLike(data, user)
      .then(response => { console.log(response) })
      .then(() => (
        this.setState({
          isLiked: false
        })
      ))
      .catch(console.error)
  }
}

render () {
  const { name, zipcode, image } = this.props
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
              onCardLeftScreen={() => console.log(this.props.name + ' left the screen')}
            >
              <div
                style={{ backgroundImage: `url(${image})` }}
                className='card'
                onClick={this.onClick}
                person={this.props}
              >
                <h4>{name}</h4>
                <h4>Zipcode: {zipcode}</h4>
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

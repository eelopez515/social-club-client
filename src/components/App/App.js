import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'

import Profile from '../Profile/Profile'
import ProfileUpdate from '../Profile/ProfileUpdate'
import people from '../../people/people'
import Person from '../Person/Person'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const randomizePeople = array => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
      }
      return array
    }
    const { msgAlerts, user } = this.state
    const randomPerson = randomizePeople(people)
    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/profile' render={() => (
            <Profile msgAlert={this.msgAlert} user={user} />
          )}/>
          <AuthenticatedRoute user={user} exact path='/update-profile' render={() => (
            <ProfileUpdate msgAlert={this.msgAlert} user={user} />
          )}/>
          <AuthenticatedRoute user={user} exact path='/social-club' render={() => (
            <div>
              <h2 className='welcome mt-3'>Socialize</h2>
              <div className='mt-5'>
                <div>
                  {randomPerson.map(person => (
                    <div key={person.name} className='col-4'>
                      <Person
                        user={user}
                        key={person.name}
                        id={person.id}
                        name={person.name}
                        bio={person.bio}
                        image={person.image}
                        zipcode={person.zipcode}
                        gender={person.gender}
                        isLiked={person.isLiked}
                        msgAlert={this.msgAlert}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}/>
        </main>
      </Fragment>
    )
  }
}

export default App

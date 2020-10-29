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
    const { msgAlerts, user } = this.state

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
          <AuthenticatedRoute user={user} path='/profile' render={() => (
            <Profile msgAlert={this.msgAlert} user={user} />
          )}/>
          <AuthenticatedRoute user={user} exact path='/' render={() => (
            <div>
              <h2 className='welcome mt-3'>Socialize</h2>
              <div className='card-container mt-5'>
                <div className='row'>
                  {people.map(person => (
                    <div key={person.name} className='col-4 person-cards'>
                      <Person
                        user={user}
                        key={person.name}
                        id={person.id}
                        name={person.name}
                        bio={person.bio}
                        image={person.image}
                        zipcode={person.zipcode}
                        gender={person.gender}
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

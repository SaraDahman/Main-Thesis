import React from 'react';
import axios from 'axios';
class EmailConfirmation extends React.Component {
  state = {};
  componentDidMount() {
    const { userId } = this.props.match.params;
    axios
      .get(`/emailConfirmation/:${userId}`)
      .then(() => {
        console.log('userId sent successfully');
      })
      .catch(err => {
        console.log('Error in updating status');
      });
  }
  render() {
    return (
      <div>
        <h2>Email confirmation</h2>
        <p>your email has been confimed </p>
        <br></br>
        <a href='/sign-in'>Sign in ?</a>
      </div>
    );
  }
}
export default EmailConfirmation;

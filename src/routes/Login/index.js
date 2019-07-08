import React from 'react';
import { Input, Button } from 'antd';
import { changeLoginUserName, changePasswordValue, changeLoggedInValidation, changeWrongLoginOrPasswordValid } from '../../action';
import { connect } from 'react-redux';
import FetchApi from './FetchApi';
import './index.css';

class Login extends React.Component {

  async login(evt) {
    try {
      let responce = await FetchApi.post('/api/auth/login',  {
        user: {
          userName: this.props.login.userNameValue, 
          password: this.props.login.passwordValue
          }
        }
      );
      console.log(1);
      if (responce.data.token) {
        localStorage.setItem('token', responce.data.token);
        this.props.history.push('/');
      }
    }
    catch (e) {
      this.props.changeWrongLoginOrPasswordValid();
      localStorage.removeItem('token');
      console.log(2);    
    }

  }

  render() {
    return (
      <div>
        <h1>
          Login
        </h1>
        {this.props.login.wrongLoginOrPassword && (
          <div className="wrongLogin">
            Wrong login or Password... Try again.
          </div>
          )
        }
        <div>
          <div>
            Login
          </div>
          <div>
            <Input value={this.props.login.userNameValue} onChange={(e) => this.props.changeLoginUserName(e)} type="text" />
          </div>
        </div>
        <div>
          <div>
            Password
          </div>
          <div>
            <Input value={this.props.login.passwordValue} onChange={(e) => this.props.changePasswordValue(e)} type="password" />
          </div>
        </div>
        <div>
          <Button onClick={() => this.login()}>Login</Button>
        </div>
      </div>
      )
  }
}

const mapStateToProps = (state) => ({
  login: state,
});

const mapDispatchToProps = (dispatch) => ({
  changeLoginUserName: (e) => dispatch(changeLoginUserName(e)),
  changePasswordValue: (e) => dispatch(changePasswordValue(e)),
  changeLoggedInValidation: () => dispatch(changeLoggedInValidation()),
  changeWrongLoginOrPasswordValid: () => dispatch(changeWrongLoginOrPasswordValid()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
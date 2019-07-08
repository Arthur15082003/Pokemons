import React from 'react';
import { connect } from 'react-redux';
import FetchApi from '../Login/FetchApi';
import './index.css';
import { Button } from 'antd';
import { getLikesPokemons, changeLoggedInValidation } from '../../action';

class Likes extends React.Component {
  async componentDidMount() {
    await this.checkLoggedIn();
    await this.props.getLikesPokemons();
  } 

checkLoggedIn = async () => {
  let responce = await localStorage.getItem('token'); 
  if (responce) {
    this.props.changeLoggedInValidation();
  }
}

deleteItem = async (el) => {
  FetchApi.delete('/api/pokemons', {name: el.name});
  this.props.getLikesPokemons();
}

  render() {
    return (
      <div className="pokemon">
        {this.props.likes.loggedIn ? this.props.likes.likesPokemons.map((el, index) => (
          <div key={index} >
            <div style={{backgroundImage: `url(${el.image})`,}} className="image">
              <img src={el.image} alt="pokemon" />
            </div>
            <h3>
              {el.name}
            </h3>
            <div className="types">
              {el.types.map((item, index) => {
                return (  
                <p key={index} className={item === 'fire' ? 'red' : 'blue'}>
                  {item}
                </p>
                  )
              })}
            </div>
            <Button onClick={() => this.deleteItem(el)}>
              delete
            </Button>
          </div>
        )) : (
        <h1>
          Please Log in at first
        </h1>
        )
      }
      </div>
      )
  }
}

const mapStateToProps = state => ({
  likes: state,
});

const mapDispatchToProps = dispatch => ({
  getLikesPokemons: () => dispatch(getLikesPokemons()),
  changeLoggedInValidation: () => dispatch(changeLoggedInValidation()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Likes);
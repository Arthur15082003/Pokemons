import React from 'react';
import { connect } from 'react-redux';
import './index.css';
import image from '../../images.jpg';
import FetchApi from '../Login/FetchApi';

import { Input, Icon, Button, Spin, Menu, Dropdown, Modal} from 'antd';

import { getPokemons, changeInput, changeDropDown, changeSearch, changePagesCount, changeThisPage, changeFirstAndLastItems, changeValidateDropDownItems, changeCountItemsInThePage, changeLoaderValidation, deleteItemsArray, addTypes, addSelectedTypes, changeSearchValidation, deleteTypesSelectedArr, deleteTypesArr, changeLoggedInValidation, changeModalVisilbe } from '../../action';

let filteredItems = [];

class Home extends React.Component {

  async componentDidMount() {
    await this.checkLogin();
    for (let i = 1; i <= 10; i++) {
      await this.props.getPokemons(i);
    }
    await this.props.changeLoaderValidation();
  }

  getPok = async (number) => {
    filteredItems = [];
    this.props.deleteItemsArray();
    await this.props.deleteTypesSelectedArr();
    await this.props.changeLoaderValidation();
    await this.props.changeThisPage(number);
    this.props.deleteTypesArr();
    let firstItem;
    firstItem = 1 + (number - 1) * this.props.app.itemsInOnePage;
    let lastItem =  firstItem + this.props.app.itemsInOnePage - 1;
    await this.props.changeFirstAndLastItems(firstItem, lastItem);

    for (let i = firstItem; i <= lastItem; i++) {
      await this.props.getPokemons(i);
    }
    if (this.props.app.loading) {
      await this.props.changeLoaderValidation();
    }
  }

  setPagesCount = (number) => {
    this.props.changePagesCount(100, number);
    this.getPok(1);
  }

  checkLogin = async () => {
    let responce = await localStorage.getItem('token'); 
    if (responce) {
      this.props.changeLoggedInValidation();
    } else {
      if (this.props.app.loggedIn) {
        this.props.changeLoggedInValidation();        
      }
    }
  }

  OnLikesButtonClick = async (el) => {
    if (this.props.app.loggedIn) {
      let url = '/api/pokemons';
      let { name, types, image } = el;
      await FetchApi.post(url, {name, types, image,});
    } else {
      this.props.changeModalVisilbe();
    }
  }

  render() {
    if (this.props.app.searchProp === 'name') {
      filteredItems = this.props.app.pokemonsData.filter(item => {
      return item.name.indexOf(this.props.app.search) !== -1;
      })
    }

    if (this.props.app.searchProp === 'type') {
      filteredItems = [];
        for (let i = 0; i < this.props.app.pokemonsData.length; i++) {
          for (let j= 0; j < this.props.app.pokemonsData[i].types.length; j++) {
            let check = this.props.app.selectedTypes.find(el => el === this.props.app.pokemonsData[i].types[j]);
            if (check) {
              let checkhaveItemInArray = filteredItems.find(el => el === this.props.app.pokemonsData[i])
              if (!checkhaveItemInArray) {
                filteredItems = [...filteredItems, this.props.app.pokemonsData[i]];
              }
            }
          }
        }
    }
    return (
      <div style={{backgroundColor: '#FCFCFC'}}>
        <main style={{marginLeft: '60px', marginRight: '60px', backgroundColor: '#fff'}}>
            <header className='header'>
              {this.props.app.searchValidation ? (
                <div>
                  <Button onClick={() => {
                    this.props.changeSearchValidation();
                    this.props.changeSearch('name');
                    }}>Back</Button>
                  <div>
                    <div>
                      <Dropdown overlay={
                        <Menu>
                          <Menu.Item onClick={() => this.props.changeSearch('name')}>
                            Name
                          </Menu.Item>
                          <Menu.Item onClick={() => this.props.changeSearch('type')}>
                            Type
                          </Menu.Item>
                        </Menu>
                       }>
                        <a className="ant-dropdown-link" href="#">
                          Search By <Icon type="down" />
                        </a>                 
                      </Dropdown>
                    </div>
                    <div>
                      {this.props.app.searchProp === 'name' && (
                        <div>
                          <Input type='text' value={this.props.app.search} onChange={(e) => {this.props.changeInput(e)}} /> 
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    {this.props.app.searchProp === 'type' && (
                      <div>
                        {this.props.app.types.map((el, index) => {
                          return (
                            <Button
                             className={this.props.app.selectedTypes.find(item => item === el) && 'selectedButton'} 
                             key={index} 
                             onClick={() => this.props.addSelectedTypes(el, this.props.app.selectedTypes)}
                            >
                              {el}
                            </Button>
                          )
                        })}
                    </div>
                    )}
                  </div>
                </div>
                ):(
                  <Button onClick={this.props.changeSearchValidation}>Search</Button>
                ) 

              }
              <div>
                <Dropdown overlay={
                  <Menu>
                    <Menu.Item onClick={() => this.setPagesCount(5)}>
                        5
                    </Menu.Item>
                    <Menu.Item onClick={() => this.setPagesCount(10)}>
                        10
                    </Menu.Item>
                    <Menu.Item onClick={() => this.setPagesCount(50)}>
                        50
                    </Menu.Item>
                  </Menu>
                  }>
                  <a className="ant-dropdown-link" href="#">
                    Items in one Page <Icon type="down" />
                  </a>
                </Dropdown>
              </div>
              <Modal
                visible={this.props.app.modalVisible}
                onOk={() => {this.props.changeModalVisilbe(); this.props.history.push('/login')}}
                onCancel={() => this.props.changeModalVisilbe()}
              >
                <h1>Please login at first</h1>
                <p>Do you want to login?</p>
              </Modal>
              <div>
                <Button onClick={() => this.props.history.push('likes')}>
                  likes
                </Button>
              </div>
              
            </header>
            {this.props.app.loading ? (
              <div className="spin">
                <Spin />
              </div>
            ) : (
                <div className="body" style={{backgroundImage: `url(${image})`}}>
                  <div className="pokemonsList">
                    {filteredItems.map((el, index) => {   
                      return (  
                        <div key={index} className="pokemon">
                          <h1>
                            {el.number}
                          </h1>
                          <div style={{backgroundImage: `url(${el.image})`,}} className="image">
                          </div>
                          <h3>
                            {el.name}
                          </h3>
                          <div className="types">
                            {el.types.map((item, index) => {
                              this.props.addTypes(item, this.props.app.types); 
                              return (  
                              <p key={index} className={item === 'fire' ? 'red' : 'blue'}>
                                {item}
                              </p>
                                )
                            })}
                          </div>
                          <Button onClick={() => this.OnLikesButtonClick(el)}>Like</Button>
                        </div>
                      ) 
                    })}
                  </div>
                  <div className="numbers">
                    {this.props.app.pages.map((number, item) => (
                      <div key={item} className={number === this.props.app.thisPage ? 'bold' : 'number'} onClick={() => {
                        if (number !== this.props.app.thisPage) {
                          this.getPok(number);
                        }
                      }}>
                        {number}
                      </div>
                    ))

                    }
                  </div>
                </div>
            )}
        </main>
      </div> 

      );
  }
}

const mapStateToProps = state => ({
  app: state
});

const mapDispatchToProps = dispatch => ({
  getPokemons: (number) => dispatch(getPokemons(number)),
  changeInput: e => dispatch(changeInput(e)),
  changeDropDown: () => dispatch(changeDropDown()),
  changeSearch: (searchProperties) => dispatch(changeSearch(searchProperties)),
  changePagesCount: (items, itemsInOnePage) => dispatch(changePagesCount(items, itemsInOnePage)),
  changeThisPage: (number) => dispatch(changeThisPage(number)),
  changeFirstAndLastItems: (firstItem, lastItem) => dispatch(changeFirstAndLastItems(firstItem, lastItem)),
  changeValidateDropDownItems: () => dispatch(changeValidateDropDownItems()),
  changeCountItemsInThePage: (number) => dispatch(changeCountItemsInThePage(number)),
  changeLoaderValidation: () => dispatch(changeLoaderValidation()),
  deleteItemsArray: () => dispatch(deleteItemsArray()),
  addTypes: (item, typesArr) => dispatch(addTypes(item, typesArr)),
  addSelectedTypes: (item, typesArr) => dispatch(addSelectedTypes(item, typesArr)),
  changeSearchValidation: () => dispatch(changeSearchValidation()),
  deleteTypesSelectedArr: () => dispatch(deleteTypesSelectedArr()),
  deleteTypesArr: () => dispatch(deleteTypesArr()),
  changeLoggedInValidation: () => dispatch(changeLoggedInValidation()),
  changeModalVisilbe: () => dispatch(changeModalVisilbe()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
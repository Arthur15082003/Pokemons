import FetchApi from './routes/Login/FetchApi';

export const getPokemons = (number) => (dispatch) => {
  let url = `https://pokeapi.co/api/v2/pokemon/${number}/`;
      let imageUrl;
      return fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
        },
      })
      .then(res => res.json())
      .catch(error => {
        console.error(error);
        return;
      })
      .then(data => {
       let typeNames = data.types.map(el => {
        return el.type.name});
       if (number < 10) {
        imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/00${number}.png`;
       }
       if (number < 100 && number >= 10) {
        imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/0${number}.png`;
       }
       if (number >= 100) {
        imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${number}.png`;
       }
       let obj = {
         name: data.name,
         types: typeNames,
         image: imageUrl,
         number: data.id,
       }
      dispatch({
        type: 'GETTING_POKEMONS',
        payload: obj,
      });
      })
      .catch(error => {
        console.error(error);
      })

};

export const changeInput = (e) => dispatch => {
  dispatch({
    type: 'CHANGE_INPUT_VALUE',
    payload: e.target.value,  
  })
  
};

export const changeDropDown = () => dispatch => {
  dispatch({
    type: 'CHANGE_DROP_DOWN_MENU_VALIDTION'
  })
}

export const changeSearch = (searchProperties) => dispatch => {
  dispatch({
    type: 'SET_SEARCH_PROPERTY',
    payload: searchProperties,
  })
}

export const changePagesCount = (items, itemsInOnePage) => dispatch => {
  let pagesCount;
  let arr = [];
  if (items % itemsInOnePage === 0) {
    pagesCount = items / itemsInOnePage;

  } else {
    pagesCount = Math.floor(items / itemsInOnePage);
  }
  for (let i = 1; i <= pagesCount; i++) {
    arr.push(i);
  }
  dispatch({
    type: 'SET_PAGES_COUNT',
    payloadArr: arr,
    payload: pagesCount,
    payload2: itemsInOnePage,
  })

}

export const changeThisPage = (number) => dispatch => {
  dispatch({
    type: 'HANDLE_CHANGE_THIS_PAGE',
    payload: number,
  })
}

export const changeFirstAndLastItems = (firstItem, lastItem) => dispatch => {
  dispatch({
    type: 'HANDLE_CHANGE_FIRST_AND_LAST_ITEMS',
    payload1: firstItem,
    payload2: lastItem,
  })
}

export const changeValidateDropDownItems = () => dispatch => {
  dispatch({
    type: 'HANDLE_CHANGE_VALIDATION_DROPDOWN_ITEMS',
  })
}

export const changeCountItemsInThePage = (number) => dispatch => {
  dispatch({
    type: 'HANDLE_CHANGE_COUNT_ITEMS_IN_THE_PAGE',
    payload: number,
  })
}

export const changeLoaderValidation = () => dispatch => {
  dispatch({
    type: 'HANDLE_CHANGE_LOADING_VALIDATION',
  })
}

export const deleteItemsArray = () => dispatch => {
  let arr = [];
  dispatch({
    type: 'DELATE_ALL_ITEMS_OF_ARRAY',
    payload: arr,
  })
}

export const addTypes = (item, typesArr) => dispatch => {
  let check = typesArr.find(el => el === item);
  if (!check) {
    typesArr.push(item);
    dispatch({
      type: 'ADD_TYPES',
      payload: typesArr,
    })
  }
}

export const deleteTypesSelectedArr = () => dispatch => {
  let arr = [];
  dispatch({
    type: 'HANDLE_DELETE_TYPES_SELECTED_ITEMS',
    payload: arr,
  })
}

export const addSelectedTypes = (item, typesArr) => dispatch => {
 let check = typesArr.find(el => el === item);
  if (check) {
    let index = typesArr.indexOf(item);
    if (index > -1) {
      typesArr.splice(index, 1);
      dispatch({
        type: 'ADD_SELECTED_TYPES',
        payload: typesArr,  
      })
    }
    
  } else {
    typesArr.push(item);
    dispatch({
      type: 'ADD_SELECTED_TYPES',
      payload: typesArr,
    })
  }
}

export const changeSearchValidation = () => dispatch => {
  dispatch({
    type: 'HANDLE_CHANGE_SEARCH_VALIDATION'
  })
}

export const deleteTypesArr = () => dispatch => {
  let arr = [];
  dispatch({
    type: 'DELETE_ALL_ITEMS_OF_TYPES_ARRAY',
    payload: arr,
  })
}

export const changeLoginUserName = (e) => dispatch => {
  dispatch({
    type: 'HANDLE_CHANGE_LOGIN_USERNAME_VALUE',
    payload: e.target.value,
  })
}

export const changePasswordValue = (e) => dispatch => {
  dispatch({
    type: 'HANDLE_CHANGE_LOGIN_PASSWORD_VALUE',
    payload: e.target.value,
  })
}

export const changeLoggedInValidation = () => dispatch => {
  dispatch({
    type: 'HANDLE_CHANGE_LOGGED_IN_VALIDATION',
  })
}

export const changeModalVisilbe = () => dispatch => {
  dispatch({
    type: 'HANDLE_CHANGE_MODAL_VISIBLE',
  })
}

export const getLikesPokemons = () => dispatch => {
  let url = '/api/pokemons';
  let responce = FetchApi.get(url);
  responce.then((result) => {
    dispatch({
      type: 'GET_LIKES_POKEMONS',
      payload: result.data.data,
    });
  });  
};

export const changeWrongLoginOrPasswordValid = () => dispatch => {
  dispatch({
    type: 'CHANGE_WRONG_LOGIN_OR_PASSWORD_VALID',
  })
}
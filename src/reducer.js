const initalState = {
  pokemonsData: [],
  search: '',
  dropDown: false,
  searchProp: 'name',
  itemsInOnePage: 10,
  pagesCount: 5,
  pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  thisPage: 1,
  firstItemFirstPage: 1,
  lastItemFirstPage: 10,
  loading: true,
  types: [],
  selectedTypes: [],
  searchValidation: false,
  userNameValue: '',
  passwordValue: '',
  loggedIn: false,
  likesPokemons: [],
  modalVisible: false,
  wrongLoginOrPassword: false,
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case 'GETTING_POKEMONS':
      return {
        ...state,
        pokemonsData: [...state.pokemonsData, action.payload],
      }
    case 'CHANGE_INPUT_VALUE':
      return {
        ...state,
        search: action.payload,
      }
    case 'CHANGE_DROP_DOWN_MENU_VALIDTION':
      return {
        ...state,
        dropDown: !state.dropDown,
      }
    case 'SET_SEARCH_PROPERTY':
      return {
        ...state,
        searchProp: action.payload,
      }
    case 'SET_PAGES_COUNT':
      return {
        ...state,
        pages: action.payloadArr,
        pagesCount: action.payload,
        itemsInOnePage: action.payload2,
        lastItemFirstPage: action.payload2,
      }

    case 'HANDLE_CHANGE_THIS_PAGE':
      return {
        ...state,
        thisPage: action.payload,
      } 
    case 'HANDLE_CHANGE_FIRST_AND_LAST_ITEMS':
      return {
        ...state,
        firstItem: action.payload1,
        lastItem: action.payload2,
      }
    case 'HANDLE_CHANGE_VALIDATION_DROPDOWN_ITEMS':
      return {
        ...state,
        dropDownItems: !state.dropDownItems
      }
    case 'HANDLE_CHANGE_COUNT_ITEMS_IN_THE_PAGE':
      return {
        ...state,
        itemsInOnePage: action.payload,
      }
    case 'HANDLE_CHANGE_LOADING_VALIDATION':
      return {
        ...state,
        loading: !state.loading,
      }
    case 'DELATE_ALL_ITEMS_OF_ARRAY':
      return {
        ...state,
        pokemonsData: action.payload,  
      }
    case 'ADD_TYPES':
      return {
        ...state,
        types: action.payload,
      }
    case 'ADD_SELECTED_TYPES':
      return {
        ...state,
        selectedTypes: action.payload,
      }
    case 'HANDLE_CHANGE_SEARCH_VALIDATION':
      return {
        ...state,
        searchValidation: !state.searchValidation,
      }

    case 'HANDLE_DELETE_TYPES_SELECTED_ITEMS':
      return {
        ...state,
        selectedTypes: action.payload,
      }
    case 'DELETE_ALL_ITEMS_OF_TYPES_ARRAY':
      return {
        ...state,
        types: action.payload,
      }
    case 'HANDLE_CHANGE_LOGIN_USERNAME_VALUE':
      return {
        ...state,
        userNameValue: action.payload,
      }
    case 'HANDLE_CHANGE_LOGIN_PASSWORD_VALUE':
      return {
        ...state,
        passwordValue: action.payload,
      }

    case 'HANDLE_CHANGE_LOGGED_IN_VALIDATION':
      return {
        ...state,
        loggedIn: !state.loggedIn,
      }
    case 'HANDLE_CHANGE_MODAL_VISIBLE':
      return {
        ...state,
        modalVisible: !state.modalVisible,
      }
    case 'GET_LIKES_POKEMONS':
      return {
        ...state,
        likesPokemons: action.payload,
      }

    case 'CHANGE_WRONG_LOGIN_OR_PASSWORD_VALID':
      return {
        ...state,
        wrongLoginOrPassword: !state.wrongLoginOrPassword,
      }

    default:
      return state
  }
}

export default reducer;
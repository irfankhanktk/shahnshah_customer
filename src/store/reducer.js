import * as Actions from './action-types';

const INITIAL_STATE = {
  user_info: {
    first_name: 'Irfan',
    last_name: 'khan',
    email: 'irfan@gmail.com',
    image: null,
    role: 2,
  },
  online_users: {},
  users: {
    data: [],
    pagination: {},
  },
  home_categories: {
    data: [],
    pagination: {},
  },
  categories: {
    data: [],
    pagination: {},
  },
  joined_groups: {
    data: [],
    pagination: {},
  },
  un_joined_groups: {
    data: [],
    pagination: {},
  },
  chat_list: [],
  notifications: {
    data: [],
    pagination: {},
  },
  comments: [],
  messages: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Actions.SET_USER_INFO:
      return {
        ...state,
        user_info: action.payload,
      };
    case Actions.SET_ONLINE_USERS:
      return {
        ...state,
        online_users: action.payload,
      };
    case Actions.SET_HOME_CATEGORIES:
      return {
        ...state,
        home_categories: action.payload,
      };
    case Actions.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case Actions.SET_JOINED_GROUPS:
      return {
        ...state,
        joined_groups: action.payload,
      };
    case Actions.SET_UN_JOINED_GROUPS:
      return {
        ...state,
        un_joined_groups: action.payload,
      };
    case Actions.SET_CHAT_LIST:
      return {
        ...state,
        chat_list: action.payload,
      };
    case Actions.SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
      };
    case Actions.SET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };
    case Actions.SET_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      };
    case Actions.SET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case Actions.SET_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

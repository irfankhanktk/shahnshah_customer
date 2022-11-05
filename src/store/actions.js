import {
  SET_MESSAGES,
  SET_JOINED_GROUPS,
  SET_UN_JOINED_GROUPS,
  SET_USERS,
  SET_USER_INFO,
  SET_SOCKET,
  SET_HOME_CATEGORIES,
} from './action-types';

const setUserInfo = payload => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_USER_INFO,
      payload,
    });
  };
};
const setSocket = payload => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_SOCKET,
      payload,
    });
  };
};
const clearHomePosts = () => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_HOME_CATEGORIES,
      payload: {
        data: [],
        pagination: {},
      },
    });
  };
};
const clearUsers = () => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_USERS,
      payload: {
        data: [],
        pagination: {},
      },
    });
  };
};
const clearGroups = () => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_JOINED_GROUPS,
      payload: {
        data: [],
        pagination: {},
      },
    });
    dispatch({
      type: SET_UN_JOINED_GROUPS,
      payload: {
        data: [],
        pagination: {},
      },
    });
  };
};
const setGroupsOnJoin = group_id => {
  return async (dispatch, getState) => {
    try {
      let un_joined_groups = {...getState().state.un_joined_groups};
      const index = un_joined_groups?.data?.findIndex(x => x.id === group_id);
      const group = un_joined_groups?.data?.splice(index, 1);

      let joined_groups = {...getState().state.joined_groups};
      if (un_joined_groups?.pagination?.total_records % 10 === 1) {
        un_joined_groups = {
          ...un_joined_groups,
          pagination: {
            total_pages: un_joined_groups?.pagination?.total_pages - 1,
            total_records: un_joined_groups?.pagination?.total_records - 1,
          },
        };
      } else {
        un_joined_groups = {
          ...un_joined_groups,
          pagination: {
            ...un_joined_groups?.pagination,
            total_records: un_joined_groups?.pagination?.total_records - 1,
          },
        };
      }

      if (joined_groups?.pagination?.total_records % 10 === 9) {
        joined_groups = {
          data: [
            ...joined_groups.data,
            {...group[0], total_members: group[0]?.total_members + 1},
          ],
          pagination: {
            total_pages: joined_groups?.pagination?.total_pages + 1,
            total_records: joined_groups?.pagination?.total_records + 1,
          },
        };
      } else {
        joined_groups = {
          data: [
            ...joined_groups.data,
            {...group[0], total_members: group[0]?.total_members + 1},
          ],
          pagination: {
            ...joined_groups?.pagination,
            total_records: joined_groups?.pagination?.total_records + 1,
          },
        };
      }

      dispatch({
        type: SET_JOINED_GROUPS,
        payload: joined_groups,
      });
      dispatch({
        type: SET_UN_JOINED_GROUPS,
        payload: un_joined_groups,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

const setGroupsOnLeave = group_id => {
  return async (dispatch, getState) => {
    try {
      let joined_groups = {...getState().state.joined_groups};
      const index = joined_groups?.data?.findIndex(x => x.id === group_id);
      const group = joined_groups?.data?.splice(index, 1);
      if (joined_groups?.pagination?.total_records % 10 === 1) {
        joined_groups = {
          ...joined_groups,
          pagination: {
            total_pages: joined_groups?.pagination?.total_pages - 1,
            total_records: joined_groups?.pagination?.total_records - 1,
          },
        };
      } else {
        joined_groups = {
          ...joined_groups,
          pagination: {
            ...joined_groups?.pagination,
            total_records: joined_groups?.pagination?.total_records - 1,
          },
        };
      }

      let un_joined_groups = {...getState().state.un_joined_groups};
      if (un_joined_groups?.pagination?.total_records % 10 === 9) {
        un_joined_groups = {
          data: [
            ...un_joined_groups.data,
            {...group[0], total_members: group[0]?.total_members - 1},
          ],
          pagination: {
            total_pages: un_joined_groups?.pagination?.total_pages + 1,
            total_records: un_joined_groups?.pagination?.total_records + 1,
          },
        };
      } else {
        un_joined_groups = {
          data: [
            ...un_joined_groups.data,
            {...group[0], total_members: group[0]?.total_members - 1},
          ],
          pagination: {
            ...un_joined_groups?.pagination,
            total_records: un_joined_groups?.pagination?.total_records + 1,
          },
        };
      }

      dispatch({
        type: SET_JOINED_GROUPS,
        payload: joined_groups,
      });
      dispatch({
        type: SET_UN_JOINED_GROUPS,
        payload: un_joined_groups,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

const setMessages = payload => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_MESSAGES,
      payload: [...getState().state.messages, payload],
    });
  };
};

export const ACTIONS = {
  setGroupsOnLeave,
  setGroupsOnJoin,
  clearHomePosts,
  setSocket,
  setUserInfo,
  setMessages,
  clearUsers,
  clearGroups,
};

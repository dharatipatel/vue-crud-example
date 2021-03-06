import EventServices from "@/services/EventServices.js";

export const namespaced = true;

export const state = {
  eventsTotal: 0,
  events: [],
  event: {},
  perPage: 3
};
export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event);
  },
  SET_EVENTS(state, events) {
    state.events = events;
  },
  SET_EVENTS_COUNT(state, eventsTotal) {
    state.eventsTotal = eventsTotal;
  },
  SET_EVENT(state, event) {
    state.event = event;
  }
};
export const actions = {
  createEvent({ commit, dispatch }, event) {
    return EventServices.postEvent(event)
      .then(() => {
        commit("ADD_EVENT", event);
        const notification = {
          type: "success",
          message: "Your event is created successfully"
        };
        dispatch("notification/add", notification, { root: true });
      })
      .catch(error => {
        const notification = {
          type: "error",
          message: "There was a problem creating an event: " + error.message
        };
        dispatch("notification/add", notification, { root: true });
      });
  },
  fetchEvents({ commit, dispatch, state }, { page }) {
    return EventServices.getEvents(state.perPage, page)
      .then(response => {
        commit("SET_EVENTS", response.data);
        commit("SET_EVENTS_COUNT", response.headers["x-total-count"]);
      })
      .catch(error => {
        const notification = {
          type: "error",
          message: "There was a problem fetching events: " + error.message
        };
        dispatch("notification/add", notification, { root: true });
      });
  },
  fetchEvent({ commit, getters }, id) {
    var event = getters.getEventById(id);
    if (event) {
      commit("SET_EVENT", event);
      return event;
    } else {
      return EventServices.getEvent(id).then(response => {
        commit("SET_EVENT", response.data);
        return response.data;
      });
      // .catch(error => {
      //   const notification = {
      //     type: "error",
      //     message: "There was a problem fetching event: " + error.message
      //   };
      //   dispatch("notification/add", notification, { root: true });
      // });
    }
  }
};
export const getters = {
  getEventById: state => id => {
    return state.events.find(event => event.id === id);
  }
};

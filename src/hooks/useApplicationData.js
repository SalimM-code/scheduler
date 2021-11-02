import { useState, useEffect } from "react";
import axios from "axios";
import { updateSpotsForDay } from "helpers/selectors";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  

  useEffect(() => {
    Promise.all([
      axios.get("api/days"),
      axios.get("api/appointments"),
      axios.get("api/interviewers"),
    ])
      .then((all) => {
        console.log(all);
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      })
      .catch((error) => console.log("Error from promise.all", error));
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      let days = updateSpotsForDay(state.days, appointments, state.day)

      setState((prevState) => {
        const pendingState = { ...prevState, appointments, days };


        return pendingState;
      });
    });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      let days = updateSpotsForDay(state.days, appointments, state.day)
      setState((prevState) => {
        const pendingState = { ...prevState, appointments, days };

        return pendingState;
      });
    });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  
  };
};

export default useApplicationData;
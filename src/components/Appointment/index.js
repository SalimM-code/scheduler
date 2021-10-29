import React from "react";
import "components/Appointment/style.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

const Appointment = (props) => {
  const {id, interview, time} = props

  return (
    <article className="appointment">
      <Header time={time} />
      {props.interview ? <Show student={interview.student} interviewer={interview.interviewer}/> : <Empty />}

    </article>
  );
};

export default Appointment;

import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

const InterviewerList = (props) => {
  const {interviewers, onChange, value} = props;
  const interviewerItem = interviewers && interviewers.map(interviewerP => 

    <InterviewerListItem
      key={interviewerP.id}
      setInterviewer={(e) => onChange(interviewerP.id)}
      name={interviewerP.name}
      avatar={interviewerP.avatar}
      selected = {interviewerP.id === value}
    />
  )
  return (
  <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">
      {interviewerItem}
    </ul>
  </section>
  )
}

export default InterviewerList
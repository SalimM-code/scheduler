import React, { useState } from 'react';
import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';

const Form = (props) => {
  
  //  {student, interviewer, interviewers, onSave, onCancel}
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = () => {
    setStudent("")
    setInterviewer(null)
  }

  const cancel = () => {
    reset()
    props.onCancel()
  }
  

  return(
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form onSubmit={(e) => e.preventDefault()} autoComplete="off">
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          placeholder="Enter Student Name"
          value={student}
          onChange={(e) => setStudent(e.target.value)}
         
        />
      </form>
      <InterviewerList 
        interviewers={props.interviewers}
        value={interviewer}
        onChange={setInterviewer}
      />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button onClick={cancel} danger >Cancel</Button>
        <Button onClick={() => props.onSave(student,interviewer)} confirm >Save</Button>
      </section>
    </section>
  </main>
  )
}

export default Form;
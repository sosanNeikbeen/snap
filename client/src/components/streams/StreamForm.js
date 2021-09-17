// import React from "react";
// import { Field, reduxForm } from "redux-form";

// class StreamForm extends React.Component {
//   renderError({ error, touched }) {
//     if (touched && error) {
//       return (
//         <div className="ui error message">
//           <div className="header">{error}</div>
//         </div>
//       );
//     }
//   }

//   renderInput = ({ input, label, meta }) => {
//     const className = `field ${meta.error && meta.touched ? "error" : ""}`;
//     return (
//       <div className={className}>
//         <label>{label}</label>
//         <input {...input} />
//         {this.renderError(meta)}
//       </div>
//     );
//   };

//   onSubmit = (formValues) => {
//     this.props.onSubmit(formValues);
//   };

//   render() {
//     return (
//       <form
//         onSubmit={this.props.handleSubmit(this.onSubmit)}
//         className="ui form error"
//       >
//         <Field name="title" component={this.renderInput} label="Enter Title" />
//         <Field
//           name="description"
//           component={this.renderInput}
//           label="Enter Description"
//         />
//         <button className="ui button primary">submit</button>
//       </form>
//     );
//   }
// }

// const validate = (formValues) => {
//   const errors = {};
//   if (!formValues.title) {
//     errors.title = "You must enter a title";
//   }
//   if (!formValues.description) {
//     errors.description = "You must enter a description";
//   }
//   return errors;
// };

// export default reduxForm({
//   form: "streamForm",
//   validate,
// })(StreamForm);

import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useGoogleAuth } from "../../context/AuthContext";
import { createStream } from "../../apis/streams";

const StreamForm = (props) => {
  const [userId, setUserId] = useState();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const history = useHistory();
  const { isSignedIn, auth2 } = useGoogleAuth();
  // const auth = useGoogleAuth().auth2.currentUser.get();

  if (isSignedIn) {
    const userId = auth2.currentUser.get().getId();
  }
  // if (auth2.currentUser.get()) {
  //   const userId = auth2.currentUser.get().getId();
  //   console.log(userId);
  // }

  // if (isSignedIn) {
  //   const userId = useGoogleAuth().auth2.currentUser.get().getId();
  //   console.log(userId);
  // }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const data = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      userId: userId,
    };
    props.onSubmit(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="ui form">
        <div className="field">
          <label>title</label>
          <input
            type="text"
            name="title"
            ref={titleRef}
            placeholder="First Name"
          />
        </div>
        <div className="field">
          <label>Last Name</label>
          <input
            type="text"
            name="description"
            ref={descriptionRef}
            placeholder="Last Name"
          />
        </div>
        <button className="ui button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default StreamForm;

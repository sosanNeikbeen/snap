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

const PostForm = (props) => {
  const [userId, setUserId] = useState();
  const [file, setFile] = useState(null);
  const postRef = useRef();
  const imageRef = useRef();
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
  const uploadSingleFile = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const data = {
      post: postRef.current.value,
      image: file,
      // userId: userId,
    };
    props.onSubmit(data);
  };
  let imgPreview;
  if (file) {
    imgPreview = <img src={file} alt="" />;
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="ui form">
        <div className="field">
          <textarea
            class="textarea is-info"
            placeholder="Whats on your mind"
            ref={postRef}
            name="post"
          ></textarea>
        </div>
        <div class="file has-name is-fullwidth">
          <label class="file-label">
            <input
              class="file-input"
              type="file"
              name="image"
              ref={imageRef}
              onChange={uploadSingleFile}
            />
            <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-upload"></i>
              </span>
              <span class="file-label">Choose a file…</span>
            </span>
            <span class="file-name">
              Screen Shot 2017-07-29 at 15.54.25.png
            </span>
          </label>
        </div>
        <article>{imgPreview}</article>

        <button className="ui button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostForm;

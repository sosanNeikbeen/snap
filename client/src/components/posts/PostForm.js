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
import { storage } from "../../firebase";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { useGoogleAuth } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

const PostForm = (props) => {
  const [userId, setUserId] = useState();
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [imageUrl, setImageUrl] = useState();
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
    setImage(e.target.files[0]);
    setCurrentImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (image == null) return;
    const storageRef = ref(storage, `images/${image.name}`);

    await uploadBytes(storageRef, image);
    const url = await getDownloadURL(storageRef);

    const data = {
      post: postRef.current.value,
      image: url,
      // userId: userId,
    };
    props.onSubmit(data);
    history.push("/");
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="ui form"
      >
        <div className="field">
          {currentImage ? (
            <figure>
              <img src={currentImage} alt="" />
            </figure>
          ) : (
            <div className="columns is-centered is-mobile">
              <div className="column is-three-fifths is-offset-one-fifth">
                <button className="button is-dark">
                  <input
                    class="file-input"
                    type="file"
                    name="image"
                    ref={imageRef}
                    onChange={uploadSingleFile}
                  />
                  <span class="icon">
                    <FontAwesomeIcon icon={faCamera} />
                  </span>
                  <span>Add Photo</span>
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="field">
          <textarea
            class="textarea is-info"
            placeholder="Write caption"
            ref={postRef}
            name="post"
          ></textarea>
        </div>

        <button className="ui button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostForm;

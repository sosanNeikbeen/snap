import React, { useRef, useState, FC } from "react";
import { storage } from "../../firebase";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { useAuth } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { Post } from "../../interfaces/index";

interface Props {
  onSubmit: (data: Post) => void;
}

const PostForm: FC<Props> = ({ onSubmit }) => {
  const { currentUser } = useAuth();
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const postRef = useRef<HTMLTextAreaElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const uploadSingleFile = (e) => {
    setImage(e.target.files[0]);
    setCurrentImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (image == null) return;
    const storageRef = ref(storage, `images/${image.name}`);

    await uploadBytes(storageRef, image);
    const url = await getDownloadURL(storageRef);

    const data = {
      post: postRef.current.value,
      image: url,
      userId: currentUser.userId,
    };
    onSubmit(data);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="form"
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
                    className="file-input"
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    name="image"
                    ref={imageRef}
                    onChange={uploadSingleFile}
                  />
                  <span className="icon">
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
            className="textarea is-info"
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

import React, { useState } from "react";
import Modal from "./Modal";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { storage } from "../firebase";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

const ProfileEdit: React.FC = () => {
  const { editUserProfile } = useAuth();
  const history = useHistory();
  const url = window.location.pathname;
  const id: string = url.substring(url.lastIndexOf("/") + 1);
  const [image, setImage] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  const uploadSingleFile = (e) => {
    setImage(e.target.files[0]);
    setCurrentImage(URL.createObjectURL(e.target.files[0]));
  };

  const cropAndUpload = async (e) => {
    e.preventDefault();
    if (image == null) return;
    const storageRef = ref(storage, `user-profile/${image.name}`);
    await uploadBytes(storageRef, image);
    const url = await getDownloadURL(storageRef);
    const data = {
      picture: url,
    };
    try {
      editUserProfile(id, data);
      history.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  const onClickCancel = () => {
    history.goBack();
  };

  const renderActions = () => {
    return (
      <div>
        <button onClick={cropAndUpload} className="button is-info">
          Upload
        </button>
        <button onClick={onClickCancel} className="button">
          Cancel
        </button>
      </div>
    );
  };

  const renderContent = () => {
    return (
      <form encType="multipart/form-data" className="form">
        <div className="field">
          {currentImage ? (
            <figure className="crop-container">
              <img src={currentImage} alt="" />

              {/* <ImageCropper getBlob={getBlob} inputImg={image} /> */}
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
      </form>
    );
  };

  return (
    <div>
      <Modal
        title="Upload profile picture"
        content={renderContent()}
        actions={renderActions()}
        onDismiss={onClickCancel}
      />
    </div>
  );
};

export default ProfileEdit;

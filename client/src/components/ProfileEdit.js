import React, { useState, useRef, useCallback } from "react";
import Modal from "./Modal";
import { useHistory } from "react-router-dom";
import ImageCropper from "./ImageCropper";
import { useAuth } from "../context/AuthContext";
import { storage } from "../firebase";
import { getCroppedImg } from "../utils/helpers";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

const ProfileEdit = () => {
  const { editUserProfile } = useAuth();
  const [blob, setBlob] = useState(null);
  const history = useHistory();
  const url = window.location.pathname;
  const id = url.substring(url.lastIndexOf("/") + 1);
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const imageRef = useRef();

  const getBlob = (blob) => {
    // pass blob up from the ImageCropper component
    setBlob(blob);
  };

  const uploadSingleFile = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      () => {
        setImage(reader.result);
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
    setCurrentImage(URL.createObjectURL(e.target.files[0]));
  };

  // const cropAndUpload = useCallback(
  //   async (e) => {
  //     e.preventDefault();
  //     const croppedImage = await getCroppedImg(image, croppedAreaPixels);
  //     console.log(croppedImage);
  //     if (croppedImage == null) return;
  //     const storageRef = ref(storage, `user-profile/${croppedImage.name}`);

  //     await uploadBytes(storageRef, croppedImage);
  //     const url = await getDownloadURL(storageRef);

  //     const data = {
  //       picture: url,
  //     };
  //     try {
  //       editUserProfile(id, data);
  //       history.goBack();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   },
  //   [croppedAreaPixels]
  // );

  const cropAndUpload = async (e) => {
    e.preventDefault();
    if (blob == null) return;
    const storageRef = ref(storage, `user-profile/${blob.name}`);

    await uploadBytes(storageRef, blob);
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
              {/* <img src={currentImage} alt="" /> */}

              <ImageCropper getBlob={getBlob} inputImg={image} />
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

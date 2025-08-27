"use client";

import { useRef, useState } from "react";
import classes from "./ImagePicker.module.css";
import Image from "next/image";

export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState(null);

  const imageInput = useRef();

  function handleInputClick() {
    imageInput.current.click();
  }

  function handleImageChange(event) {
    const image = event.target.files[0];

    if (!image) {
      return setPickedImage(null);
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(image);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && <Image src={pickedImage} alt="Image picked by user" fill />}
        </div>
        <input
          type="file"
          id={name}
          name={name}
          accept="image/jpeg, image/png"
          className={classes.input}
          ref={imageInput}
          onChange={handleImageChange}
        />
        <button className={classes.button} type="button" onClick={handleInputClick}>
          Pick an Image
        </button>
      </div>
    </div>
  );
}

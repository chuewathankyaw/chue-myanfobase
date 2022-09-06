import React, { useState, useEffect } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { multiplefilesUpload } from "../data/api";
import "../postform.css";
import "../textform.css";


const FileUploadScreen = (props) => {
  const [multipleFiles, setMultipleFiles] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [multipleProgress, setMultipleProgress] = useState(0);

  

  const MultipleFileChange = (e) => {
    setMultipleFiles(e.target.files);
    setMultipleProgress(0);
  };

  
  const multipleFileOpltions = {
    onUploadProgress: (ProgressEvent) => {
      const { loaded, total } = ProgressEvent;
      const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
      setMultipleProgress(percentage);
    },
  };

  
  const UploadMultipleFiles = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    for (let i = 0; i < multipleFiles.length; i++) {
      formData.append("files", multipleFiles[i]);
    }
    await multiplefilesUpload(formData, multipleFileOpltions);
    props.getMultiple();
  };
  return (
    <div>
     
        <form>
          <div className="titleDiv">
            <h3>Title:</h3>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="enter title for your gallery"
              className="form-control"
            />
          </div>

          <div className="titleDiv">
            <h3>Description:</h3>
            <input
              type="text"
              onChange={(e) => setDesc(e.target.value)}
              placeholder="enter desc for your gallery"
              className="form-control"
            />
          </div>
          <br />
          <div>
            <div className="form-group">
              <label>Select Multiple File</label>
              <input
                type="file"
                onChange={(e) => MultipleFileChange(e)}
                className="form-control"
                multiple
              />
            </div>
          </div>
        </form>

        {/* <div className="row">
          <div className="col-6">
            <label>Title</label>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="enter title for your gallery"
              className="form-control"
            />
          </div>

          <div className="col-6">
            <div className="form-group">
              <label>Select Multiple File</label>
              <input
                type="file"
                onChange={(e) => MultipleFileChange(e)}
                className="form-control"
                multiple
              />
            </div>
          </div>
        </div> */}

        {/* <div className="row">
          <div className="col-13">
            <label>desc</label>
            <input
              type="text"
              onChange={(e) => setDesc(e.target.value)}
              placeholder="enter desc for your gallery"
              className="form-control"
            />
          </div>
        </div> */}

        <br></br>
        <div>
          <div>
            <button
              type="button"
              onClick={() => UploadMultipleFiles()}
              className="btn btn-danger"
            >
              Upload
            </button>
          </div>
          <div className="percentage-circle"> 
            <CircularProgressbar
              value={multipleProgress}
              text={`${multipleProgress}%`}
              styles={buildStyles({
                rotation: 0.25,
                strokeLinecap: "butt",
                textSize: "16px",
                pathTransitionDuration: 0.5,
                pathColor: `rgba(255, 136, 136, ${multipleProgress / 100})`,
                textColor: "#f88",
                trailColor: "#d6d6d6",
                backgroundColor: "#3e98c7",
              })}
            />
          </div>
        </div>
   
    </div>
  );
};

export default FileUploadScreen;

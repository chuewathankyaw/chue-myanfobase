import React from "react";
import "./postform.css";
import "./textform.css";
import Axios from 'axios'
import { useState, useEffect } from "react";

export default function UploadPost() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [listOfNews, setListOfNews] = useState([]);



 

  const upLoad = () => {
    Axios.post("https://chue-myanfobase.herokuapp.com/upload", {
      title: title,
      desc: desc,
    }).then((response) => {
      setListOfNews([
        ...listOfNews,
        { _id: response.data._id, title: title, desc: desc },
      ]);
    });
      
    
  
  };

  const updateNews = (id) => {
    const newDesc = prompt("Enter new Description!");
    Axios.put("https://chue-myanfobase.herokuapp.com/update", {
      newDesc: newDesc,
      id: id,
    }).then(() => {
      setListOfNews(
        listOfNews.map((val) => {
          return val._id == id
            ? { _id: id, title: val.title, desc: newDesc }
            : val;
        })
      );
    });
  }

  const deleteNews = (id) => {
    Axios.delete(`https://chue-myanfobase.herokuapp.com/delete/${id}`).then(
      () => {
        setListOfNews(
          listOfNews.filter((val) => {
            return val._id != id;
          })
        );
      }
    );
  };

  useEffect(() => {
    Axios.get("https://chue-myanfobase.herokuapp.com/read")
      .then((response) => {
        setListOfNews(response.data);
      })
      .catch(() => {
        console.log("ERR");
      });
  }, []);


  return (
    <>
      <form action="/upload" method="POST" encType="multipart/form-data">
        <div className="titleDiv">
          <h3>Title:</h3>
          <textarea
            className="titleForm"
            placeholder="Type title here..."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            rows={1}
            defaultValue=""
            required
          />
        </div>

        <div className="titleDiv">
          <h3>Description:</h3>
          <textarea
            className="titleForm"
            placeholder="Type title here..."
            onChange={(event) => {
              setDesc(event.target.value);
            }}
            rows={1}
            defaultValue=""
            required
          />
        </div>
        <br />
        <div className="imgDiv">
          <label htmlFor="file"> choose image</label>
          <input
            type="file"
            fileName="img"
            
          ></input>
        </div>
      </form>
      <button className="postButton" onClick={upLoad}>
        Post
      </button>

      {listOfNews.map((val) => {
        return (
          <>
            <div className="news-addpost">
              <h4>Title: {val.title}</h4>
              <p>Description: {val.desc}</p>
              <p>img: {}</p>
            </div>

            <button
              className="update-b"
              onClick={() => {
                updateNews(val._id);
              }}
            >
              Update
            </button>
            <button
              className="x-button"
              onClick={() => {
                deleteNews(val._id);
              }}
            >
              x
            </button>
          </>
        );
      })}
    </>
  );
}
// _id: response.data._id, 
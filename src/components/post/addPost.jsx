import "./postform.css";
import "./textform.css";
import React, { useState, useEffect } from "react";
import { getMultipleFiles } from "./data/api";
import FileUploadScreen from "./screens/fileUploadScreen";

function UploadPost() {
  const [multipleFiles, setMultipleFiles] = useState([]);

  

  const getMultipleFilesList = async () => {
    try {
      const fileslist = await getMultipleFiles();
      setMultipleFiles(fileslist);
      console.log(multipleFiles);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMultipleFilesList();
  }, []);

  return (
    <>
      <div className="container">
        <FileUploadScreen getMultiple={() => getMultipleFilesList()} />
      </div>
      <div className="container-fluid mt-5">
        <div className="col-6">
          <h4 className="titleOfMultiple text-success font-weight-bold">
            Muitiple Files List
          </h4>
          {multipleFiles.map((element, index) => (
            <div key={element._id}>
              <div className="setTitle">
                <h6 className="font-weight-bold">Title: {element.title}</h6>
                <h6 className="text-danger font-weight-bold">
                  Descriptions: {element.desc}
                </h6>
              </div>
              <div className="showlist row">
                {element.files.map((file, index) => (
                  <div className="col-6">
                    <div className="card mb-2 border-0 p-0">
                      <img
                        src={`https://chue-myanfobase.herokuapp.com/${file.filePath}`}
                        height="200"
                        className="card-img-top img-responsive "
                        alt="img"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default UploadPost;

// import React from "react";
// import "./postform.css";
// import "./textform.css";
// import Axios from 'axios'
// import { useState, useEffect } from "react";

// export default function UploadPost() {
//   const [title, setTitle] = useState("");
//   const [desc, setDesc] = useState("");
//   const [img, setImg] = useState("");
//   const [listOfNews, setListOfNews] = useState([]);

//   const upLoad = () => {
//     Axios.post("https://chue-myanfobase.herokuapp.com/upload", {
//       title: title,
//       desc: desc,
//       img: img,
//     }).then((response) => {
//       setListOfNews([
//         ...listOfNews,
//         { _id: response.data._id, title: title, desc: desc, img: img },
//       ]);
//     });

//   };

//   const updateNews = (id) => {
//     const newDesc = prompt("Enter new Description!");
//     Axios.put("https://chue-myanfobase.herokuapp.com/update", {
//       newDesc: newDesc,
//       id: id,
//     }).then(() => {
//       setListOfNews(
//         listOfNews.map((val) => {
//           return val._id == id
//             ? { _id: id, title: val.title, desc: newDesc }
//             : val;
//         })
//       );
//     });
//   }

//   const deleteNews = (id) => {
//     Axios.delete(`https://chue-myanfobase.herokuapp.com/delete/${id}`).then(
//       () => {
//         setListOfNews(
//           listOfNews.filter((val) => {
//             return val._id != id;
//           })
//         );
//       }
//     );
//   };

//   useEffect(() => {
//     Axios.get("https://chue-myanfobase.herokuapp.com/read")
//       .then((response) => {
//         setListOfNews(response.data);
//       })
//       .catch(() => {
//         console.log("ERR");
//       });
//   }, []);

//   return (
//     <>
//       <form action="/upload" method="POST">
//         <div className="titleDiv">
//           <h3>Title:</h3>
//           <textarea
//             className="titleForm"
//             placeholder="Type title here..."
//             onChange={(event) => {
//               setTitle(event.target.value);
//             }}
//             rows={1}
//             defaultValue=""
//             required
//           />
//         </div>

//         <div className="titleDiv">
//           <h3>Description:</h3>
//           <textarea
//             className="titleForm"
//             placeholder="Type title here..."
//             onChange={(event) => {
//               setDesc(event.target.value);
//             }}
//             rows={1}
//             defaultValue=""
//             required
//           />
//         </div>
//         <br />
//         <div className="imgDiv">
//           <label htmlFor="file"> choose image</label>
//           <input
//             type="file"
//             fileName="testImage"

//           ></input>
//         </div>
//       </form>
//       <button className="postButton" onClick={upLoad}>
//         Post
//       </button>

//       {listOfNews.map((val) => {

//         return (
//           <>
//             <div className="news-addpost">
//               <h4>Title: {val.title}</h4>
//               <p>Description: {val.desc}</p>
//               {/* <img src={`data:image/png,base64,${base64String}`} /> */}
//               <img src={val.image} alt="" />
//             </div>

//             <button
//               className="update-b"
//               onClick={() => {
//                 updateNews(val._id);
//               }}
//             >
//               Update
//             </button>
//             <button
//               className="x-button"
//               onClick={() => {
//                 deleteNews(val._id);
//               }}
//             >
//               x
//             </button>
//           </>
//         );
//       })}
//     </>
//   );
// }
// // _id: response.data._id,

// // class Image extends Component {
// //     constructor(props) {
// //         super(props);
// //         this.state = {
// //             img: ''
// //         };
// //     };
// //     arrayBufferToBase64(buffer) {
// //         var binary = '';
// //         var bytes = [].slice.call(new Uint8Array(buffer));
// //         bytes.forEach((b) => binary += String.fromCharCode(b));
// //         return window.btoa(binary);
// //     };
// //     componentDidMount() {
// //         fetch('http://yourserver.com/api/img_data')
// //         .then((res) => res.json())
// //         .then((data) => {
// //             var base64Flag = 'data:image/jpeg;base64,';
// //             var imageStr =
// //                 this.arrayBufferToBase64(data.img.data.data);
// //             this.setState({
// //                 img: base64Flag + imageStr
// //             )}
// //         })
// //     }
// //     render() {
// //         const {img} = this.state;
// //         return (
// //             <img
// //                 src={img}
// //                 alt='Helpful alt text'/>
// //         )
// //     }

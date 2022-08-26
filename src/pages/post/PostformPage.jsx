import React from "react";
import Footer from "../../components/footer/Footer";
import UploadPost from "../../components/post/addPost";
import Postform from "../../components/post/Postform";
import "./postformpage.css";

export default function PostformPage() {
  return (
    <>
      <section className="postDiv ">
        <Postform />
        <UploadPost/>
      </section>
      <Footer />
    </>
  );
}

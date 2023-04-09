import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { excerpt } from "../utility";

const TaskSection = ({
  id,
  title,
  subject,
  description,
  userId,
  author,
  timestamp,
  user,
  handleDelete,
}) => {
  return (
    <div>
      <div className="row pb-4 card card text-bg-warning w-75 mb-3" style={{maxwidth: 18 + "rem;"}} key={id}>
        <div className="col-md-7">
          <div className="text-start">
            <span className="title py-2">{title}</span>
            <span className="meta-info">
              <p className="author">
                <i>By {user}</i>  - &nbsp;
                {timestamp.toDate().toDateString()}
              </p>
              <p className="short-description text-start">{subject}</p>
            </span>
          </div>
          <Link to={`/detail/${id}`}>
            <button className="btn btn-read">Read More</button>
          </Link>
          <div style={{ float: "right" }}>
            <Link to={`/update/${id}`}>
              <i className="fa-solid fa-trash fa-2xl"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskSection;

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { excerpt } from "../utility";

const TaskSection = ({
  id,
  title,
  description,
  category,
  user,
  userName,
  userId,
  timestamp,
  handleDelete,
}) => {
  return (
    <div>
      <div className="row pb-4 card text-bg-warning w-90 mb-3 " key={id}>
        <div className="col-md-15">
          <div className="text-start">
            <h className={category}>{category}</h>
            <span className="title py-2">{title}</span>
            <span className="meta-info">
              <p className="short-description text-start">{description}</p>
              <p className="author">
                <i>By {userName}</i> - &nbsp;
                {timestamp.toDate().toDateString()}
              </p>
            </span>
          </div>
          <Link to={`/detail/${id}`}>
            <button className="btn btn-read">Read More</button>
          </Link>
          { user && user.uid === userId && (
            <div style={{ float: "right" }}>
              <Link to={`/`} onClick={() => handleDelete(id)}>
                <i className="fa-solid fa-trash fa-xl"></i>
              </Link>
              <Link to={`/update/${id}`}>
                <i class="fa-solid fa-pen-to-square fa-xl"></i>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskSection;

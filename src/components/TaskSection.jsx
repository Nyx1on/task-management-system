import React from "react";
import { Link } from "react-router-dom";

const TaskSection = ({
  id,
  title,
  description,
  category,
  important,
  user,
  userName,
  userId,
  timestamp,
  handleDelete,
  taskTime,
  taskDate
}) => {
  //var colors = ["#66d251", "#ffc400", "#22aff5"];
  //var random_color = colors[Math.floor(Math.random() * colors.length)];
  //style={{backgroundColor: `${random_color}`}}

  return (
    <div>
      <div className="row pb-4 card w-90 mb-3"  id={userName[0]} key={id}>
        <div className="col-md-15">
          <div className="text-start">
            <h className={category}>{category}</h>
            {important === "yes" && <h className="importantTag">Important</h>}
            <span className="title py-2">
              {title} <span className="task-time"> - {taskTime}</span>
            </span>
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
          {((user && user.uid === userId) || (user && user.displayName==="Nirnay Behera")) && (
            <div style={{ float: "right" }}>
              <Link to={`/`} onClick={() => handleDelete(id)}>
                <i className="fa-solid fa-trash fa-2xl"></i>
              </Link>
              <Link to={`/update/${id}`}>
                <i class="fa-solid fa-pen-to-square fa-2xl"></i>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskSection;

import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import Spinner from "../components/Spinner";

const Detail = ({ user }) => {
  const [task, setTask] = useState({});
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const getTask = async () => {
    setLoading(true);
    const docRef = doc(db, "tasks", id);
    const taskDetail = await getDoc(docRef);
    setTask(taskDetail.data());
    console.log(task.timestamp);
    setLoading(false);
  };

  useEffect(() => {
    id && getTask();
  }, [id]);

  const {
    title,
    description,
    category,
    userName,
    taskTime,
    taskDate,
    duration,
  } = task;

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="col-md-15">
        <div className="text-center">
          <h1 className="title-detail">{title}</h1>
          <p className="author">
            <i>Created By {userName}</i>
          </p>
          <h5>Time: {taskTime} </h5>
          <h5>Date: {taskDate}</h5>
          {duration !== "" && <h6>Duration: {duration}</h6>}
          <p className="short-description">{description}</p>
          <h5>Category : {category}</h5>
        </div>
      </div>
    </>
  );
};

export default Detail;

import React, { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import {
  doc,
  getDoc,
} from "firebase/firestore";
import Spinner from "../components/Spinner";

const inititalForm = {
  title: "",
  category: "",
  description: "",
  taskTime: new Date(0),
  taskDate: new Date(0),
  duration: "",
  important: "",
};

const durationOption = [
  "15 min",
  "30 min",
  "45 min",
  "1 hour(s)",
  "2 hour(s)",
  "3 hour(s)",
  "Unspecified"
];

const categoryOption = [
  "Deadline",
  "Meeting",
  "Appointment",
  "Other",
];

const AddEditTask = ({ user }) => {
  const [form, setForm] = useState(inititalForm);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const userId = user?.uid;
  const navigate = useNavigate();
  const {
    title,
    category,
    description,
    taskTime,
    taskDate,
    duration,
    important,
  } = form;

  useEffect(() => {
    id && getTask();
  }, [id]);

  const getTask = async () => {
    setLoading(true);
    const docRef = doc(db, "tasks", id);
    const taskDetail = await getDoc(docRef);
    if(taskDetail.exists()){
      setForm(taskDetail.data());
    }
    setLoading(false);
  };

  if (loading) {
    return <Spinner />;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: [e.target.value] });
  };

  const handleImportant = (e) => {
    setForm({ ...form, important: e.target.value });
  };

  const onDurationChange = (e) => {
    setForm({ ...form, duration: e.target.value });
  };
  const onCategoryChange = (e) => {
    setForm({ ...form, category: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && taskTime && taskDate && important) {
      try {
        if (userId) {
          await addDoc(collection(db, "tasks"), {
            ...form,
            timestamp: serverTimestamp(),
            userName: user.displayName,
            userId: user.uid,
          });
          toast.success("Task created successfully");
          navigate("/");
        } else {
          toast.error("Please Login to create task");
        }
      } catch (err) {
        console.log(err);
        navigate("/");
      }
    } else {
      toast.error("Fields marked * are mandatory");
    }
  };

  return (
    <div className="container-fluid mb-4">
      <div className="container">
        <div className="col-12">
          <div className="text-center heading py-2">Create</div>
        </div>
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-10 col-md-8 col-lg-6">
            <form className="row blog-form" onSubmit={handleSubmit}>
              <div className="col-12 py-3">
                <input
                  type="text"
                  className="form-control input-text-box"
                  placeholder="Title*"
                  name="title"
                  value={title}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 py-4">
                <select
                  value={category}
                  onChange={onCategoryChange}
                  className="catg-dropdown"
                >
                  <option>Category*</option>
                  {categoryOption.map((option, index) => (
                    <option value={option} key={index}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              {category !== "Meeting" && category !== "Other" ? (
                <>
                  <div className="col-12 col-md-6">
                    <label className="form-label">{category} Time</label>
                    <input
                      type="time"
                      className="form-control input-text-box"
                      name="taskTime"
                      value={taskTime}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label">{category} Date</label>
                    <input
                      type="date"
                      className="form-control input-text-box"
                      name="taskDate"
                      value={taskDate}
                      onChange={handleChange}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="col-12 col-md-6">
                    <label className="form-label">Start Time</label>
                    <input
                      type="time"
                      className="form-control input-text-box"
                      name="taskTime"
                      value={taskTime}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label">Start Date</label>
                    <input
                      type="date"
                      className="form-control input-text-box"
                      name="taskDate"
                      value={taskDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 py-4">
                    <select
                      value={duration}
                      onChange={onDurationChange}
                      className="catg-dropdown"
                    >
                      <option>Duration*</option>
                      {durationOption.map((option, index) => (
                        <option value={option} key={index}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}
              <div className="col-12 py-3">
                <textarea
                  className="form-control description-box"
                  placeholder="Description"
                  value={description}
                  name="description"
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 py-3">
                <div className="form-check-inline mx-2">
                  <p className="important">Mark as important ?*</p>
                </div>
                <div className="form-check-inline mx-2">
                  <input
                    type="radio"
                    className="form-check-input"
                    value="yes"
                    name="radioOption"
                    checked={important === "yes"}
                    onChange={handleImportant}
                  />
                  <label
                    htmlFor="radioOption"
                    className="form-check-label mx-2"
                  >
                    Yes&nbsp;
                  </label>
                </div>
                <div className="form-check-inline mx-2">
                  <input
                    type="radio"
                    className="form-check-input"
                    value="no"
                    name="radioOption"
                    checked={important === "no"}
                    onChange={handleImportant}
                  />
                  <label
                    htmlFor="radioOption"
                    className="form-check-label mx-2"
                  >
                    No
                  </label>
                </div>
              </div>
              <div className="col-12 py-3 text-center">
                <button className="btn btn-add" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditTask;

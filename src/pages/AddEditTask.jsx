import React, { useState } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";

const inititalForm = {
  title: "",
  description: "",
  category: "",
  time: "",
  date: "",
  duration: "",
  important: "",
};

const AddEditTask = () => {
  const [form, setForm] = useState(inititalForm);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);

  const { title, description, category, time, date, duration, important } =
    form;

  const handleChange = () => {};

  const handleSubmit = () => {};

  const handleImportant = () => {};

  const onDurationChange = (e) => {};

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
                  placeholder="Title"
                  name="title"
                  value={title}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label">Start Time</label>
                <input
                  type="time"
                  className="form-control input-text-box"
                  placeholder="Start Time"
                  name="time"
                  value={time}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label">Start Date</label>
                <input
                  type="date"
                  className="form-control input-text-box"
                  placeholder="Start Date"
                  name="date"
                  value={date}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 py-4">
                <select
                  value={duration}
                  onChange={onDurationChange}
                  className="catg-dropdown"
                >
                  <option>Duration</option>
                </select>
              </div>
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
                  <p className="important">Mark as important ?</p>
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
                <button
                  className="btn btn-add"
                  type="submit"
                  disabled={progress !== null && progress < 100}
                >
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

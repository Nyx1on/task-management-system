import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Search from "../components/Search";
import TaskSection from "../components/TaskSection";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  query,
  orderBy,
} from "firebase/firestore";
import { toast } from "react-toastify";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = ({ user }) => {
  const [task, setTask] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const queryString = useQuery();
  const searchQuery = queryString.get("searchQuery");

  useEffect(() => {
    getTask();
  }, []);

  const getTask = async () => {
    setLoading(true);
    const taskRef = collection(db, "tasks");
    console.log(taskRef);
    const firstFour = query(taskRef, orderBy("title"), limit(4));
    const docSnapshot = await getDocs(firstFour);
    setTask(docSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    setLoading(false);
  };

  if (loading) {
    return <Spinner />;
  }

  const handleDelete = async (id) => {
    if (window.confirm("Confirm delete this Task?")) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, "tasks", id));
        toast.success("Task deleted successfully");
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleChange = (e) => {
  };

  return (
    <div className="container-fluid pb-4 pt-4 padding bg-light">
      <div className="container padding">
        <div className="row mx-0">
          <div className="col-md-8">
            <div className="task-heading text-start py-2 mb-4">Daily task</div>
            {task.length === 0 && (
              <>
                <h4>
                  No Task found. Maybe, try creating some!
                  <strong>{searchQuery}</strong>
                </h4>
              </>
            )}
            {task?.map((task) => (
              <TaskSection
                key={task.id}
                user={user}
                handleDelete={handleDelete}
                {...task}
              />
            ))}
            {task.length !== 0 && (
              <>
                <button className="btn btn-primary">Load More</button>
              </>
            )}
          </div>
          <div className="col-md-3">
            <Search search={search} handleChange={handleChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

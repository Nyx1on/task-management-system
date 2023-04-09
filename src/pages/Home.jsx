import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Search from "../components/Search";
import TaskSection from "../components/TaskSection";
import { db } from "../firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  query,
  orderBy,
  where,
  startAfter,
} from "firebase/firestore";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = ({ user }) => {
  const [task, setTask] = useState([]);
  const [search, setSearch] = useState("");
  const [hide, setHide] = useState(false);
  const queryString = useQuery();
  const searchQuery = queryString.get("searchQuery");

  useEffect(() => {
    getTask();
  }, []);

  const getTask = async () => {
    const taskRef = collection(db, "tasks");
    console.log(taskRef);
    const firstFour = query(taskRef, orderBy("title"), limit(4));
    const docSnapshot = await getDocs(firstFour);
    setTask(docSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const handleDelete = () => {};
  const handleChange = () => {};

  return (
    <div className="container-fluid pb-4 pt-4 padding bg-light">
      <div className="container padding">
        <div className="row mx-0">
          <div className="col-md-8">
            <div className="task-heading text-start py-2 mb-4">Daily task</div>
            <h4>
              No task found with search keyword: <strong>{searchQuery}</strong>
            </h4>
            {task?.map((task) => (
              <TaskSection
                key={task.id}
                user={user}
                handleDelete={handleDelete}
                {...task}
              />
            ))}

            {!hide && <button className="btn btn-primary">Load More</button>}
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

import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import UseHttp from "./components/hooks/Use-http";

function App() {
  const [tasks, setTasks] = useState([]);
  const { isLoading, error, sendRequest: fetchTasks } = UseHttp();
  useEffect(() => {
    //
    const applyData = (taskObjs) => {
      const loadedTasks = [];

      for (const taskKey in taskObjs) {
        loadedTasks.push({ id: taskKey, text: taskObjs[taskKey].text });
      }
      setTasks(loadedTasks);
    };
    const requestConfig = {
      url: "https://react-task-7b39b-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json",
    };
    fetchTasks(requestConfig, applyData);
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;

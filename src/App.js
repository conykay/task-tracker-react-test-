import Header from "./components/Header";
import Footer from "./components/Footer";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import About from './components/About';
import { useState, useEffect } from "react";
import {BrowserRouter as Router , Route} from 'react-router-dom';

function App() {
  const [showAddTask, setShowAddTask] = useState(false);

  const [tasks, setTasks] = useState([]);

  //making api calls using useeffect to fetch data on page load .
  useEffect(() => {
    const getTasks = async () => {
      const taskFromApi = await fetchTasks();
      setTasks(taskFromApi);
    };

    getTasks();
  }, []);

  //get tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();

    return data;
  };

  //fetch task 
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

    return data;
  };

  //add Task
  const addTask = async (task) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    })

    const data = await res.json()
  
    setTasks([...tasks,data])

    // const id = Math.floor(Math.random() * 1000) +1
    // const newTask = {id , ...task}
    // setTasks([...tasks,newTask])
  }

  //delete task
  const deleteTask = async (id) => {
    // delete from db
    await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" })
    //this this keeps the ui responsive.
    setTasks(tasks.filter((task) => task.id !== id))
  }

// Toggole the reminder 
  const toggleReminder = async (id) => {
    const getTaskData = await fetchTask(id)
    const updTask = {...getTaskData,reminder:!getTaskData.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`,{method:'PUT',headers:{
      'Content-type':'application/json'
    },
    body: JSON.stringify(updTask),
  })

  const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )
  }

  return (
    <Router>
    <div className="container">
    <Header
              onAdd={() => setShowAddTask(!showAddTask)}
              showAdd={!showAddTask}
            />
      <Route
        path='/'
        exact
        render = {(props)=>(
          <>
            {showAddTask && <AddTask onAdd={addTask} />}
            {tasks.length > 0 ? (
                <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
                ) : (
                  "No tasks to show"
                )}
          </>
        )} 
      />
      <Route path='/about' component={About}/>
      <Footer/>
    </div>
    </Router>
  );
}

export default App;

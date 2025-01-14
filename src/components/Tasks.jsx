//Deixar um arquivo com .JSX ajuda no autocomplete, portanto, sempre que usar JS lembre-se de utilizar a extensão correta.

import axios from "axios";
import { useEffect, useState } from "react";

import "./Tasks.scss";
import TaskItem from "./TaskItem";
import AddTask from "./AddTask";

function Tasks() {
    const [tasks, setTasks] = useState([{}]);

    //Pegando tarefas do BD
    const fetchTasks = async () => {
        try {
            const { data } = await axios.get("https://task-manager-fsc-backend.onrender.com/tasks"); //pegando tarefas da nossa API
            setTasks(data); //setando tarefas no estado!
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchTasks(); //useEffect não pode retornar uma promisse (async)
    }, []);

    return (
        <div className="tasks-container">
            <h2>Minhas tarefas</h2>
            <div className="last-tasks">
                <h3>Últimas tarefas</h3>
                <AddTask />
                <div className="tasks-list">
                    {tasks
                        .filter((task) => task.isCompleted === false)
                        .map((tasksNotCompleted) => (
                            <TaskItem task={tasksNotCompleted} />
                        ))}
                </div>
            </div>
            <div className="completed-tasks">
                <h3>Tarefas concluídas</h3>
                <div>
                    {tasks
                        .filter((task) => task.isCompleted) //mesmo que colocar task.isCompleted === true
                        .map((completedTask) => (
                            <TaskItem task={completedTask} />
                        ))}
                </div>
            </div>
        </div>
    );
}

export default Tasks;

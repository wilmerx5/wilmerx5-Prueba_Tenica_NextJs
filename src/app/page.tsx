
"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import TaskItem from "./components/taskItem";
import tasksAPi from "./services/API/tasksAPi";
import WithAuthProtect from "./utils/WithAuth";


const Tasks=()=> {

 
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'in progress' | 'completed'>('all');
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks); // Estado para tareas filtradas
  let token  = localStorage.getItem('AUTHTOKEN' ) 
  if(!token){
    token="error"
  }
  const getTasks = async () => {
    try {
      const { data } = await tasksAPi.getTasks(token);
      console.log(data.data)
      setTasks(data.data);
    } catch (e: any) {
      if (e.response && e.response.data && e.response.data.msg) {
        toast.error(e.response.data.msg);
      } else {
        toast.error("Error al cargar las tareas.");
      }
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    if (filter === 'all') {
      console.log("hola")
      setFilteredTasks(tasks);

      console.log(tasks)
    } else {
      setFilteredTasks(tasks.filter(task => task.status === filter));
    }
  }, [filter, tasks]); // Dependencias: se ejecuta al cambiar el filtro o las tareas


  const handleDelete = async (task: Task) => {
    Swal.fire({
      title: 'You sure?',
      text: "You cant see it again!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete It!'
  }).then(async (result) => {
      if (result.isConfirmed) {
          
        try{
          const {data}= await tasksAPi.deleteTask(task._id,token)
          toast.success('task deleted')
          getTasks()
        }
        catch(e){
          toast.error('error deleting tasks')

        }
         
      }
  });
  }

  const handleCompleted = async (task: Task) => {
    Swal.fire({
      title: 'Did you complete this task?',
      text: "congratulations!",
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, i did it'
  }).then(async (result) => {
      if (result.isConfirmed) {
          const dataset={
            status:'completed'
          }
        try{
          const {data}= await tasksAPi.markAsCompletedTask(task._id,dataset,token)
          getTasks()
          await toast.success('task completed, congratulations')
        }
        catch(e){
          toast.error('error ')

        }
         
      }
  });
  }

  return (
  <WithAuthProtect>
     <div className=" pt-40 min-h-screen p-8 pb-20 bg-gradient-to-r from-blue-500 to-purple-500">

  <h1 className="text-4xl font-bold text-white text-center mb-6">TO DO LIST</h1>

  <div className="flex justify-end mb-6">
    <Link
      href="/task"
      className="bg-green-500 text-white px-6 py-3 rounded-full shadow-lg transform transition duration-200 hover:bg-green-600 hover:scale-105"
    >
      + Add Task
    </Link>
  </div>

  <div className="flex justify-center mb-10">
    <select
      value={filter}
      onChange={(e) => setFilter(e.target.value as 'all' | 'pending' | 'in progress' | 'completed')}
      className="p-4 text-lg rounded-lg bg-white text-gray-700 shadow-xl hover:bg-gray-100 transition duration-200 cursor-pointer focus:outline-none"
      style={{ width: '50%' }} 
    >
      <option value="all">All</option>
      <option value="pending">Pending</option>
      <option value="in progress">In Progress</option>
      <option value="completed">Completed</option>
    </select>
  </div>


  <div className="task-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {filteredTasks.length > 0 ? (
      filteredTasks.map(task => (
        <TaskItem handleDelete={handleDelete}  handleComplete={handleCompleted} key={task._id} task={task} />
      ))
    ) : (
      <p className="text-white text-lg text-center col-span-full">
        No hay tareas para mostrar. ¡Agrega algunas!
      </p>
    )}
  </div>
  </div>
  </WithAuthProtect>
  );
}

export default Tasks
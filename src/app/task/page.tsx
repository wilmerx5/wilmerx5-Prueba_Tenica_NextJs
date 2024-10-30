"use client"
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import tasksAPi from "../services/API/tasksAPi";
import WithAuthProtect from "../utils/WithAuth";
const  CreateTask=()=> {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [expiresAt, setExpiresAt] = useState("");

    let token  = localStorage.getItem('AUTHTOKEN') 
    if(!token){
      token="error"
    }
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const currentDate = new Date();
        const expirationDate = new Date(expiresAt);
        if (expirationDate <= currentDate) {
            toast.error("La fecha de expiración debe ser mayor que la fecha actual.");
            return; 
        }
     
        try{
            const dataSet={title,description,expiresAt}
            const {data} =  await tasksAPi.createTask(dataSet,token)

            toast.success("task created Successfully");
            setDescription('')
            setExpiresAt('')
            setTitle('')
            setTimeout(()=>{

                window.location.href='/'
            },2000)

        }catch(e){
            toast.error("error creating tasks");

        }

        
    };

    return (
     <WithAuthProtect>
           <div className="min-h-screen p-8 bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <h3 className=" text-slate-700 text-2xl font-bold mb-4 text-center">Add new Task</h3>
                <ToastContainer />
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">task</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className=" text-slate-600 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Descripción</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className=" text-slate-600  w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    ></textarea>
                </div>

                <div className="mb-4">
                    <label htmlFor="expiresAt" className="block text-gray-700 font-semibold mb-2">expires At</label>
                    <input
                        type="datetime-local"
                        id="expiresAt"
                        value={expiresAt}
                        onChange={(e) => setExpiresAt(e.target.value)}
                        className=" text-slate-600  w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200">
                   Create Task
                </button>
            </form>
        </div>
     </WithAuthProtect>
    );
}

export default CreateTask
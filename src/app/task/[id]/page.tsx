"use client";
import tasksAPi from "@/app/services/API/tasksAPi";
import formatDateForInput from "@/app/utils/formateDate";
import WithAuthProtect from "@/app/utils/WithAuth";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateTask = ({ params }: { params: Promise<{ id: string }> }) => {
    const [id, setId] = useState<string | null>(null);
    const [title, setTitle] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [expiresAt, setExpiresAt] = useState<string>(new Date().toISOString().substring(0, 16));


    const token = localStorage.getItem("AUTHTOKEN") || "error";

    useEffect(() => {
        const fetchParams = async () => {
            const resolvedParams = await params;
            setId(resolvedParams.id);
        };

        fetchParams();
    }, [params]);

    useEffect(() => {
        const fetchTask = async () => {
            if (!id) return;
            try {
                const { data } = await tasksAPi.getTask(id, token);
                setTitle(data.data.title);
                setDescription(data.data.description);
                setExpiresAt(formatDateForInput(data.data.expiresAt));
                setStatus(data.data.status);
                console.log(data)
            } catch (error) {
                toast.error("Error fetching task data");
                setTimeout(() => {
                    window.location.href = "/";
                }, 2000);
                console.log(error)
            }
        };
        fetchTask();
    }, [id, token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const currentDate = new Date();
        const expirationDate = new Date(expiresAt);

        if (expirationDate <= currentDate) {
            toast.error("La fecha de expiración debe ser mayor que la fecha actual.");
            return;
        }

        if (!id) {
            toast.error("ID de la tarea no encontrado.");
            return;
        }
      
        try {
            const dataSet = { title, description, expiresAt, status };
            await tasksAPi.updateTask(id, dataSet, token);
            toast.success("Task updated successfully");
            setTitle('')
            setDescription('')
            setExpiresAt('')
            setStatus('')

            setTimeout(() => {
                window.location.href = '/';
            }, 1000);

        } catch (error) {
            toast.error("Error updating task");
        }
    };

    return (
        <WithAuthProtect>
            <div className="pt-40 min-h-screen p-8 bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                    <h3 className="text-slate-700 text-2xl font-bold mb-4 text-center">Update Task</h3>
                    <ToastContainer />

                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Task</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="text-slate-600 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Descripción</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="text-slate-600 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        ></textarea>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="expiresAt" className="block text-gray-700 font-semibold mb-2">Expires At</label>
                        <input
                            type="datetime-local"
                            id="expiresAt"
                            value={expiresAt}
                            onChange={(e) => setExpiresAt(e.target.value)}
                            className="text-slate-600 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="status" className="block text-gray-700 font-semibold mb-2">Status</label>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="text-slate-600 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="completed">Completed</option>
                            <option value="in progress">In Progress</option>
                            <option value="pending">Pending</option>
                        </select>
                    </div>

                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200">
                        Update Task
                    </button>
                </form>
            </div>
        </WithAuthProtect>
    );
};

export default UpdateTask;

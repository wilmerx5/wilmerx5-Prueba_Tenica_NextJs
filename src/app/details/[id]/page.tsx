"use client";
import tasksAPi from "@/app/services/API/tasksAPi";
import WithAuthProtect from "@/app/utils/WithAuth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateTask = ({ params }: { params: Promise<{ id: string }> }) => {
    const [id, setId] = useState<string | null>(null);
    const [task, setTask] = useState<any>();

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
                setTask(data.data);
            } catch (error) {
                toast.error("Error fetching task data");
                setTimeout(() => {
                    window.location.href = "/";
                }, 2000);
                console.log(error);
            }
        };
        fetchTask();
    }, [id, token]);

    return (
        <WithAuthProtect>
            <div className="pt-40 min-h-screen p-8 bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center">
                {task ? (
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
                        <h3 className="text-xl font-bold mb-4 text-gray-800">Task Details</h3> {/* Cambiado a text-gray-800 */}
                        <div className="grid grid-cols-1 gap-4">
                            <div className="p-4 border rounded-lg bg-slate-600">
                                <h4 className="font-semibold text-white">Title:</h4> {/* Cambiado a text-white */}
                                <p className="text-white">{task.title}</p> {/* Cambiado a text-white */}
                            </div>
                            <div className="p-4 border rounded-lg bg-gray-100">
                                <h4 className="font-semibold text-gray-800">Description:</h4> {/* Cambiado a text-gray-800 */}
                                <p className="text-gray-800">{task.description}</p> {/* Cambiado a text-gray-800 */}
                            </div>
                            <div className="p-4 border rounded-lg bg-gray-100">
                                <h4 className="font-semibold text-gray-800">Status:</h4> {/* Cambiado a text-gray-800 */}
                                <p className={`font-medium ${task.status === 'completed' ? 'text-green-600' : 'text-red-600'}`}>
                                    {task.status}
                                </p>
                            </div>
                            <div className="p-4 border rounded-lg bg-gray-100">
                                <h4 className="font-semibold text-gray-800">Expires At:</h4> {/* Cambiado a text-gray-800 */}
                                <p className="text-gray-800">{new Date(task.expiresAt).toLocaleString()}</p> {/* Cambiado a text-gray-800 */}
                            </div>
                            <div className="p-4 border rounded-lg bg-gray-100">
                                <h4 className="font-semibold text-gray-800">Created At:</h4> {/* Cambiado a text-gray-800 */}
                                <p className="text-gray-800">{new Date(task.createdAt).toLocaleString()}</p> {/* Cambiado a text-gray-800 */}
                            </div>

                            <Link
                            href={`/task/${task._id}`}
                            className="bg-indigo-600 font-extrabold py-2 text-center"> UPDATE</Link>
                        </div>
                    </div>
                ) : (
                    <p className="text-slate-600">Loading task data...</p>
                )}
            </div>

        </WithAuthProtect>
    );
};

export default UpdateTask;
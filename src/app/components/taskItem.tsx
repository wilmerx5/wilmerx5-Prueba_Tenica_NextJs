import Link from "next/link";
import { FC } from "react";

interface TaskItemProps {
    task: Task;
    handleDelete: (task: Task) => void;

    handleComplete: (task: Task) => void;
}

const TaskItem: FC<TaskItemProps> = ({ task, handleDelete, handleComplete }) => {

    return (
        <div
        onClick={()=>window.location.href=`/details/${task._id}`}
        className={` cursor-pointer task-item p-5 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex flex-col ${
            task.status === 'completed' ? 'bg-green-100' :
            task.status === 'in progress' ? 'bg-yellow-100' :
            task.status === 'pending' ? 'bg-red-100' : 'bg-white'
        }`}
    >
        <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">ID: {task._id}</p>
            <div className="flex space-x-2">
                <Link
                onClick={(e) => e.stopPropagation()}
                    href={`/task/${task._id}`}
                    className="bg-blue-500 text-white text-xs py-1 px-2 rounded hover:bg-blue-600 transition duration-200"
                >
                    Edit
                </Link>
                <button
                    className="bg-red-500 text-white text-xs py-1 px-2 rounded hover:bg-red-600 transition duration-200"
                    onClick={(e) => {e.stopPropagation();handleDelete(task)}}
                >
                    Delete
                </button>
            </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mt-2">{task.title}</h2>
        <p className={`font-medium ${task.status === 'completed' ? 'text-green-600' : task.status === 'in progress' ? 'text-yellow-600' : 'text-red-600'}`}>
            Status: {task.status}
        </p>
        
      
        {task.status !== 'completed' && (
            <div className="mt-4">
                <button
                    className="bg-green-500 text-white text-xs py-1 px-2 rounded hover:bg-green-600 transition duration-200"
                    onClick={(e) => {e.stopPropagation();handleComplete(task)}}
                >
                    Complete
                </button>
            </div>
        )}
    </div>
    );
};

export default TaskItem;
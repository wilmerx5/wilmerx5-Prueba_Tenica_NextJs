import { completedTaskDTO } from "@/app/DTOS/completedTaskDTO";
import { createTaskDTO } from "@/app/DTOS/createTaskDTO";
import api from "@/app/utils/axiosConfig";

export default {

    async getTasks(token: string) {
        return api.get('/tasks', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    },

    async createTask(data: createTaskDTO, token: string) {
        return api.post('/tasks', data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    },

    async deleteTask(id: String, token: string) {
        return api.delete(`/tasks/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    },


    async getTask(id: String, token: string) {
        return api.get(`/tasks/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    },

    async updateTask(id: string, dataSet: UpdateTaskDTO, token: string) {
        return api.put(`/tasks/${id}`, dataSet, {  
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    },

    async markAsCompletedTask(id: string, dataSet:completedTaskDTO, token: string) {
        return api.put(`/tasks/${id}`, dataSet, {  
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }
}
import { loginDTO } from "@/app/DTOS/loginDTO";
import { loginResponseDTO } from "@/app/DTOS/loginResponseDTO";
import api from "@/app/utils/axiosConfig";
import { AxiosResponse } from "axios";

export default{

    async logIn(data: loginDTO): Promise<AxiosResponse<loginResponseDTO>> {
        return api.post<loginResponseDTO>('/auth/login', data);
    },
    signUP(data:loginDTO){
        return api.post('/auth/signUp',data)
    },
    getUser(token:string){
        return api.get('/auth/user',{
            headers:{
               'Authorization': `Bearer ${token}`
            }
        })
    }
}
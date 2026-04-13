import axios from "axios";
import { LoginForm, User } from "../domain/model/authModel";
import { LoginUserGatewayInterface } from "./interfaces/LoginUserGatewayInterface";

export class LoginUserApi implements LoginUserGatewayInterface {
    async login(payload: LoginForm): Promise<User> {
        try {
            // const response = await axios.post("http://localhost:8000/api/auth/login", payload, {
            //     withCredentials: true
            // });
            const response = await axios.post("/api/auth/login", payload, {
                withCredentials: true
            });

            if (!response.data.success) throw new Error(response.data.error?.message || "Erreur inconnue");

            return response.data.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data.error.message) throw new Error(error.response.data.error.message);

            throw new Error("Une erreur inattendue est survenue");
        }
    }
}
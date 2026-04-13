import axios from "axios";
import { RegisterForm } from "../domain/model/authModel";
import { RegisterUserGatewayInterface } from "./interfaces/RegisterUserGatewayInterface";

export class RegisterUserApi implements RegisterUserGatewayInterface {
    async register(payload: RegisterForm): Promise<void> {
        try {
            // const response = await axios.post("http://localhost:8000/api/auth/register", payload);
            const response = await axios.post("/api/auth/register", payload);

            if (!response.data.success) throw new Error(response.data.error?.message || "Erreur inconnue");
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data.error.message) throw new Error(error.response.data.error.message);

            throw new Error("Une erreur inattendue est survenue");
        }
    }
}
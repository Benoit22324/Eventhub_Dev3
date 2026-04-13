import axios from "axios";
import { LogoutUserGatewayInterface } from "./interfaces/LogoutUserGatewayInterface";

export class LogoutUserApi implements LogoutUserGatewayInterface {
    async logout(): Promise<void> {
        // await axios.get("http://localhost:8000/api/auth/logout", {
        //     withCredentials: true
        // });
        await axios.get("/api/auth/logout", {
            withCredentials: true
        });
    }
}
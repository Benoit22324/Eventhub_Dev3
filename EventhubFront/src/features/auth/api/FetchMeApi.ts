import axios from "axios";
import * as AuthModel from "../domain/model/authModel";
import { FetchMeInterface } from "./interfaces/FetchMeInterface";

export class FetchMeApi implements FetchMeInterface {
    async fetchMe(): Promise<AuthModel.User> {
        try {
            const response = await axios.get("http://localhost:8000/api/auth/me", {
                withCredentials: true
            });

            if (!response.data.success) throw new Error(response.data.error?.message || "Erreur inconnue");

            return response.data.data
        } catch (error) {
            throw new Error("An error as occured");
        }
    }
}
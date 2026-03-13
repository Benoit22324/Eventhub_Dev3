import * as AuthModel from "../../domain/model/authModel";

export interface FetchMeInterface {
    fetchMe(): Promise<AuthModel.User>
}
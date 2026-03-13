import * as AuthModel from "../../domain/model/authModel";

export interface LoginUserGatewayInterface {
    login(payload: AuthModel.LoginForm): Promise<AuthModel.User>
}
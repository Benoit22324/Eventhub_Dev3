import * as AuthModel from "../../domain/model/authModel";

export interface RegisterUserGatewayInterface {
    register(payload: AuthModel.RegisterForm): Promise<void>
}
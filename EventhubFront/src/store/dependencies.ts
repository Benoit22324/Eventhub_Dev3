import { AnalyticsGatewayInterface } from "../features/analytics/api/interfaces/AnalyticsGatewayInterface";
import { FetchMeInterface } from "../features/auth/api/interfaces/FetchMeInterface";
import { LoginUserGatewayInterface } from "../features/auth/api/interfaces/LoginUserGatewayInterface";
import { LogoutUserGatewayInterface } from "../features/auth/api/interfaces/LogoutUserGatewayInterface";
import { RegisterUserGatewayInterface } from "../features/auth/api/interfaces/RegisterUserGatewayInterface";
import { DashboardQueryInterface } from "../features/dashboard/api/interfaces/DashboardQueryInterface";
import { EventByCursorGatewayInterface } from "../features/event/api/interfaces/EventByCursorGatewayInterface";
import { EventByIdGatewayInterface } from "../features/event/api/interfaces/EventByIdGatewayInterface";
import { EventByOffsetGatewayInterface } from "../features/event/api/interfaces/EventByOffsetGatewayInterface";

export type Dependencies = {
    loginGateway: LoginUserGatewayInterface,
    registerGateway: RegisterUserGatewayInterface,
    fetchMe: FetchMeInterface,
    logoutGateway: LogoutUserGatewayInterface,

    eventByIdGateway: EventByIdGatewayInterface,
    eventByOffsetGateway: EventByOffsetGatewayInterface,
    eventByCursorGateway: EventByCursorGatewayInterface,

    analyticsGateway: AnalyticsGatewayInterface,
    dashboardQuery: DashboardQueryInterface
};
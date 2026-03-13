import type { Dependencies } from "../../store/dependencies";
import { createStore, type AppStore } from "../../store/store";
import { SendAnalyticsApi } from "../analytics/api/SendAnalyticsApi";
import { FetchMeApi } from "../auth/api/FetchMeApi";
import { LoginUserApi } from "../auth/api/LoginUserApi";
import { LogoutUserApi } from "../auth/api/LogoutUserApi";
import { RegisterUserApi } from "../auth/api/RegisterUserApi";
import { FetchAnalyticsDataApi } from "../dashboard/api/FetchAnalyticsDataApi";
import { EventByCursorApi } from "../event/api/EventByCursorApi";
import { EventByIdApi } from "../event/api/EventByIdApi";
import { EventByOffsetApi } from "../event/api/EventByOffsetApi";

export class App {
    public dependencies: Dependencies;
    public store: AppStore;

    constructor() {
        this.dependencies = this.setupDependencies();
        this.store = createStore({ dependencies: this.dependencies });
    }

    setupDependencies(): Dependencies {
        return {
            loginGateway: new LoginUserApi(),
            registerGateway: new RegisterUserApi(),
            fetchMe: new FetchMeApi(),
            logoutGateway: new LogoutUserApi(),

            eventByIdGateway: new EventByIdApi(),
            eventByOffsetGateway: new EventByOffsetApi(),
            eventByCursorGateway: new EventByCursorApi(),

            analyticsGateway: new SendAnalyticsApi(),
            dashboardQuery: new FetchAnalyticsDataApi()
        };
    }
}

export const app = new App();
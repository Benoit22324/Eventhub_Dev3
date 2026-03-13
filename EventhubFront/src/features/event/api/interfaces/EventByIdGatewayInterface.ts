import * as EventModel from "../../model/eventModel";

export interface EventByIdGatewayInterface {
    byId(id: string): Promise<EventModel.Event>
}
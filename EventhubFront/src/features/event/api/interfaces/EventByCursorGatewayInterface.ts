import * as EventModel from "../../model/eventModel";

export interface EventByCursorGatewayInterface {
    byCursor(lastId: string, limit: number): Promise<EventModel.Event[]>
}
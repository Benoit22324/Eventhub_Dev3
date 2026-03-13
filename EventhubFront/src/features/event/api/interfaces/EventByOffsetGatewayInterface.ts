import * as EventModel from "../../model/eventModel";

export interface EventByOffsetGatewayInterface {
    byOffset(page: number, limit: number): Promise<{ events: EventModel.Event[], total: number }>
}
import type { Request, Response, NextFunction } from 'express';
import GetEventsUseCase from '../../application/usecases/GetEventsUseCase';
import GetEventByIdUseCase from '../../application/usecases/GetEventByIdUseCase';
import { CreateEventInputs, EditEventInputs } from '../dto/event.dto';
import SaveEventUseCase from '../../application/usecases/SaveEventUseCase';
import UpdateEventUseCase from '../../application/usecases/UpdateEventUseCase';
import DeleteEventUseCase from '../../application/usecases/DeleteEventUseCase';
import GetEventsOffsetUseCase from '../../application/usecases/GetEventsOffsetUseCase';
import GetEventsCursorUseCase from '../../application/usecases/GetEventsCursorUseCase';

class EventController {
    constructor(
        private readonly getEventsUseCase: GetEventsUseCase,
        private readonly getEventsOffsetUseCase: GetEventsOffsetUseCase,
        private readonly getEventsCursorUseCase: GetEventsCursorUseCase,
        private readonly getEventByIdUseCase: GetEventByIdUseCase,
        private readonly saveEventUseCase: SaveEventUseCase,
        private readonly updateEventUseCase: UpdateEventUseCase,
        private readonly deleteEventUseCase: DeleteEventUseCase
    ) { }

    async getEvents(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const events = await this.getEventsUseCase.execute();

            res.jsonSuccess(events);
        } catch(error) {
            next(error);
        }
    }

    async getEventsOffset(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;

            const result = await this.getEventsOffsetUseCase.execute(page, limit);

            return res.jsonSuccess(result);
        } catch(error) {
            next(error);
        }
    }

    async getEventsCursor(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const lastId = req.query.lastId as string;
            const limit = parseInt(req.query.limit as string) || 10;

            const events = await this.getEventsCursorUseCase.execute(lastId, limit);

            return res.jsonSuccess(events);
        } catch(error) {
            next(error);
        }
    }

    async getEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;

            if (!id || typeof(id) !== "string") return res.jsonError("Param not valid", 404);

            const event = await this.getEventByIdUseCase.execute(id);

            res.jsonSuccess(event);
        } catch(error) {
            next(error);
        }
    }

    async saveEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user) return res.jsonError("Unauthorized access", 403);

            const { id } = req.user;
            const body = req.body as CreateEventInputs;

            const startDate = new Date(body.startDate);
            const capacity = Number(body.capacity);
            const price = Number(body.price);

            const event = await this.saveEventUseCase.execute(id, {...body, startDate, capacity, price});

            res.jsonSuccess(event, 201);
        } catch(error) {
            next(error);
        }
    }

    async updateEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user) return res.jsonError("Unauthorized access", 403);

            const { id } = req.user;
            const { eventId } = req.params;

            if (!eventId || typeof(eventId) !== "string") return res.jsonError("Param not valid", 404);

            const body = req.body as EditEventInputs;

            const startDate = new Date(body.startDate);
            const capacity = Number(body.capacity);
            const price = Number(body.price);

            const event = await this.updateEventUseCase.execute(id, eventId, {...body, startDate, capacity, price});

            res.jsonSuccess(event);
        } catch(error) {
            next(error);
        }
    }

    async deleteEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user) return res.jsonError("Unauthorized access", 403);

            const { id } = req.user;
            const { eventId } = req.params;

            if (!eventId || typeof(eventId) !== "string") return res.jsonError("Param not valid", 404);

            const response = await this.deleteEventUseCase.execute(id, eventId);

            if (!response) res.jsonError("An error as occured", 500);

            res.jsonSuccess(null);
        } catch(error) {
            next(error);
        }
    }
}

export default EventController;
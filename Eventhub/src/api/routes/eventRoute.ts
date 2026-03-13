import { Router } from "express";
import EventController from "../controllers/EventController";
import GetEventsUseCase from "../../application/usecases/GetEventsUseCase";
import EventRepository from "../../infrastructure/repositories/EventRepository";
import GetEventByIdUseCase from "../../application/usecases/GetEventByIdUseCase";
import { authenticationMiddleware, redisCachingMiddleware } from "../middlewares";
import SaveEventUseCase from "../../application/usecases/SaveEventUseCase";
import UpdateEventUseCase from "../../application/usecases/UpdateEventUseCase";
import DeleteEventUseCase from "../../application/usecases/DeleteEventUseCase";
import GetEventsOffsetUseCase from "../../application/usecases/GetEventsOffsetUseCase";
import GetEventsCursorUseCase from "../../application/usecases/GetEventsCursorUseCase";

const eventRepository = new EventRepository();
const getEventsUseCase = new GetEventsUseCase(eventRepository);
const getEventsOffsetUseCase = new GetEventsOffsetUseCase(eventRepository);
const getEventsCursorUseCase = new GetEventsCursorUseCase(eventRepository);
const getEventByIdUseCase = new GetEventByIdUseCase(eventRepository);
const saveEventUseCase = new SaveEventUseCase(eventRepository);
const updateEventUseCase = new UpdateEventUseCase(eventRepository);
const deleteEventUseCase = new DeleteEventUseCase(eventRepository);

const eventController = new EventController(
    getEventsUseCase,
    getEventsOffsetUseCase,
    getEventsCursorUseCase,
    getEventByIdUseCase,
    saveEventUseCase,
    updateEventUseCase,
    deleteEventUseCase
);
const router = Router();

router.get("/", eventController.getEvents.bind(eventController));
router.get("/offset", redisCachingMiddleware({ EX: 3600 }), eventController.getEventsOffset.bind(eventController));
router.get("/cursor", redisCachingMiddleware({ EX: 3600 }), eventController.getEventsCursor.bind(eventController));
router.get("/:id", redisCachingMiddleware(), eventController.getEvent.bind(eventController));
router.post("/", authenticationMiddleware, eventController.saveEvent.bind(eventController));
router.patch("/:eventId", authenticationMiddleware, eventController.updateEvent.bind(eventController));
router.delete("/:eventId", authenticationMiddleware, eventController.deleteEvent.bind(eventController));

export { router as EventRoute };
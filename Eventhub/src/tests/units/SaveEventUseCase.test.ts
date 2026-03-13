import { CreateEventInputs } from "../../api/dto/event.dto";
import SaveEventUseCase from "../../application/usecases/SaveEventUseCase";
import Event from "../../domain/entities/event";
import InMemoryEventRepository from "../../infrastructure/repositories/InMemoryEventRepository";

describe("GetEventsUseCase", () => {
    let repository: InMemoryEventRepository;
    let usecase: SaveEventUseCase;

    beforeEach(() => {
        repository = new InMemoryEventRepository();
        usecase = new SaveEventUseCase(repository);
    })

    describe("Scenario: no title", () => {
        const payload: CreateEventInputs = {
            title: "",
            description: "Un concert",
            startDate: new Date("2026-02-02"),
            capacity: 100,
            price: 6.59,
            category: "Concert"
        };

        it("should throw an Error", async () => {
            await expect(usecase.execute("abc123", payload)).rejects.toThrow("Title is required");
        })
    })

    describe("Scenario: no description", () => {
        const payload: CreateEventInputs = {
            title: "Concert de ouf",
            description: "",
            startDate: new Date("2026-02-02"),
            capacity: 100,
            price: 6.59,
            category: "Concert"
        };

        it("should throw an Error", async () => {
            await expect(usecase.execute("abc123", payload)).rejects.toThrow("Description is required");
        })
    })

    describe("Scenario: expired startDate", () => {
        const payload: CreateEventInputs = {
            title: "Concert de ouf",
            description: "Un concert",
            startDate: new Date("2026-01-10"),
            capacity: 100,
            price: 6.59,
            category: "Concert"
        };

        it("should throw an Error", async () => {
            await expect(usecase.execute("abc123", payload)).rejects.toThrow("StartDate need to be at least 1 day further");
        })
    })

    describe("Scenario: no capacity", () => {
        const payload: CreateEventInputs = {
            title: "Concert de ouf",
            description: "Un concert",
            startDate: new Date("2026-02-02"),
            capacity: 0,
            price: 6.59,
            category: "Concert"
        };

        it("should throw an Error", async () => {
            await expect(usecase.execute("abc123", payload)).rejects.toThrow("Capacity need to have at least 1 person");
        })
    })

    describe("Scenario: no free price", () => {
        const payload: CreateEventInputs = {
            title: "Concert de ouf",
            description: "Un concert",
            startDate: new Date("2026-02-02"),
            capacity: 100,
            price: 0,
            category: "Concert"
        };

        it("should throw an Error", async () => {
            await expect(usecase.execute("abc123", payload)).rejects.toThrow("Price need to have at least 1$");
        })
    })

    describe("Scenario: no category", () => {
        const payload: CreateEventInputs = {
            title: "Concert de ouf",
            description: "Un concert",
            startDate: new Date("2026-02-02"),
            capacity: 100,
            price: 6.59,
            category: ""
        };

        it("should throw an Error", async () => {
            await expect(usecase.execute("abc123", payload)).rejects.toThrow("Category is required");
        })
    })

    describe("Scenario: valid payload", () => {
        const payload: CreateEventInputs = {
            title: "Concert de ouf",
            description: "Un concert",
            startDate: new Date("2026-02-02"),
            capacity: 100,
            price: 6.59,
            category: "Concert"
        };

        it("should return a value type Event", async () => {
            const res = await usecase.execute("abc123", payload);

            expect(res).toBeDefined();
            expect(res instanceof Event).toBeTruthy();
        })
    })
})
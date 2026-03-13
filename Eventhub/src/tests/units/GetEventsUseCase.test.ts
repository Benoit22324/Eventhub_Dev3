import GetEventsUseCase from "../../application/usecases/GetEventsUseCase"
import Event from "../../domain/entities/event";
import InMemoryEventRepository from "../../infrastructure/repositories/InMemoryEventRepository";

describe("GetEventsUseCase", () => {
    let repository: InMemoryEventRepository;
    let usecase: GetEventsUseCase;

    beforeEach(() => {
        repository = new InMemoryEventRepository();
        usecase = new GetEventsUseCase(repository);
    })

    it("should return a value", async () => {
        await expect(usecase.execute()).resolves.toBeDefined();
    })
    it("should return a value of type Event[]", async () => {
        const res = await usecase.execute();

        expect(Array.isArray(res)).toBeTruthy();
        expect(res![0] instanceof Event).toBeTruthy();
    })
})
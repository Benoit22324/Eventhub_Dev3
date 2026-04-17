import RegisterUseCase from "../../application/usecases/RegisterUseCase";
import InMemoryUserRepository from "../../infrastructure/repositories/InMemoryUserRepository";

describe("RegisterUseCase", () => {
    let repository: InMemoryUserRepository;
    let usecase: RegisterUseCase;

    beforeEach(() => {
        repository = new InMemoryUserRepository();
        usecase = new RegisterUseCase(repository);
    })

    describe("Scenario: No username input", () => {
        const payload = {
            username: "",
            email: "test@gmail.com",
            password: "test123"
        };

        test("should throw an Error 'Le nom d'utilisateur est requis'", async() => {
            await expect(usecase.execute(payload.username, payload.email, payload.password)).rejects.toThrow("Le nom d'utilisateur est requis");
        })
    })

    describe("Scenario: No email input", () => {
        const payload = {
            username: "test",
            email: "",
            password: "test123"
        };

        test("should throw an Error 'L'email est requis'", async() => {
            await expect(usecase.execute(payload.username, payload.email, payload.password)).rejects.toThrow("L'email est requis");
        })
    })

    describe("Scenario: No password input", () => {
        const payload = {
            username: "test",
            email: "test@gmail.com",
            password: ""
        };

        test("should throw an Error 'Le mot de passe est requis'", async() => {
            await expect(usecase.execute(payload.username, payload.email, payload.password)).rejects.toThrow("Le mot de passe est requis");
        })
    })

    describe("Scenario: Email already used", () => {
        const payload = {
            username: "test",
            email: "test@gmail.com",
            password: "test123"
        };

        test("should throw an Error 'L'email est déjà utilisé'", async() => {
            await expect(usecase.execute(payload.username, payload.email, payload.password)).rejects.toThrow("L'email est déjà utilisé");
        })
    })

    describe("Scenario: No error", () => {
        // Given -> Les variables qu'on va utiliser pour test
        const payload = {
            username: "test",
            email: "test123@gmail.com",
            password: "test123"
        };

        test("should return a boolean true", async() => {
            // When -> Les résultats
            const result = await usecase.execute(payload.username, payload.email, payload.password);

            // Then -> Les tests
            expect(result).toBeTruthy();
        })
    })
})
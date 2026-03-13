class Event {
    constructor(
        private readonly id: string,
        private readonly title: string,
        private readonly description: string,
        private readonly startDate: Date,
        private readonly capacity: number,
        private readonly price: number,
        private readonly organizer: string,
        private readonly category: string,
        private readonly createdAt: Date,
        private readonly updatedAt: Date
    ) { }

    getId() {
        return this.id;
    }

    getTitle() {
        return this.title;
    }

    getDescription() {
        return this.description;
    }

    getStartDate() {
        return this.startDate;
    }

    getCapacity() {
        return this.capacity;
    }

    getPrice() {
        return this.price;
    }

    getOrganizer() {
        return this.organizer;
    }

    getCategory() {
        return this.category;
    }

    getCreatedAt() {
        return this.createdAt;
    }

    getUpdatedAt() {
        return this.updatedAt;
    }
}

export default Event;
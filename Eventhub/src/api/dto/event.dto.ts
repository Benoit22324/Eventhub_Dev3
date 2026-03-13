export interface CreateEventInputs {
    title: string,
    description: string,
    startDate: Date,
    capacity: number,
    price: number,
    category: string
}

export interface EditEventInputs {
    title: string,
    description: string,
    startDate: Date,
    capacity: number,
    price: number
}
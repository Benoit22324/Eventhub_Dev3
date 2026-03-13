import { useParams } from "react-router-dom"
import { useEvent } from "../hooks/useEvent";

const Event: React.FC = () => {
    const { id } = useParams();
    const hook = useEvent(id);
    const startDate = new Date(hook.event.startDate);
    const updatedAt = new Date(hook.event.updatedAt);

    return <>
        <h1 className="font-bold text-2xl leading-1">{hook.event.title}</h1>
        <span className="italic">Organisé par <span className="font-semibold">{hook.event.organizer}</span></span>

        <div className="max-w-1/3 px-2 py-1 bg-zinc-200 rounded-sm">
            <p className="font-semibold">Date de début: {startDate.getDate().toLocaleString("fr-FR", { minimumIntegerDigits: 2 })}/{(startDate.getMonth() + 1).toLocaleString("fr-FR", { minimumIntegerDigits: 2 })}/{startDate.getFullYear()}</p>
            <p className="font-semibold">Prix: {hook.event.price.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}</p>
            <p className="font-semibold">Catégorie: {hook.event.category}</p>
            <p className="font-semibold">Place limite: {hook.event.capacity} {hook.event.capacity > 1 ? "personnes" : "personne"}</p>
            <p className="font-semibold">Status: {updatedAt.getTime() > startDate.getTime() ? "Terminé" : "Prévue"}</p>
            <div className="flex flex-col my-2 font-semibold">
                <p className="underline">Description:</p>
                <p>{hook.event.description}</p>
            </div>
        </div>
    </>
}

export default Event;
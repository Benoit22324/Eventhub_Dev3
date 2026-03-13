import { Link } from "react-router-dom";
import { useEventsList } from "../hooks/useEventsList"

const EventList: React.FC = () => {
    const hook = useEventsList();

    return <>
        <h1 className="mb-4 font-bold text-2xl leading-1">Liste des événements</h1>

        <div className="flex flex-col items-center gap-2 w-1/3 h-[60vh] overflow-y-auto">
            {
                (hook.events && hook.events.length > 0) ? hook.events.map(event => <Link to={`/event/${event.id}`} key={event.id} className="flex flex-col items-center w-full px-2 py-1 bg-zinc-200 rounded-sm hover:bg-gray-300">
                    <div className="flex flex-col items-center border-b-1 border-zinc-400">
                        <p className="text-lg font-semibold">{event.title} | {event.category}</p>
                        <p className="font-semibold">Début: {new Date(event.startDate).getDate().toLocaleString("fr-FR", { minimumIntegerDigits: 2 })}/{(new Date(event.startDate).getMonth() + 1).toLocaleString("fr-FR", { minimumIntegerDigits: 2 })}/{new Date(event.startDate).getFullYear()}</p>
                    </div>
                    <p className="text-center">{event.description}</p>
                </Link>)
                : <p>Aucun événement disponible.</p>
            }
        </div>

        <div className="flex items-center gap-2">
            <button className="hover:cursor-pointer disabled:text-zinc-400 disabled:cursor-default" onClick={hook.prevPage} disabled={hook.currentPage === 1}>{"<--"}</button>
            <span>{hook.currentPage}/{hook.totalPage}</span>
            <button className="hover:cursor-pointer disabled:text-zinc-400 disabled:cursor-default" onClick={hook.nextPage} disabled={hook.currentPage === hook.totalPage}>{"-->"}</button>
        </div>
    </>
}

export default EventList;
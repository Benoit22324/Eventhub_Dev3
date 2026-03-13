import { useEffect, useState } from "react";
import { AppState, useAppDispatch } from "../../../store/store";
import { useSelector } from "react-redux";
import * as EventModel from "../model/eventModel";
import { eventByOffsetAction } from "../actions/eventByOffsetAction";

export const useEventsList = () => {
    const dispatch = useAppDispatch();

    function prevPage() {
        if (currentPage - 1 < 1) return

        dispatch(eventByOffsetAction(currentPage - 1, 6));
        setCurrentPage(currentPage - 1);
    }

    function nextPage() {
        if (currentPage + 1 > totalPage) return

        dispatch(eventByOffsetAction(currentPage + 1, 6));
        setCurrentPage(currentPage + 1);
    }

    useEffect(() => {
        dispatch(eventByOffsetAction(currentPage, 6));
    }, []);

    const events: EventModel.Event[] = useSelector((state: AppState) => state.event.events);
    const totalPage = useSelector((state: AppState) => state.event.total);
    const [ currentPage, setCurrentPage ] = useState<number>(1);

    return {
        events,
        totalPage,
        currentPage,
        nextPage,
        prevPage
    }
}
import { useEffect } from "react";
import { AppState, useAppDispatch } from "../../../store/store"
import { eventByIdAction } from "../actions/eventByIdAction";
import { useSelector } from "react-redux";
import * as EventModel from "../model/eventModel";

export const useEvent = (id: string | undefined) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (id) dispatch(eventByIdAction(id));
    }, [dispatch]);

    const event: EventModel.Event = useSelector((state: AppState) => state.event.event);

    return {
        event
    }
}
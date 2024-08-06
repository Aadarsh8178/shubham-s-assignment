import { useEffect, useRef, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DroppableGrid from "./DroppableGrid";
import { getRandomColor } from "../utils";

const resources = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S"];
const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function DateGrid({ month, year }) {
    const currentDate = new Date();
    const numberOfDays = new Date(year, month,0).getDate();
    const date = new Date(year, month, 1);
    const dayOfWeek = date.getDay();
    const lastEventId = useRef(1);

    const [events, _setEvents] = useState([{ id: 0,color: "rgba(226,0,0,0.5)", name: "Event 1", startTime: "12 AM", endTime: "12 PM", x: 20, y: 50}]);

    useEffect(() => {
        const savedEvents = localStorage.getItem("events");
        lastEventId.current = JSON.parse(localStorage.getItem("lastEventId") || "1");
        console.log({ savedEvents});
        if(savedEvents) {
            setEvents(JSON.parse(savedEvents));
        }
    },[])

    const setEvents = (newEvents) => {
        newEvents && localStorage.setItem("events", JSON.stringify(newEvents));
        _setEvents(newEvents);
    }

    const addEvent = (x, y) => {
        const newEvents = [...events];
        lastEventId.current = lastEventId.current + 1;

        newEvents.push({
            id: lastEventId.current,
            name: `Event ${events.length}`,
            color: getRandomColor(),
            startTime: "1pm",
            endTime: "2pm",
            x,
            y
        })
        localStorage.setItem("lastEventId", JSON.stringify(lastEventId.current))
        setEvents(newEvents)
    }

    return <div className="flex w-100 border">
        <div className="min-w-32">
            <div className="w-full border h-8"></div>
            {resources.map(resource => (
                <div key={resource} className="border h-12 w-full font-semibold p-2 ">Resource {resource}</div>
            ))}
        </div>
        <div className="flex-grow overflow-x-auto">
            <div className="grid" style={{ gridTemplateColumns: `repeat(${numberOfDays}, 1fr)` }}>
                {Array(numberOfDays).fill(0).map((_,index) => (
                    <div className="h-8 w-20 border p-1">
                        <p className={`text-sm inline ${currentDate.getDate() === index+1 && month === currentDate.getMonth() && year === currentDate.getFullYear() ? "rounded-full bg-blue-500 text-white p-1 px-2" : ""}`}>{index+1} {days[(dayOfWeek + index) % 7]}</p>
                    </div>
                ))}
            </div>
            <DndProvider backend={HTML5Backend}>
                <DroppableGrid events={events} length={resources.length} width={numberOfDays} addEvent={addEvent} setEvents={setEvents} />
            </DndProvider>
        </div>
    </div>;
}

export default DateGrid;
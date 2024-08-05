import { useDrag } from "react-dnd";
import { ItemTypes } from "../constants";

function Event({ event, index }) {
    const { color, name, startTime, endTime } = event;

    const [{ opacity }, drag] = useDrag(
        () => ({
          type: ItemTypes.EVENT,
          item: event,
          collect: (monitor) => {
            console.log(monitor.isDragging());
            return {
                opacity: monitor.isDragging() ? 0.3 : 1,
              }
          },
        }),
        [name, ItemTypes.EVENT],
      )

    return (<div ref={drag} className="h-11 w-24 px-2 py-1 rounded-sm" style={{ background: color, opacity, position: "absolute", top: event.y, left: event.x}}>
        <p className="text-sm font-bold">{name}</p>
        <p className="text-xs">{startTime} - {endTime}</p>
    </div> );
}

export default Event;
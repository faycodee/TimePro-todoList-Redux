import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import "../styles/Calendar.css";
import "@schedule-x/theme-default/dist/index.css";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { useState } from "react";
import { useSelector } from "react-redux";

function CalendarApp() {
  const [CurrDate, setDate] = useState(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();
    return `${year}-${month}-${day}`;
  });
  const Tasks = useSelector(state=>state.Tasks)
  const plugins = [createEventModalPlugin(), createDragAndDropPlugin()];
  const calendar = useCalendarApp(
    {
      views: [
        createViewMonthGrid(),
        createViewDay(),
        // createViewWeek(),
        createViewMonthAgenda(),
      ],
      events: Tasks
    },
    plugins
  );

  return (
    <div
      className=" w-full absolute z-40 flex justify-center items-center h-[90%]"
      style={{ zIndex: 10000 }}
    >
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}

export default CalendarApp;

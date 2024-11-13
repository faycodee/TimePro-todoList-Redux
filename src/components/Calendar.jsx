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
// alert("ww")
function CalendarApp() {
  const plugins = [createEventModalPlugin(),createDragAndDropPlugin()];

  const calendar = useCalendarApp(
    {
    
      views: [
          createViewMonthGrid(),
        createViewDay(),
        // createViewWeek(),
        createViewMonthAgenda(),
        
      ],
      events: [
        {
          id: 1,
          title: " myyyyy  Event 1",
          start: "2024-11-16 00:00",
          end: "2024-11-16 08:00",
          description:""
        },
        {
          id: 2,
          title: " myyyyy  Event 1",
          start: "2024-11-16 00:00",
          end: "2024-11-16 08:00",
          description:""
        },
      ],
      selectedDate:'2025-01-01'
    },
    plugins
  );


  return (
    <div className=" w-full absolute z-40 " style={{zIndex:10000,color:"green"}}>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}

export default CalendarApp;

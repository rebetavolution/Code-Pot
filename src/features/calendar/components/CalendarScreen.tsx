import { PageHeader } from "../../../shared/components/layout/PageHeader";
import { Card } from "../../../shared/components/Card";
import { Button } from "../../../shared/components/Button";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useState } from "react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const hours = Array.from({ length: 24 }, (_, i) => i);

const eventColors = [
  { name: "Blue", class: "bg-blue-500" },
  { name: "Green", class: "bg-green-500" },
  { name: "Red", class: "bg-red-500" },
  { name: "Yellow", class: "bg-yellow-500" },
  { name: "Purple", class: "bg-purple-500" },
  { name: "Pink", class: "bg-pink-500" },
];

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  color: string;
  category: string;
}

const initialEvents: CalendarEvent[] = [
  { id: "1", title: "Team Meeting", date: "2025-10-08", time: "10:00", color: "bg-blue-500", category: "Meeting" },
  { id: "2", title: "Project Deadline", date: "2025-10-15", time: "17:00", color: "bg-red-500", category: "Deadline" },
  { id: "3", title: "Design Review", date: "2025-10-22", time: "14:00", color: "bg-purple-500", category: "Review" },
];

type ViewType = "month" | "week" | "day";

export function CalendarScreen() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 1));
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [showModal, setShowModal] = useState(false);
  const [view, setView] = useState<ViewType>("month");
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    color: "bg-blue-500",
    category: "Event",
  });

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({ day: prevMonthLastDay - i, isCurrentMonth: false, date: "" });
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      days.push({ day, isCurrentMonth: true, date: dateStr });
    }
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      days.push({ day, isCurrentMonth: false, date: "" });
    }
    return days;
  };

  const getWeekDays = (date: Date) => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    startOfWeek.setDate(startOfWeek.getDate() - day);

    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      weekDays.push({
        day: d.getDate(),
        month: d.getMonth(),
        year: d.getFullYear(),
        date: dateStr,
        isToday:
          d.getDate() === new Date().getDate() &&
          d.getMonth() === new Date().getMonth() &&
          d.getFullYear() === new Date().getFullYear()
      });
    }
    return weekDays;
  };

  const days = getDaysInMonth(currentDate);
  const weekDays = getWeekDays(currentDate);

  const goToPrevious = () => {
    if (view === "month") {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    } else if (view === "week") {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() - 7);
      setCurrentDate(newDate);
    } else if (view === "day") {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() - 1);
      setCurrentDate(newDate);
    }
  };

  const goToNext = () => {
    if (view === "month") {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    } else if (view === "week") {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() + 7);
      setCurrentDate(newDate);
    } else if (view === "day") {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() + 1);
      setCurrentDate(newDate);
    }
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getEventsForDate = (dateStr: string) => {
    return events.filter(event => event.date === dateStr);
  };

  const getHeaderTitle = () => {
    if (view === "month") {
      return `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    } else if (view === "week") {
      const start = weekDays[0];
      const end = weekDays[6];
      if (start.month === end.month) {
        return `${monthNames[start.month]} ${start.day} - ${end.day}, ${start.year}`;
      } else if (start.year === end.year) {
        return `${monthNames[start.month]} ${start.day} - ${monthNames[end.month]} ${end.day}, ${start.year}`;
      } else {
        return `${monthNames[start.month]} ${start.day}, ${start.year} - ${monthNames[end.month]} ${end.day}, ${end.year}`;
      }
    } else {
      return `${monthNames[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
    }
  };

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date) {
      const event: CalendarEvent = {
        id: Date.now().toString(),
        ...newEvent,
      };
      setEvents([...events, event]);
      setShowModal(false);
      setNewEvent({ title: "", date: "", time: "", color: "bg-blue-500", category: "Event" });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Calendar" />

      <Card className="overflow-hidden">
        <div className="p-4 border-b border-app-border flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-lg font-semibold text-text-primary whitespace-nowrap">
              {getHeaderTitle()}
            </h2>
            <div className="flex items-center gap-1">
              <button
                onClick={goToPrevious}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-app-hover text-text-secondary"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={goToNext}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-app-hover text-text-secondary"
              >
                <ChevronRight size={18} />
              </button>
            </div>
            <Button variant="secondary" size="sm" onClick={goToToday}>
              Today
            </Button>
            <div className="inline-flex items-center rounded-lg border border-app-border overflow-hidden bg-app-bg">
              <button
                onClick={() => setView("month")}
                className={`px-3 py-1.5 text-sm transition-colors ${
                  view === "month"
                    ? "bg-app-surface text-text-primary"
                    : "text-text-muted hover:text-text-primary hover:bg-app-surface/50"
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setView("week")}
                className={`px-3 py-1.5 text-sm border-l border-app-border transition-colors ${
                  view === "week"
                    ? "bg-app-surface text-text-primary"
                    : "text-text-muted hover:text-text-primary hover:bg-app-surface/50"
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setView("day")}
                className={`px-3 py-1.5 text-sm border-l border-app-border transition-colors ${
                  view === "day"
                    ? "bg-app-surface text-text-primary"
                    : "text-text-muted hover:text-text-primary hover:bg-app-surface/50"
                }`}
              >
                Day
              </button>
            </div>
          </div>
          <Button onClick={() => setShowModal(true)} className="inline-flex items-center gap-1.5">
            <Plus size={16} />
            Add Event
          </Button>
        </div>

        {view === "month" && (
          <>
            <div className="grid grid-cols-7 border-b border-app-border">
              {daysOfWeek.map((day) => (
                <div key={day} className="px-4 py-2 text-center text-sm font-medium text-text-muted">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {days.map((dayObj, index) => {
                const dayEvents = getEventsForDate(dayObj.date);
                const isToday =
                  dayObj.isCurrentMonth &&
                  dayObj.day === new Date().getDate() &&
                  currentDate.getMonth() === new Date().getMonth() &&
                  currentDate.getFullYear() === new Date().getFullYear();

                return (
                  <div
                    key={index}
                    className={`min-h-[120px] border-b border-r border-app-border p-2 ${
                      !dayObj.isCurrentMonth ? "bg-app-bg/50" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`text-sm ${
                          dayObj.isCurrentMonth
                            ? isToday
                              ? "w-7 h-7 flex items-center justify-center rounded-full bg-accent text-white"
                              : "text-text-primary"
                            : "text-text-muted"
                        }`}
                      >
                        {dayObj.day}
                      </span>
                    </div>
                    <div className="space-y-1">
                      {dayEvents.slice(0, 3).map((event) => (
                        <div
                          key={event.id}
                          className={`px-2 py-1 rounded text-xs text-white truncate cursor-pointer ${event.color}`}
                          title={`${event.title} ${event.time}`}
                        >
                          {event.time && <span className="mr-1">{event.time}</span>}
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 3 && (
                        <div className="text-xs text-text-muted px-2">
                          +{dayEvents.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {view === "week" && (
          <div className="overflow-x-auto">
            <div className="grid grid-cols-[80px_repeat(7,1fr)] min-w-[900px]">
              <div className="border-b border-r border-app-border"></div>
              {weekDays.map((day, index) => (
                <div key={index} className="border-b border-r border-app-border last:border-r-0 p-2 text-center">
                  <div className="text-xs text-text-muted">{daysOfWeek[index]}</div>
                  <div className={`text-lg font-medium mt-1 ${day.isToday ? "text-accent" : "text-text-primary"}`}>
                    {day.day}
                  </div>
                </div>
              ))}
            </div>
            <div className="max-h-[600px] overflow-y-auto">
              {hours.map((hour) => (
                <div key={hour} className="grid grid-cols-[80px_repeat(7,1fr)] min-w-[900px] border-b border-app-border">
                  <div className="border-r border-app-border px-2 py-2 text-xs text-text-muted text-right">
                    {hour.toString().padStart(2, '0')}:00
                  </div>
                  {weekDays.map((day, idx) => {
                    const dayEvents = getEventsForDate(day.date).filter((e) => e.time.startsWith(hour.toString().padStart(2, '0')));
                    return (
                      <div key={idx} className="border-r border-app-border last:border-r-0 p-1 min-h-[60px] relative">
                        {dayEvents.map((event) => (
                          <div
                            key={event.id}
                            className={`px-2 py-1 rounded text-xs text-white mb-1 truncate ${event.color}`}
                            title={`${event.title} ${event.time}`}
                          >
                            {event.time} {event.title}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )}

        {view === "day" && (
          <div className="overflow-x-auto">
            <div className="grid grid-cols-[80px_1fr] min-w-[500px]">
              <div className="border-b border-r border-app-border p-2"></div>
              <div className="border-b border-app-border p-3 text-center">
                <div className="text-xs text-text-muted">{daysOfWeek[currentDate.getDay()]}</div>
                <div className={`text-lg font-medium mt-1 ${currentDate.toDateString() === new Date().toDateString() ? "text-accent" : "text-text-primary"}`}>
                  {currentDate.getDate()}
                </div>
              </div>
            </div>
            <div className="max-h-[600px] overflow-y-auto">
              {hours.map((hour) => {
                const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
                const dayEvents = getEventsForDate(dateStr).filter((e) => e.time.startsWith(hour.toString().padStart(2, '0')));
                return (
                  <div key={hour} className="grid grid-cols-[80px_1fr] min-w-[500px] border-b border-app-border">
                    <div className="border-r border-app-border p-2 text-xs text-text-muted text-right">
                      {hour.toString().padStart(2, '0')}:00
                    </div>
                    <div className="p-1 min-h-[60px] relative">
                      {dayEvents.map((event) => (
                        <div key={event.id} className={`px-3 py-2 rounded text-sm text-white mb-1 ${event.color}`}>
                          <div className="font-medium">{event.title}</div>
                          <div className="text-xs opacity-90">{event.time}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </Card>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md m-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-text-primary">Add New Event</h3>
                <button onClick={() => setShowModal(false)} className="text-text-muted hover:text-text-primary">
                  ×
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Event Title</label>
                  <input
                    type="text"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    className="w-full px-3 py-2 bg-app-bg border border-app-border rounded-lg text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-accent"
                    placeholder="Enter event title"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Date</label>
                    <input
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                      className="w-full px-3 py-2 bg-app-bg border border-app-border rounded-lg text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Time</label>
                    <input
                      type="time"
                      value={newEvent.time}
                      onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                      className="w-full px-3 py-2 bg-app-bg border border-app-border rounded-lg text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Event Color</label>
                  <div className="flex items-center gap-2">
                    {eventColors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setNewEvent({ ...newEvent, color: color.class })}
                        className={`w-8 h-8 rounded-full ${color.class} ${
                          newEvent.color === color.class ? "ring-2 ring-accent ring-offset-2 ring-offset-app-surface" : ""
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-4">
                  <Button onClick={handleAddEvent} className="flex-1">
                    Add Event
                  </Button>
                  <Button variant="secondary" onClick={() => setShowModal(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

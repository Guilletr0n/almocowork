import { useState, useEffect } from "preact/hooks";

export default function GCalendarEvents(props: { fecha: string }) {
  const calendarId =
    "42262eb918f4caeb1929c89be7a0aa9beea5880eeb7b5ecf6134ea0ac9d2f011";
  const [events, setEvents] = useState<number[]>([1345, 23454, 334543]);
  const [date, setDate] = useState<string>("1");
  useEffect(() => {
    console.log(" useEffect 1...");
    setDate(props.fecha);
    setEvents([4, 5, 6]);
  }, [props.fecha]);
  useEffect(() => {
    setEvents([4, 5, 6]);
  }, []);
  console.log("esperando useEffect...");
  return (
    <div>
      <p>Google Calendar</p>
      <p>Date:{date}</p>
      <p>Fecha:{props.fecha}</p>
      <p>Events:{events}</p>
      <p>
        Events:
        {events.map((event) => (
          <span>{event}, </span>
        ))}
      </p>
    </div>
  );
}

import SlideOver from "../../../components/SlideOver";
import { InfoText, InfoStatus, InfoAddress, InfoTable } from "../../../components/info-table";
import { EventStatusDetails, EventTypeDetails } from "../../../api/events.facade";
import InvolvedVolunteers from "./InvolvedVolunteers";

function EventInfo({ event }) {
  const eventTypeText = EventTypeDetails[event.eventType]?.text ?? "Невідомий тип";

  const statusColor = EventStatusDetails[event.status]?.color ?? "gray";
  const statusText = EventStatusDetails[event.status]?.text;

  return (
    <InfoTable>
      <InfoStatus label="Тип події" statusText={eventTypeText} statusColor="gray" />
      <InfoText label="Час виникнення" text={event.createdAt} />
      <InfoAddress address={event.address} />
      <InfoText label="Код" text={event.zipCode} />
      <InfoStatus statusText={statusText} statusColor={statusColor} />
      <InfoText label="Опис" text={event.description} />
    </InfoTable>
  )
}

function EventHeader({ event }) {
  const eventTypeName = EventTypeDetails[event.eventType]?.text ?? "Невідомий тип";
  return (
    <div className="flex flex-col bg-gradient-to-l from-[#BF4040] to-[#660000] p-14 pb-16">
      <span className="text-2xl text-primary-0 font-bold">{eventTypeName}</span>
      <span className="text-red-100">{event.createdAt}</span>
    </div>
  )
}

function EventInfoSlideOver({ isOpen, toggle, event }) {
  return (
    <SlideOver isOpen={isOpen} toggle={toggle}>
      {event && (
        <div className="flex h-full flex-col bg-white shadow-xl overflow-y-auto">
          <EventHeader event={event} />
          <div className="px-14 pt-8">
            <EventInfo event={event} />
          </div>
          <div className="px-14">
            <InvolvedVolunteers volunteers={event.volunteers} />
          </div>
        </div>
      )}
    </SlideOver>
  )
}

export default EventInfoSlideOver;

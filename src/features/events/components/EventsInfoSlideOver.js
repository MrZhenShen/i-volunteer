import SlideOver from "../../../components/SlideOver";
import { InfoText, InfoStatus, InfoAddress, InfoTable } from "../../../components/info-table";
import { EventStatusDetails, EventTypeDetails } from "../../../api/events.facade";
import Icon from "../../../components/Icon";
import Button from "../../../components/Button";
import formatPhone from "../../../utils/formatPhone";

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
      <span className="text-2xl text-white font-bold">{eventTypeName}</span>
      <span>{event.createdAt}</span>
    </div>
  )
}

function InvolvedVolunteer({ volunteer }) {
  return (
    <li className="grid grid-col-1 gap-2 pt-4">
      <div className="flex justify-between items-center">
        <span className="text-sm text-body-900 font-normal">{volunteer.firstName} {volunteer.lastName}</span>
        <Button variant="destructive" size="small">Відпустити</Button>
      </div>
      <span className="text-xs text-body-400 font-normal">
        <Icon name="Rescuer" className="w-6 h-6 inline mr-1" />Рятувальник
      </span>
      <span className="font-mediuma text-body-900 font-normal">{formatPhone(volunteer.mobilePhone)}</span>
    </li>
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
            <span className="text-sm text-body-400">Залучені добровольці ({event.volunteers.length})</span>
            <ul className="grid grid-col-1 divide-y divide-gray-200 mt-6 gap-4">
              {event.volunteers.map((volunteer) => (
                <InvolvedVolunteer key={volunteer.id} volunteer={volunteer} />
              ))}
            </ul>
          </div>
        </div>
      )}
    </SlideOver>
  )
}

export default EventInfoSlideOver;

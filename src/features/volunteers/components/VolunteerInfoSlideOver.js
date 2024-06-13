import SlideOver from "../../../components/SlideOver";
import { Map } from "../../../components/map/Map";
import { InfoText, InfoStatus, InfoAddress, InfoTable } from "../../../components/info-table";

function VolunteerInfo({ volunteer }) {
  const statusColorMap = { AVAILABLE: "green", UNAVAILABLE: "gray", ATTENDING_EVENT: "red" };
  const statusTextMap = { AVAILABLE: "Активний", UNAVAILABLE: "Неактивний", ATTENDING_EVENT: "Залучений" };

  const statusColor = statusColorMap[volunteer.status] ?? "green";
  const statusText = statusTextMap[volunteer.status] ?? "В дорозі";

  return (
    <InfoTable>
      <InfoText label="Імʼя" text={volunteer.firstName} />
      <InfoText label="Прізвище" text={volunteer.lastName} />
      <InfoStatus statusText={statusText} statusColor={statusColor} />
      <InfoText label="Тел" text={volunteer.mobilePhone} />
      <InfoText label="Дата народження" text={volunteer.birthDate} />
      <InfoAddress address={volunteer.address} />
    </InfoTable>
  )
}

function VolunteerHeader({ volunteer }) {
  return (
    <div className="flex flex-col bg-gradient-to-l from-[#53678A] to-[#394966] p-14 pb-16">
      <span className="text-2xl text-white font-bold">{volunteer.firstName} {volunteer.lastName}</span>
    </div>
  )
}

function VolunteerInfoSlideOver({ isOpen, toggle, volunteer }) {
  return (
    <SlideOver isOpen={isOpen} toggle={toggle}>
      <div className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl overflow-y-auto">
        <VolunteerHeader volunteer={volunteer} />
        <div className="px-14 py-8">

          <VolunteerInfo volunteer={volunteer} />

          <div className="h-80 mb-6">
            <Map
              center={[volunteer.longitude, volunteer.latitude]}
              markers={[
                {
                  id: volunteer.id,
                  type: "rescuer",
                  position: [volunteer.longitude, volunteer.latitude],
                  selected: false,
                },
              ]}
            />
          </div>
        </div>
      </div>
    </SlideOver>
  )
}

export default VolunteerInfoSlideOver;

import Button from "../../../components/Button";
import Icon from "../../../components/Icon";
import formatPhone from "../../../utils/formatPhone";

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

function InvolvedVolunteers({ volunteers }) {
  return (
    <>
      <span className="text-sm text-body-400">Залучені добровольці ({volunteers.length})</span>
      <ul className="grid grid-col-1 divide-y divide-gray-200 mt-6 gap-4">
        {volunteers.map((volunteer) => (
          <InvolvedVolunteer key={volunteer.id} volunteer={volunteer} />
        ))}
      </ul>
    </>
  )
}

export default InvolvedVolunteers;

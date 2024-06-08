import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../features/events/thunks";
import { EventStatusDetails, EventTypeDetails } from "../api/events.facade";
import Pagination from "../components/Pagination";
import Status from "../components/Status";
import Icon from "../components/Icon";
import Button from "../components/Button";
import Select from "../components/Select";
import EventCreateSlideOver from "../containers/slide-overs/EventCreateSlideOver";
import EventDetailsSlideOver from "../containers/slide-overs/EventDetailsSlideOver";

const EventsPage = () => {
  const dispatch = useDispatch();
  const {
    data: events,
    pageDetails,
    loading,
    error,
  } = useSelector((state) => state.events);

  const tableHeaderCellStyle =
    "px-6 py-3 text-left text-base font-medium text-body-900 tracking-wider cursor-pointer";

  const [pageable, setPageable] = useState({
    page: 1,
    size: 10,
    sortBy: "",
    sortOrder: "",
    filter: "",
  });

  useEffect(() => {
    dispatch(fetchEvents(pageable));
  }, [dispatch, pageable]);

  const handlePageChange = (newPage) => {
    setPageable((prev) => ({ ...prev, page: newPage }));
  };

  const handleSortChange = (field) => {
    setPageable((prev) => ({
      ...prev,
      sortBy: field,
      sortOrder: prev.sortOrder === "asc" ? "desc" : "asc",
    }));
  };

  const [isEventCreateSlideOverOpen, setIsEventCreateSlideOverOpen] =
    useState(false);
  const [isEventDetailsSlideOverOpen, setIsEventDetailsSlideOverOpen] =
    useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleOpenSlideOver = (event) => {
    setSelectedEvent(event);
    setIsEventDetailsSlideOverOpen(true);
  };

  const handlePageSizeChange = (event) => {
    const newSize = Number(event.target.value);
    setPageable((prev) => ({ ...prev, size: newSize, page: 1 }));
  };

  const pageSizeOptions = [
    { value: "10", label: "10" },
    { value: "20", label: "20" },
    { value: "50", label: "50" },
    { value: "100", label: "100" },
    { value: `${pageDetails.totalItems}`, label: "Усі" },
  ];

  return (
    <>
      <Formik initialValues={{ pageSize: pageable.size }}>
        <Form>
          <div className="flex flex-col py-8 gap-6">
            <div className="flex justify-between items-center">
              <h1 className="text-body-900 text-lg font-bold">Події</h1>
              <Button
                icon="Add"
                variant="secondary"
                onClick={() => setIsEventCreateSlideOverOpen(true)}
              >
                Додати подію
              </Button>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-body-600">
                Відображено {events.length} із {pageDetails.totalItems}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-body-900">
                  Результатів на сторінку
                </span>
                <Select
                  size="small"
                  options={pageSizeOptions}
                  value={String(pageable.size)}
                  name="pageSize"
                  onChange={handlePageSizeChange}
                />
              </div>
            </div>

            <div className="overflow-hidden rounded-md">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-body-50">
                  <tr>
                    <th
                      onClick={() => handleSortChange("eventType")}
                      className={tableHeaderCellStyle}
                    >
                      <div className="flex gap-2.5 items-center">
                        Тип події
                        {pageable.sortBy === "eventType" ? (
                          pageable.sortOrder === "asc" ? (
                            <Icon
                              name="SortAsc"
                              className="w-6 h-6 text-primary-400"
                            />
                          ) : (
                            <Icon
                              name="SortDesc"
                              className="w-6 h-6 text-primary-400"
                            />
                          )
                        ) : (
                          <Icon
                            name="SortDesc"
                            className="w-6 h-6 text-primary-100"
                          />
                        )}
                      </div>
                    </th>
                    <th className={tableHeaderCellStyle}>
                      <div className="flex gap-2.5 items-center">Адреса</div>
                    </th>
                    <th
                      onClick={() => handleSortChange("status")}
                      className={tableHeaderCellStyle}
                    >
                      <div className="flex gap-2.5 items-center">
                        Статус
                        {pageable.sortBy === "status" ? (
                          pageable.sortOrder === "asc" ? (
                            <Icon
                              name="SortAsc"
                              className="w-6 h-6 text-primary-400"
                            />
                          ) : (
                            <Icon
                              name="SortDesc"
                              className="w-6 h-6 text-primary-400"
                            />
                          )
                        ) : (
                          <Icon
                            name="SortDesc"
                            className="w-6 h-6 text-primary-100"
                          />
                        )}
                      </div>
                    </th>
                    <th className={tableHeaderCellStyle}>
                      <div className="flex gap-2.5 items-center">Залучено</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        Завантаження...
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        {error}
                      </td>
                    </tr>
                  ) : (
                    events.map((event) => {
                      const { text: statusText, color: statusColor } =
                        EventStatusDetails[event.status];
                      const { city, street, buildingNumber, apartmentNumber } =
                        event.address;

                      return (
                        <tr key={event.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Button
                              variant="link"
                              onClick={() => handleOpenSlideOver(event)}
                            >
                              {EventTypeDetails[event.eventType].text}
                            </Button>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {city}
                            {street && `, ${street}`}
                            {buildingNumber && `, ${buildingNumber}`}
                            {apartmentNumber && `, кв. ${apartmentNumber}`}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Status
                              placeholder={statusText}
                              value={statusText}
                              color={statusColor}
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {event.volunteers.length}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
            <Pagination
              hasPrevious={pageDetails.hasPrevious}
              hasNext={pageDetails.hasNext}
              currentPage={pageDetails.page}
              totalPages={pageDetails.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </Form>
      </Formik>
      <EventCreateSlideOver
        open={isEventCreateSlideOverOpen}
        setOpen={setIsEventCreateSlideOverOpen}
      />

      {selectedEvent && (
        <EventDetailsSlideOver
          open={isEventDetailsSlideOverOpen}
          setOpen={setIsEventDetailsSlideOverOpen}
          event={selectedEvent}
        />
      )}
    </>
  );
};

export default EventsPage;

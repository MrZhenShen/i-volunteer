import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../features/events/thunks";
import Pagination from "../components/Pagination";
import Status from "../components/Status";
import Icon from "../components/Icon";
import { Form, Formik } from "formik";
import { Button, Select } from "@headlessui/react";
import EventCreateSlideOver from "../components/slide-overs/EventCreateSlideOver";
import EventDetailsSlideOver from "../components/slide-overs/EventDetailsSlideOver";

const Events = () => {
  const dispatch = useDispatch();
  const { data: events, loading, error } = useSelector((state) => state.events);

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

  const handleOpenSlideOver = (volunteer) => {
    setSelectedEvent(volunteer);
    setIsEventDetailsSlideOverOpen(true);
  };

  const handleFilterChange = (event) => {
    setPageable((prev) => ({ ...prev, filter: event.target.value, page: 1 }));
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
    { value: `${events.totalItems}`, label: "Усі" },
  ];

  return (
    <>
      <Formik initialValues={{ pageSize: pageable.size }}>
        <Form>
          <div className="flex flex-col p-8 gap-6">
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
                Відображено {events.content.length} із{" "}
                {events.totalItems}
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
                    <th className={tableHeaderCellStyle}>
                      <div className="flex gap-2.5 items-center">Ім'я</div>
                    </th>
                    <th
                      onClick={() => handleSortChange("id")}
                      className={tableHeaderCellStyle}
                    >
                      <div className="flex gap-2.5 items-center">
                        ID
                        {pageable.sortBy === "id" ? (
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
                    <th
                      onClick={() => handleSortChange("mobilePhone")}
                      className={tableHeaderCellStyle}
                    >
                      Тел
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
                    events.content.map((event) => (
                      <tr key={event.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Button
                            variant="link"
                            onClick={() => handleOpenSlideOver(event)}
                          >
                            {event.firstName} {event.lastName}
                          </Button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {event.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {event.mobilePhone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {event.status === "AVAILABLE" ? (
                            <Status
                              placeholder="Активний"
                              value="Активний"
                              color="green"
                            />
                          ) : event.status === "UNAVAILABLE" ? (
                            <Status
                              placeholder="Неактивний"
                              value="Неактивний"
                              color="gray"
                            />
                          ) : event.status === "ATTENDING_EVENT" ? (
                            <Status
                              placeholder="Залучений"
                              value="Залучений"
                              color="red"
                            />
                          ) : (
                            <Status
                              placeholder="В дорозі"
                              value="В дорозі"
                              color="green"
                            />
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <Pagination
              hasPrevious={events.hasPrevious}
              hasNext={events.hasNext}
              currentPage={events.page}
              totalPages={events.totalPages}
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

export default Events;

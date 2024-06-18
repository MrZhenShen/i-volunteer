import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import Select from "../components/Select";
import { Form, Formik } from "formik";
import Pagination from "../components/Pagination";
import Status from "../components/Status";
import Icon from "../components/Icon";
import { fetchVolunteers } from "../features/volunteers/thunks";
import { VolunteerStatusDetails } from "../api/volunteer.facade";
import VolunteerInfoSlideOver from "../features/volunteers/components/VolunteerInfoSlideOver";

const VolunteersPage = () => {
  const dispatch = useDispatch();
  const {
    data: volunteers,
    pageDetails,
    loading,
    error,
  } = useSelector((state) => state.volunteers);

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
    dispatch(fetchVolunteers(pageable));
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

  const [isVolunteerDetailsSlideOverOpen, setIsVolunteerDetailsSlideOverOpen] =
    useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);

  const handleOpenSlideOver = (volunteer) => {
    setSelectedVolunteer(volunteer);
    setIsVolunteerDetailsSlideOverOpen(true);
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

  const tbodyCellStyle = "px-6 py-4 whitespace-nowrap z-1";

  return (
    <>
      <Formik initialValues={{ pageSize: pageable.size }}>
        <Form className="h-full overflow-hidden">
          <div className="flex flex-col h-full overflow-hidden py-8 gap-6">
            <div className="flex justify-between items-center">
              <h1 className="text-body-900 text-lg font-bold">Добровольці</h1>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-body-600">
                Відображено {volunteers.length} із {pageDetails.totalItems}
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

            <div className="overflow-auto rounded-md">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-body-50/70 backdrop-blur-sm sticky top-0 z-10">
                  <tr>
                    <th className={tableHeaderCellStyle}>
                      <div className="flex gap-2.5 items-center">Ім'я</div>
                    </th>
                    <th className={tableHeaderCellStyle}>
                      <div className="flex gap-2.5 items-center">Локація</div>
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
                    volunteers.map((volunteer) => {
                      const { text: statusText, color: statusColor } =
                        VolunteerStatusDetails[volunteer.status];

                      return (
                        <tr key={volunteer.id}>
                          <td className={tbodyCellStyle}>
                            <Button
                              variant="link"
                              onClick={() => handleOpenSlideOver(volunteer)}
                            >
                              {volunteer.firstName} {volunteer.lastName}
                            </Button>
                          </td>
                          <td className={tbodyCellStyle}>
                            {volunteer.address.state}
                            {volunteer.address.city &&
                              `, ${volunteer.address.city}`}
                          </td>
                          <td className={tbodyCellStyle}>
                            {volunteer.mobilePhone}
                          </td>
                          <td className={tbodyCellStyle}>
                            <Status
                              placeholder={statusText}
                              value={statusText}
                              color={statusColor}
                            />
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
      {selectedVolunteer && (
        <VolunteerInfoSlideOver
          volunteer={selectedVolunteer}
          isOpen={isVolunteerDetailsSlideOverOpen}
          toggle={() => setIsVolunteerDetailsSlideOverOpen(!isVolunteerDetailsSlideOverOpen)} />
      )}
    </>
  );
};

export default VolunteersPage;

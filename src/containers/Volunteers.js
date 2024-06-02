import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import Select from "../components/Select";
import { Form, Formik } from "formik";
import Pagination from "../components/Pagination";
import Status from "../components/Status";
import Icon from "../components/Icon";
import VolunteerCreateSlideOver from "../components/slide-overs/VolunteerCreateSlideOver";
import { fetchVolunteers } from "../features/volunteers/thunks";

const Volunteers = () => {
  const dispatch = useDispatch();
  const { data: volunteers, loading, error } = useSelector((state) => state.volunteers);

  const tableHeaderCellStyle = "px-6 py-3 text-left text-base font-medium text-body-900 tracking-wider cursor-pointer";

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

  const [isVolunteerCreateSlideOverOpen, setIsVolunteerCreateSlideOverOpen] = useState(false);

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
    { value: `${volunteers.totalItems}`, label: "Усі" },
  ];

  return (
    <>
      <Formik initialValues={{ pageSize: pageable.size }}>
        <Form>
          <div className="flex flex-col p-8 gap-6">
            <div className="flex justify-between items-center">
              <h1 className="text-body-900 text-lg font-bold">Добровольці</h1>
              <Button icon="Add" variant="secondary" onClick={() => setIsVolunteerCreateSlideOverOpen(true)}>
                Додати добровольця
              </Button>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-body-600">
                Відображено {volunteers.size} із {volunteers.totalItems}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-body-900">Результатів на сторінку</span>
                <Select size="small" options={pageSizeOptions} value={String(pageable.size)} name="pageSize" onChange={handlePageSizeChange} />
              </div>
            </div>

            <div className="overflow-hidden rounded-md">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-body-50">
                  <tr>
                    <th onClick={() => handleSortChange("firstName")} className={tableHeaderCellStyle}>
                      <div className="flex gap-2.5 items-center">
                        Ім'я
                        {pageable.sortBy === "firstName" ? (
                          pageable.sortOrder === "asc" ? (
                            <Icon name="SortAsc" className="w-6 h-6 text-primary-400" />
                          ) : (
                            <Icon name="SortDesc" className="w-6 h-6 text-primary-400" />
                          )
                        ) : (
                          <Icon name="SortDesc" className="w-6 h-6 text-primary-100" />
                        )}
                      </div>
                    </th>
                    <th onClick={() => handleSortChange("id")} className={tableHeaderCellStyle}>
                      <div className="flex gap-2.5 items-center">
                        ID
                        {pageable.sortBy === "id" ? (
                          pageable.sortOrder === "asc" ? (
                            <Icon name="SortAsc" className="w-6 h-6 text-primary-400" />
                          ) : (
                            <Icon name="SortDesc" className="w-6 h-6 text-primary-400" />
                          )
                        ) : (
                          <Icon name="SortDesc" className="w-6 h-6 text-primary-100" />
                        )}
                      </div>
                    </th>
                    <th onClick={() => handleSortChange("mobilePhone")} className={tableHeaderCellStyle}>
                      Тел
                    </th>
                    <th onClick={() => handleSortChange("status")} className={tableHeaderCellStyle}>
                      <div className="flex gap-2.5 items-center">
                        Статус
                        {pageable.sortBy === "status" ? (
                          pageable.sortOrder === "asc" ? (
                            <Icon name="SortAsc" className="w-6 h-6 text-primary-400" />
                          ) : (
                            <Icon name="SortDesc" className="w-6 h-6 text-primary-400" />
                          )
                        ) : (
                          <Icon name="SortDesc" className="w-6 h-6 text-primary-100" />
                        )}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4">Завантаження...</td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4">{error}</td>
                    </tr>
                  ) : (
                    volunteers.content.map((volunteer) => (
                      <tr key={volunteer.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Button variant="link">{volunteer.firstName} {volunteer.lastName}</Button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{volunteer.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{volunteer.mobilePhone}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {volunteer.status === "AVAILABLE" ? (
                            <Status value="Активний" color="green" />
                          ) : volunteer.status === "UNAVAILABLE" ? (
                            <Status value="Неактивний" color="gray" />
                          ) : volunteer.status === "ATTENDING_EVENT" ? (
                            <Status value="Залучений" color="red" />
                          ) : (
                            <Status value="В дорозі" color="green" />
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <Pagination
              hasPrevious={volunteers.hasPrevious}
              hasNext={volunteers.hasNext}
              currentPage={volunteers.page}
              totalPages={volunteers.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </Form>
      </Formik>
      <VolunteerCreateSlideOver open={isVolunteerCreateSlideOverOpen} setOpen={setIsVolunteerCreateSlideOverOpen} />
    </>
  );
};

export default Volunteers;

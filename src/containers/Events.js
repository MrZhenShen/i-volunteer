import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../features/events/thunks";

const Events = () => {
  const dispatch = useDispatch();
  const { data: events, loading, error } = useSelector((state) => state.events);

  const tableHeaderCellStyle = "px-6 py-3 text-left text-base font-medium text-body-900 tracking-wider cursor-pointer";

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
    { value: `${events.totalItems}`, label: "Усі" },
  ];


    return (
      <div className="profile">
        <h1>Event Page</h1>
      </div>
    );

};

export default Events;

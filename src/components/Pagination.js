import React from "react";
import Icon from "./Icon";
import Button from "./Button";

const Pagination = ({
  hasPrevious,
  hasNext,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const generatePageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage > 2) {
        pages.push(1);
      }
      if (currentPage > 3) {
        pages.push("...");
      }
      const startPage = Math.max(currentPage - 1, 1);
      const endPage = Math.min(currentPage + 1, totalPages);
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) {
        pages.push("...");
      }
      if (currentPage < totalPages - 1) {
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <>
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4">
          {hasPrevious && (
            <Button
              onClick={() => onPageChange(currentPage - 1)}
              size="small"
              variant="link"
              classNameExtended="size-8"
            >
              <Icon name="Left" className="size-6" />
            </Button>
          )}
          {pageNumbers.map((number, index) => (
            <Button
              onClick={() => number !== "..." && onPageChange(number)}
              key={index}
              size="small"
              disabled={number === "..."}
              variant={number === currentPage ? "primary" : "link"}
              classNameExtended="min-w-8 h-8"
            >
              {number}
            </Button>
          ))}
          {hasNext && (
            <Button
              onClick={() => onPageChange(currentPage + 1)}
              size="small"
              variant="link"
              classNameExtended="size-8"
            >
              <Icon name="Right" className="size-6" />
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default Pagination;

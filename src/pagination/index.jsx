import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";

function Pagination({ CurrentPage, onChangePage }) {
  return (
    <div>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=" >"
        pageRangeDisplayed={4}
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageCount={3}
        forcePage={CurrentPage-1}
        previousLabel="< "
        renderOnZeroPageCount={null}
      />
    </div>
  );
}

export default Pagination;

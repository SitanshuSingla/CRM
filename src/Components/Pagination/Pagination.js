import "./Pagination.css";

export default function Pagination({
  total,
  customers,
  setPageNumber,
  pageNumber
}) {
  let pageCount = Math.ceil(total / 100);

  let arrayofPages = new Array(pageCount);
  arrayofPages.fill(1);
  return (
    <div className="page">
      <nav aria-label="Page navigation example" className="page">
        <ul className="pagination page">
          <li className="page-item">
            <button
              onClick={() => {
                setPageNumber(pageNumber - 1);
              }}
              className="page-link"
              href="#"
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>

          {arrayofPages.map((p, i) => {
            return (
              <li class="page-item">
                <button
                  class="page-link"
                  onClick={() => {
                    setPageNumber(i + 1);
                  }}
                >
                  {i + 1}
                </button>
              </li>
            );
          })}
          <li className="page-item">
            <button
              onClick={() => {
                setPageNumber(pageNumber + 1);
              }}
              className="page-link"
              href="#"
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

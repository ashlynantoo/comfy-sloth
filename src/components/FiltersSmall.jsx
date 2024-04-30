import { useDispatch, useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import Wrapper from "../assets/wrappers/FiltersSmall";
import { formatPrice, getUniqueValues } from "../utils";
import {
  clearFilters,
  closeFiltersModal,
  filterProducts,
  sortProducts,
} from "../features/products/productsSlice";

const FiltersSmall = () => {
  const dispatch = useDispatch();
  const { filters, sort, allProducts, filteredProducts, isFiltersModalOpen } =
    useSelector((store) => {
      return store.productsState;
    });
  const { category, company, color, minPrice, maxPrice, price, freeShipping } =
    filters;
  const dollarPrice = formatPrice(price);

  const categories = getUniqueValues(allProducts, "category");
  const companies = getUniqueValues(allProducts, "company");
  const colors = getUniqueValues(allProducts, "colors");

  const updateFilters = (event) => {
    let { name: filterName, value: filterValue } = event.target;
    if (filterName === "category" || filterName === "company") {
      filterValue = event.target.textContent;
    } else if (filterName === "color") {
      filterValue = event.target.dataset.color;
    } else if (filterName === "price") {
      filterValue = Number(filterValue);
    } else if (filterName === "freeShipping") {
      filterValue = event.target.checked;
    }
    dispatch(filterProducts({ filterName, filterValue }));
    dispatch(sortProducts(sort));
  };

  return (
    <Wrapper>
      <div className={isFiltersModalOpen ? "modal show-modal" : "modal"}>
        <div className="content">
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            {/* category */}
            <div className="form-control">
              <h5>category</h5>
              <div className="btn-container">
                {categories.map((eachCategory, index) => {
                  return (
                    <button
                      key={index}
                      type="button"
                      name="category"
                      onClick={(event) => {
                        updateFilters(event);
                      }}
                      className={eachCategory === category ? "active" : null}
                    >
                      {eachCategory}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* company */}
            <div className="form-control">
              <h5>company</h5>
              <div className="btn-container">
                {companies.map((eachCompany, index) => {
                  return (
                    <button
                      key={index}
                      type="button"
                      name="company"
                      onClick={(event) => {
                        updateFilters(event);
                      }}
                      className={eachCompany === company ? "active" : null}
                    >
                      {eachCompany}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* colors */}
            <div className="form-control">
              <h5>colors</h5>
              <div className="colors">
                {colors.map((eachColor, index) => {
                  if (eachColor === "all") {
                    return (
                      <button
                        key={index}
                        type="button"
                        name="color"
                        onClick={(event) => {
                          updateFilters(event);
                        }}
                        data-color="all"
                        className={
                          eachColor === color ? "all-btn active" : "all-btn"
                        }
                      >
                        all
                      </button>
                    );
                  }
                  return (
                    <button
                      key={index}
                      type="button"
                      name="color"
                      style={{ background: eachColor }}
                      className="color-btn"
                      data-color={eachColor}
                      onClick={(event) => {
                        updateFilters(event);
                      }}
                    >
                      {eachColor === color ? <FaCheck /> : null}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* price */}
            <div className="form-control price-container">
              <h5>price</h5>
              <p className="price">{dollarPrice}</p>
              <input
                type="range"
                name="price"
                min={minPrice}
                max={maxPrice}
                value={price}
                className="range"
                onChange={(event) => {
                  updateFilters(event);
                }}
              />
            </div>

            {/* shipping */}
            <div className="form-control shipping">
              <label htmlFor="freeShipping" className="label">
                free shipping
              </label>
              <input
                type="checkbox"
                name="freeShipping"
                id="freeShipping"
                checked={freeShipping}
                className="checkbox"
                onChange={(event) => {
                  updateFilters(event);
                }}
              />
            </div>
          </form>
          <div className="btn-container">
            <button
              type="button"
              className="btn clear-btn"
              onClick={() => {
                dispatch(clearFilters());
                dispatch(filterProducts());
                dispatch(sortProducts(sort));
              }}
            >
              clear filters
            </button>
            <button
              type="button"
              className="btn close-btn"
              onClick={() => {
                dispatch(closeFiltersModal());
              }}
            >
              show {filteredProducts.length} product
              {filteredProducts.length > 1 && "s"}
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default FiltersSmall;

import React from "react";
import styled from "styled-components";
import { useFilterContext } from "../context/filter_context";
import { getUniqueValues, formatPrice } from "../utils/helpers";
import { FaCheck } from "react-icons/fa";
//import { MdSearch } from "react-icons/md";

const Filters = () => {
  const {
    filters: { text, category, company, colors, min, max, price, shipping },
    updateFilters,
    clearFilters,
    iniAll,
  } = useFilterContext();

  const categories = getUniqueValues(iniAll, "category");
  const companies = getUniqueValues(iniAll, "company");
  const color = getUniqueValues(iniAll, "colors");

  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={(e) => e.preventDefault()}>
          {/* search */}
          <div className="filter-container">
            <div className="left">
              <div className="form-control">
                {/* <MdSearch/> */}
                <input
                  type="text"
                  name="text"
                  placeholder="search"
                  className="search-input"
                  value={text}
                  onChange={updateFilters}
                />
              </div>
              {/* search end */}
              {/* colors */}
              <div className="form-control">
                <h5>colors</h5>
                <div className="colors">
                  {color.map((item, index) => {
                    if (item === "all") {
                      return (
                        <button
                          className={`${
                            colors === "all" ? "all-btn active" : "all-btn"
                          }`}
                          data-color="all"
                          key={index}
                          name="colors"
                          onClick={updateFilters}
                        >
                          all
                        </button>
                      );
                    }
                    return (
                      <button
                        className={`${
                          colors === item ? "color-btn active" : "color-btn"
                        }`}
                        data-color={item}
                        key={index}
                        name="colors"
                        style={{ background: item }}
                        onClick={updateFilters}
                      >
                        {colors === item ? <FaCheck /> : null}
                      </button>
                    );
                  })}
                </div>
              </div>
              {/* colors end */}
              {/* price */}
              <div className="form-control">
                <h5>price</h5>
                <p className="price">{formatPrice(price)}</p>
                <input
                  type="range"
                  name="price"
                  onChange={updateFilters}
                  min={min}
                  max={max}
                  value={price}
                />
              </div>
              {/* price end */}
            </div>
            <div className="right">
              {/* categs */}
              <div className="form-control brand">
                <h5>category</h5>
                <select
                  name="category"
                  value={category}
                  onChange={updateFilters}
                  className="company"
                >
                  {categories.map((item, index) => {
                    let itm = item[0].toUpperCase() + item.slice(1);

                    return (
                      <option value={item} key={index}>
                        {itm}
                      </option>
                    );
                  })}
                </select>
                {/* <div className="">
              {categories.map((item, index) => {
                return (
                  <button
                    key={index}
                    className={`${
                      category === item.toLowerCase() ? "active" : null
                    }`}
                    onClick={updateFilters}
                    name="category"
                    type="button"
                  >
                    {item}
                  </button>
                );
              })}
            </div> */}
              </div>
              {/* categs end */}
              {/* companies */}
              <div className="form-control brand">
                <h5>brand</h5>
                <select
                  name="company"
                  value={company}
                  onChange={updateFilters}
                  className="company"
                >
                  {companies.map((item, index) => {
                    let itm = item[0].toUpperCase() + item.slice(1);

                    return (
                      <option value={itm} key={index}>
                        {itm}
                      </option>
                    );
                  })}
                </select>
              </div>
              {/* companies end */}

              {/* shipping */}
              <div className="form-control shipping">
                <label htmlFor="shipping">free shipping</label>
                <input
                  type="checkbox"
                  name="shipping"
                  onChange={updateFilters}
                  id="shipping"
                  checked={shipping}
                />
              </div>
              {/* shipping end */}
            </div>
          </div>
        </form>
        <button className="clear-btn" type="button" onClick={clearFilters}>
          clear filters
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  @media (max-width: 768px) {
  .filter-container {
    display: grid;
    grid-template-columns: auto auto;
    /* justify-content: space-between; */
  }
}
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;

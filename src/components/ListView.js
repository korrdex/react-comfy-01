import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { formatPrice } from "../utils/helpers";
import { Link } from "react-router-dom";
import paginate from "../utils/paginate";


const ListView = ({ gist }) => {
  const [page, setPage] = useState(0);
  let newStore = paginate(gist, 3);
  const pages = newStore.length

  const nextPage = () => {
    setPage((pg) => {
      let nextPg = pg + 1;
      if (nextPg > pages - 1) {
        nextPg = 0;
      }
      return nextPg;
    });
  };
  const prevPage = () => {
    setPage((pg) => {
      let prevPg = pg - 1;
      if (prevPg < 0) {
        prevPg = pages - 1;
      }
      return prevPg;
    });
  };

  const toStart = () => {
    setPage(0);
  };

  const toEnd = () => {
    setPage(pages - 1);
  };

  let pgStart = 0;
  let pgFinish = 0;
  if(pages > 4) {

    if (page > pages - 4) {
      pgStart = pages - 3;
      pgFinish = pages;
    } else {
      pgStart = page;
      pgFinish = page + 3;
    }
  } else {
    pgFinish = pages
  }

  function trimedInfo(content, length) {
    const cutInfo = content.substr(0, length);
    return cutInfo.substr(
      0,
      Math.min(cutInfo.length, cutInfo.lastIndexOf(" "))
    );
  }

  return (
    <Wrapper>
      {newStore[page > newStore.length - 1 ? 0 : page].map((item) => {
        const { id, image: img, name, price, description: desc } = item;
        return (
          <article key={item.id}>
            <img src={img} alt={name} />
            <div className="">
              <h4>{name}</h4>
              <h5 className="price">{formatPrice(price)}</h5>
              <p>
                {trimedInfo(desc, 130)}
                ...
              </p>
              <Link to={`/products/${id}`} className="btn">
                details
              </Link>
            </div>
          </article>
        );
      })}
      <hr />
      <div className="btn-container">
        {page > 0 && pages > 4 && (
          <button className="prev-btn" onClick={prevPage}>
            prev
          </button>
        )}
        {page > 2 && pages > 4 && (
          <button className="page-btn" onClick={toStart}>
            &hellip;
          </button>
        )}
        {newStore
          .map((_, index) => {
            return (
              <button
                key={index}
                className={page === index ? "lbtn active-btn" : "lbtn"}
                onClick={() => setPage(index)}
              >
                {index + 1}
              </button>
            );
          })
          .slice(pgStart, pgFinish)}
        {page < pages - 3 && pages > 4 && (
          <button className="page-btn" onClick={toEnd}>
            &hellip;
          </button>
        )}
        {page < pages - 1 && pages > 4 && (
          <button className="next-btn" onClick={nextPage}>
            next
          </button>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  row-gap: 3rem;

  .btn-container {
    display: flex;
    justify-content: center;
  }

  img {
    width: 100%;
    display: block;
    width: 300px;
    height: 200px;
    object-fit: cover;
    border-radius: var(--radius);
    margin-bottom: 1rem;
  }
  h4 {
    margin-bottom: 0.5rem;
  }
  .price {
    color: var(--clr-primary-6);
    margin-bottom: 0.75rem;
  }
  p {
    max-width: 45em;
    margin-bottom: 1rem;
  }
  .btn {
    font-size: 0.5rem;
    padding: 0.25rem 0.5rem;
  }
  @media (min-width: 992px) {
    article {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 2rem;
      align-items: center;
    }
  }
`;

export default ListView;

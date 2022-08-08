import React, { useState } from "react";
import styled from 'styled-components'
import Product from './Product'
import paginate from "../utils/paginate";

const GridView = ({gist}) => {
const [page, setPage] = useState(0);

  let newStore = paginate(gist, 6);
  

  return (
    <Wrapper>
      <div className="products-container">
        {newStore[page > newStore.length - 1? 0: page].map((item) => {
          return <Product key={item.id} {...item} />;
        })}
      </div>
      <hr />
      <div className="btn-container">
        {newStore.map((_, index) => {
          return (
          <button key={index} className={page === index? 'btn active-btn': 'btn'} onClick={() => setPage(index)} >
          {index + 1}
          </button>
          );
        })}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  img {
    height: 175px;
  }

  .products-container {
    display: grid;
    gap: 2rem 1.5rem;
        
  }

  .btn-container {
    display: flex;
    justify-content: center;
    margin-top: 2em;
  }
  hr {
    margin: 2em 0;
  }

  @media (min-width: 992px) {
    .products-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 1170px) {
    .products-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`

export default GridView

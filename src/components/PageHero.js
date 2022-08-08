import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { usePathname } from "../context/products_context";
import {useProductsContext } from '../context/products_context'

const PageHero = () => {
  const title = usePathname().split("/").pop();
  const { single } = useProductsContext();
  return (
    <Wrapper>
      <div className="section-center">
        
        {usePathname().includes("products/")?   <h3>
           <Link to="/">Home /</Link><Link to="/products">Products /</Link>
          {single.name}
          </h3>:  <h3>
           <Link to="/">Home /</Link>
          {title}
          </h3>
}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--clr-primary-10);
  width: 100%;
  min-height: 4vh;
  display: flex;
  align-items: center;
    
  h3 {
    margin-top: 0.8vh;
    padding: none;
    font-size: 1rem;
  }
  color: var(--clr-primary-1);
  a {
    color: var(--clr-primary-3);
    padding: 0.5rem;
    transition: var(--transition);
    
  }
  a:hover {
    color: var(--clr-primary-1);
  }
`;

export default PageHero;

import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductsContext } from "../context/products_context";
import { single_product_url as url } from "../utils/constants";
import { formatPrice } from "../utils/helpers";
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from "../components";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SingleProductPage = () => {
 const {id} = useParams()
 const navigate = useNavigate();
  const {
    single_loading: loading,
    single_error: error,
    fetchSingle,
    single,
  } = useProductsContext()

  useEffect (() => {
    fetchSingle(`${url}${id}`);
    // eslint-disable-next-line
  }, [id])

    useEffect (() => {
      if (error) {
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
      return () => {
        clearTimeout();
      };
      // eslint-disable-next-line
    }, [error])  
    

   if(loading) {
    return <Loading />
  }
  if(error) {
    return <Error/>
  }
 
  const{id:sku, name, price, description: desc, stock, stars, reviews, company:brand, images, } = single

  return <Wrapper>
    <PageHero title={name} product/>
    <div className="section section-center page">
      <Link to='/products' className= 'btn'>back to store</Link>
      <div className="product-center">
        <ProductImages images={images}></ProductImages>
        <section className="content">
          <h2>{name}</h2>
          <Stars stars={stars} reviews={reviews}/>
          <h5 className="price">{formatPrice(price)}</h5>
          <p className="desc">{desc}</p>
          <p className="info">
            <span>availability:</span>
            {stock > 0? 'in stock': 'out of stock, preorder only'}
          </p>
          <p className="info">
            <span>SKU:</span>
            {sku}
          </p>
          <p className="info">
            <span>brand:</span>
            {brand}
          </p>
          <hr />
          {stock > 0 && <AddToCart single={single}/>}
        </section>
      </div>
    </div>
  </Wrapper>
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;

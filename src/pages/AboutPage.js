import React from "react";
import styled from "styled-components";
import { PageHero } from "../components";

import aboutImg from "../assets/hero-bcg.jpeg";

const AboutPage = () => {
 
  return (
    <main>
      <PageHero ></PageHero>

      <Wrapper className="page section section-center">
        <img src={aboutImg} alt="desk" />
        <article>
          <div className="title">
            <h2>our story</h2>
            <div className="underline"></div>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores quae similique voluptas consequatur porro ullam rerum dolorem nam repellendus officia, quia consequuntur accusantium optio repellat enim in minima distinctio vitae beatae tempora dicta eos repudiandae. Nesciunt doloribus vitae id, debitis ut blanditiis libero, nobis recusandae quod iste fugit ipsam amet.
          </p>
        </article>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;
export default AboutPage;

import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { useCartContext } from "../context/cart_context";
import AmountButtons from "./AmountButtons";
import Alert from "./Alert";

const AddToCart = ({ single }) => {
  const {addToCart} = useCartContext();
  const { id, colors, stock } = single;
  //console.log(colors);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const [mainColor, setMainColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  const plus = () => {
    setAmount((amount) => {
      let tempAmount = amount + 1;
      if (tempAmount > stock) {
        tempAmount = stock;
        showAlert( true, 'stock limit reached', 'danger')
      }
      return tempAmount;
    });
  };
  const minus = () => {
    setAmount((amount) => {
      let tempAmount = amount - 1;
      if (tempAmount < 1) {
        tempAmount = 1;
      }
      return tempAmount;
    });
  };

  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, type, msg });
  };

  return (
    <Wrapper>
      <div className="colors">
        <span>colors:</span>
        <div className="">
          {colors.map((item, index) => {
            return (
              <button
                key={index}
                style={{ background: item }}
                className={`${
                  mainColor === item ? "color-btn active" : "color-btn"
                }`}
                onClick={() => setMainColor(item)}
              >
                {mainColor === item ? <FaCheck /> : null}
              </button>
            );
          })}
        </div>
      </div>
      <div className="btn-container">
        <AmountButtons
          amount={amount}
          plus={plus}
          minus={minus}
          showAlert={showAlert}
        />
        <Link
          to="/cart"
          className="btn"
          onClick={() => addToCart(id, mainColor, amount, single)}
        >
          {" "}
          add to cart{" "}
        </Link>
        {alert.show && <Alert {...alert} remAlert={showAlert}/>}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
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
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`;
export default AddToCart;

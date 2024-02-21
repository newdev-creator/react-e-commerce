import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateItemFromSelect, deleteFromCart } from "../features/cart";

export default function Cart({ onClose }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-slate-700/75 flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-20 bg-slate-300 text-slate-900 min-w-[400px] md:min-w-[700px] px-10 pt-10 pb-6 border border-slate-600 mb-[10vh]"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 w-7 h-7 bg-red-600 text-slate-100 rounded flex justify-center items-center"
        >
          x
        </button>
        <ul>
          {cart.cartItems.length > 0 ? (
            cart.cartItems.map((el) => (
              <li key={el.id} className="flex items-center mb-4">
                <img
                  className="w-16 h-16 rounded"
                  src={`/images/${el.img}.png`}
                  alt={el.title}
                />
                <p className="mr-auto ml-2 text-lg font-semibold">{el.title}</p>
                <select
                  onChange={(e) =>
                    dispatch(
                      updateItemFromSelect({
                        value: e.target.value,
                        id: el.id,
                      })
                    )
                  }
                  className="w-20 p-2 rounded mr-4"
                  value={el.quantiy}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
                <button
                  onClick={() => dispatch(deleteFromCart(el.id))}
                  className="bg-slate-900 text-slate-200 px-2 inline-flex items-center justify-center rounded p-2"
                >
                  Remove from cart
                </button>
              </li>
            ))
          ) : (
            <li className="mb-4">Add some items to your cart...</li>
          )}
        </ul>
        <p>
          Your total:{" "}
          <span className="font-semibold">
            {cart.cartItems
              .reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
              .toFixed(2)}
            $
          </span>
        </p>
        <button className="block mx-auto bg-slate-800 text-slate-200 rounded px-4 py-2">
          Proceed to checkout
        </button>
      </div>
    </div>
  );
}

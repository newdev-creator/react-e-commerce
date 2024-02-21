import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductsList } from "../features/products";
import { addOneToCart } from "../features/cart";

export default function ProductsList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  if (!products.items) {
    dispatch(getProductsList());
  }
  console.log(products);

  return (
    <div className="px-6">
      <h1 className="text-slate-100 text-2xl mb-6">Here are our products</h1>
      <ul className="grid min-[500px]:grid-cols-2 md:grid-cols-3 gap-4">
        {products.items &&
          products.items.map((item) => (
            <li key={item.id} className="p-4 bg-slate-200 rounded">
              <img
                className="mb-4"
                src={`/images/${item.img}.png`}
                alt={`${item.title} picture`}
              />
              <div className="flex justify-between items-center mb-6">
                <p className="text-slate-700 text-lg">{item.title}</p>
                <p className="text-slate-900 font-bold">{item.price}</p>
              </div>
              <button
                onClick={() => dispatch(addOneToCart(item.id))}
                className={`${
                  item.picked ? "bg-green-700" : "bg-slate-600"
                } w-full text-slate-100 px-2 inline-flex items-center justify-center rounded p-2 mr-2`}
              >
                {item.picked ? "Item picked ✔️" : "Add to cart"}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

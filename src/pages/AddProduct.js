import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { context } from "../store/store";
import { url } from "../App";
import refreshToken from "../util/refreshToken";

export default function AddProduct({ onProduct, editProduct, getProduct }) {
  const [product, setProduct] = useState({
    title: "",
    imageUrl: "",
    price: "",
    description: "",
  });
  const [messageError, setMessageError] = useState('');
  
  const { user, setUser } = useContext(context);
  const navigate = useNavigate();
  console.log("edit", editProduct);
  useEffect(() => {
    if (editProduct) {
      return setProduct({
        title: editProduct?.product?.title,
        imageUrl: editProduct?.product?.imageUrl,
        price: editProduct?.product?.price,
        description: editProduct?.product?.description,
      });
    }
  }, [editProduct]);

  const handleChangeInput = (e, name) => {
    setMessageError('');
    let stateCopy = { ...product };
    stateCopy[name] = e.target.value;

    setProduct(stateCopy);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editProduct) {
      try {
        const id = editProduct?.product?._id;
        product.id = id;
        const res = await fetch(`${url}edit/${id}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-type": "application/json",
          },
          body: JSON.stringify(product),
        });
        const data = await res.json();
        if(data.message !== 'ok') {
          return setMessageError('Value invalid!');
        }
        if (data.message === "Token is not valid")
          return refreshToken(user, setUser);
        if(data.message === 'ok') {
          getProduct();
          navigate("/");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      onProduct(product);
    }
  };

  // save edit product
  const onEditProduct = async (product) => {
    try {
      console.log("post-edit", product);
      const res = await fetch(`${url}edit/${product.id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(product),
      });
      const data = await res.json();
      if (data.message === "Token is not valid")
        return refreshToken(user, setUser);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main>
      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={(e) => handleChangeInput(e, "title")}
          />
        </div>
        <div className="form-control">
          <label>Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={product.imageUrl}
            onChange={(e) => handleChangeInput(e, "imageUrl")}
          />
        </div>
        <div className="form-control">
          <label>Price</label>
          <input
            type="text"
            name="price"
            value={product.price}
            onChange={(e) => handleChangeInput(e, "price")}
          />
        </div>
        <div className="form-control">
          <label>Description</label>
          <textarea
            type="text"
            name="description"
            rows="5"
            value={product.description}
            onChange={(e) => handleChangeInput(e, "description")}
          ></textarea>
        </div>
        <div className='error-message'>{messageError}</div>
        <button className="btn" type="submit">
          {editProduct ? "Edit" : "Add Product"}
        </button>
      </form>
    </main>
  );
}

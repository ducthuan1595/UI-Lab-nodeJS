import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduct({ onProduct, editProduct, onEditProduct }) {
  const [product, setProduct] = useState({
    title: "",
    imageUrl: "",
    price: "",
    description: "",
  });

  const navigate = useNavigate();
console.log('edit', editProduct);
  useEffect(()=> {
    if(editProduct) {
      return setProduct({
        title: editProduct.product.title,
        imageUrl: editProduct.product.imageUrl,
        price: editProduct.product.price,
        description: editProduct.product.description
      })
    }
  }, [editProduct])

  const handleChangeInput = (e, name) => {
    let stateCopy = { ...product };
    stateCopy[name] = e.target.value;

    setProduct(stateCopy);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(editProduct) {
      const id = editProduct.product._id;
      console.log('edit-id-add', id)
      product.id = id;
      onEditProduct(product);
      navigate("/");
    }else {
      onProduct(product);
      navigate("/");
    }
  };

  return (
    <main>
      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label>Title</label>
          <input
            type="text"
            name="titles"
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
        <button className='btn' type="submit">{editProduct ? 'Edit' : 'Add Product'}</button>
      </form>
    </main>
  );
}

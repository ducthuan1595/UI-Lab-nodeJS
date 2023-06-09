import { useContext } from "react";
import { context } from "../store/store";
import { Buffer } from "buffer";

const Detail = ({ fetchDetailProduct, onCart }) => {
  const product = fetchDetailProduct();
  const { user } = useContext(context);
  const handleAddCart = (id) => {
    onCart(id);
  };

  console.log('detail-product', product);
  // const base64 = Buffer.from(product?.imageUrl).toString('base64');

  return (
    <>
      <div>
        {product && (
          <div className="card">
            <div className="card__header">
              <h1>{product.title}</h1>
            </div>
            <div className="card__image">
              <img src={'data:image/jpeg;base64,' + Buffer.from(product.imageUrl).toString('base64')} alt={product.title} />
            </div>
            <div className="card__content">
              <h1>{product.price}</h1>
              <p>{product.description}</p>
            </div>
            <div className="card__actions">
              {user && (
                <button
                  className="btn"
                  onClick={handleAddCart.bind(null, product._id)}
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Detail;

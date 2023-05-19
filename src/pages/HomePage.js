import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { context } from "../store/store";
import { Buffer } from 'buffer';

export default function HomePage ({ products, onCart, onDetail }) {
  const navigate = useNavigate();
  const { user } = useContext(context);
  const handleAddCart = (id) => {
    onCart(id);
  };

  const handleClickDetail = (id) => {
    onDetail(id);
    navigate('/detail');
  }

  
  return (
    <main>
      <div className='grid'>
        {products?.length > 0 && products.map((item, index) => {
          // const base64 = btoa(String.fromCharCode.apply(null, new Uint8Array(item.imageUrl)))
          const base64 = Buffer.from(item.imageUrl).toString('base64')
          return (
            <div className='card' key={index}>
              <div className='card__header'>
                <h1>{item.title}</h1>
              </div>
              <div className='card__image'>
                <img src={'data:image/jpeg;base64,' + base64} alt={item.title} />
              </div>
              <div className='card__content'>
                <h1>{item.price}</h1>
                <p>{item.description}</p>
              </div>
              <div className='card__actions'>
                <button className='btn' onClick={handleClickDetail.bind(null, item._id)} >Detail</button>
                {user && <button className='btn' onClick={handleAddCart.bind(null, item._id)}>Add to Cart</button>}
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}
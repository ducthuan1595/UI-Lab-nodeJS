import { useNavigate } from "react-router-dom";

export default function HomePage ({ products, onCart, onDetail }) {
  const navigate = useNavigate();

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
          return (
            <div className='card' key={index}>
              <div className='card__header'>
                <h1>{item.title}</h1>
              </div>
              <div className='card__image'>
                <img src={item.imageUrl} alt={item.title} />
              </div>
              <div className='card__content'>
                <h1>{item.price}</h1>
                <p>{item.description}</p>
              </div>
              <div className='card__actions'>
                <button className='btn' onClick={handleClickDetail.bind(null, item._id)} >Detail</button>
                <button className='btn' onClick={handleAddCart.bind(null, item._id)}>Add to Cart</button>
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}
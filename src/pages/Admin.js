import { useNavigate } from "react-router-dom";

export default function Admin ({ products, onCart, onEdit, onDelete }) {
  const navigate = useNavigate();

  const handleAddCart = (id) => {
    onCart(id);
  };

  const handleClickEdit = (id) => {
    console.log('id-edit-admin', id)
    onEdit(id);
    navigate('/edit-product');
  }

  const handleDelete = (id) => {
    onDelete(id)
    // navigate('/admin');
  }
console.log('products-edit', products);
  return (
    <main>
      <div className='grid'>
        {products.length > 0 && products.map((item, index) => {
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
                <button className='btn' onClick={handleClickEdit.bind(null, item._id)} >Edit</button>
                <button className='btn' onClick={handleAddCart.bind(null, item._id)}>Add to Cart</button>
                <button className='btn' onClick={handleDelete.bind(null, item._id)}>Delete</button>
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}
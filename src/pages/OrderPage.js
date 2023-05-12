const OrderPage = ({ onGetOrder }) => {

  const order = onGetOrder();
  console.log('order-page', order)

  const handleBuyOrder = () => {
    
  }

  return (
    <main>
      <div className='order-item'>
        {order && order.orders.map(products => {
          return (
            <div key={products._id}>
              {products.products.map(p => {
                return (
                  <div key={p._id} className='card order'>
                    <h4>{p.productData.title}</h4>
                    <p>({p.quantity})</p>
                  </div>
                )
              })}
            </div>
          )
        })}
        <button className='btn order-btn' onClick={handleBuyOrder}>Buy order</button>
      </div>
    </main>
  )
}

export default OrderPage;
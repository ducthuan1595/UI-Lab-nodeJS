import { useContext, useState } from "react";
import { url } from "../App";
import { context } from "../store/store";

const OrderPage = ({ onGetOrder }) => {
  const { user } = useContext(context);
  const [urls, setUrls] = useState('');
  const order = onGetOrder();


  const handleReceiveInvoice = async(orderId) => {
    try{
      // const urlencoded = new URLSearchParams();
      const requests = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        // body: urlencoded,
        redirect: 'follow'
      }
      const res = await fetch(`${url}order/${orderId}`, requests);
      const urls = res.url;
      setUrls(urls)
      console.log(urls);
    }catch(err){
      console.error(err);
    }
  }

  return (
    <main>
      <div className='order-item'>
        {order && order.map(products => {
          return (
            <div key={products._id}>
              {products.products?.map(p => {
                return (
                  <div key={p._id} className='card order'>
                    <h4>{p.productData.title}</h4>
                    <p>({p.quantity})</p>
                  </div>
                )
              })}
              <a href={`http://localhost:5000/order/${products._id}`} className='btn anchor-link text-left' target="_blank">invoice</a>
            </div>
          )
        })}
        {/* <button className='btn order-btn' onClick={handleBuyOrder}>Buy order</button> */}
      </div>
    </main>
  )
}

export default OrderPage;
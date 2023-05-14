import React, { useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Navigation from './layout/Navigation';
import HomePage from './pages/HomePage';
import AddProduct from './pages/AddProduct';
import Cart from './pages/Cart';
import Detail from './pages/Detail';
import Admin from './pages/Admin';
import OrderPage from './pages/OrderPage';
import Form from './components/Forms';
import { context } from './store/store';
import refreshToken from './util/refreshToken';

export const url = 'http://localhost:5000/';

function App() {
  const [products, setProducts]  = useState([]);
  const [product, setProduct] = useState({});
  const [detailProduct, setDetailProduct] = useState({});
  const [editProduct, setEditProduct] = useState(null);
  const [cart, setCart] = useState(null)
  const [order, setOrder] = useState(null)

  const { user, setUser } = useContext(context);
  console.log(user);

  const getProduct = async() => {
    try{
      const res = await fetch(`${url}`);
      const data = await res.json();
      if(data) {
        console.log(data.products)
        setProducts(data.products);
      }
    }catch(err) {
      console.log(err.message);
    }
  };

  const getDetailProduct = async(id) => {
    try{
      const res = await fetch(`${url}detail/${id}`);
      if(!res.message === 'ok') {
        return ;
      }
      const data = await res.json();
      if(data) {
        console.log('data-detail', data)
        setDetailProduct(data);
      }
    }catch(err) {
      console.log(err)
    }
  };

  // save edit product
  const onEditProduct = async(product) => {
    try{
      console.log('post-edit', product)
      const res = await fetch(`${url}edit/${product.id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify(product)
      });
      await getProduct();
    }catch(err) {
      console.log(err)
    }
  };

  const postProduct = async() => {
    try{
      const res = await fetch(`${url}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-type': 'application/json'
        },
        body: JSON.stringify(product)
      })
      console.log('add new product', product)
    }catch(err) {
      console.log(err)
    }
  }
  useEffect(()=> {
    if(Object.keys(product).length !== 0) {
      postProduct();
    }
  }, [product]);

  // delete product
  const deleteProduct = async(id) => {
    const res = await fetch(`${url}delete`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      },
      body: JSON.stringify({id: id})
    });
    const data = await res.json()
    console.log('data-delete', data)
  };
  
  // delete product
  const onDelete = async(id) => {
    await deleteProduct(id);
    await getProduct();
  }

  // add product
  const onProduct = async(product) => {
    if(Object.keys(product).length !== 0) {
      await setProduct(product);
      await getProduct();
    }
  };

  const getCart = async() => {
    try{
      const res = await fetch(`${url}get-cart`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${user.token}` }
      });
      const data = await res.json();
      if(data.message !== 'ok') {
        return;
      }
      // console.log('get-cart', data)
      setCart(data)
    }
    catch(err) {
      console.log(err.message)
    }
  }

  const onGetCart = () => {
    if(cart !== null) {
      return cart;
    }
  }
  // add product to cart with id
  const onCart = async(id) => {
    const postCart = async() => {
      try{
        const res = await fetch(`${url}add-cart`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
          },
          body: JSON.stringify({id: id})
        })
        // console.log('add cart', id)
        if(res.status === 403) {
          console.log('ok');
          await refreshToken(user, setUser);
        }
      }catch(err) {
        console.log(err.message)
      }
    }
    await postCart();
    await getCart();
  };

  useEffect(()=> {
    getProduct();
    getCart();
  }, []);

  const onDeleteCart = async(id) => {
    await fetch(`${url}delete-cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      },
      body: JSON.stringify({ id: id})
    })
    await getCart();
  };

  // ORDER
  const onOrder = async() => {
    const postOrder = async() => {
      await fetch(`${url}post-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
      });
    }
    await postOrder();
    await getOrder();
    await getCart();
  };

  const getOrder = async() => {
    try{
      const res = await fetch(`${url}get-orders`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${user.token}` }
      });
      const data = await res.json();
      if(data.message !== 'ok') {
        return;
      }
      setOrder(data)
      // console.log('data-order-item', data)
    }catch(err) {
      console.log(err)
    }
  }
  useEffect(()=> {
    getOrder();
  }, []);

  useEffect(() => {
    getProduct();
  }, [product, user])

  // get detail id from home page
  const onDetail = (productId) => {
    getDetailProduct(productId);
  };

  // Edit product
  const onEdit = async(id) => {
    try{
      console.log('id-edit', id)
      const res = await fetch(`${url}get-edit/${id}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${user.token}` }
      });
      if(!res.message === 'ok') {
        return ;
      }
      const data = await res.json();
      if(data && typeof data !== 'string') {
        setEditProduct(data);
      }
    }catch(err) {
      console.log(err)
    }
  }

  // fetch detail product from api
  const fetchDetailProduct = () => {
    // console.log(Object.keys(detailProduct).length === 0);
    if(Object.keys(detailProduct).length !== 0) {
      return detailProduct.product;
    }
  }

  const onGetOrder = () => {
    if(order !== null) {
      return order;
    }
  }

  return (
    <div>
      <Navigation />
      <Routes>
        <Route path='/' element={<HomePage products={products} onCart={onCart} onDetail={onDetail} />} />
        <Route path='/product' element={<HomePage products={products} onCart={onCart} onDetail={onDetail} />} />
        <Route path='/edit-product' element={<AddProduct editProduct={editProduct} onEditProduct={onEditProduct} />} />
        <Route path='/add-product' element={<AddProduct onProduct={onProduct} />} />
        <Route path='/order' element={<OrderPage onGetOrder={onGetOrder} />} />
        <Route path='/cart' element={<Cart onGetCart={onGetCart} onDelete={onDeleteCart} onOrder={onOrder} />} />
        <Route path='/detail' element={<Detail fetchDetailProduct={fetchDetailProduct} onCart={onCart} />} />
        <Route path='/admin' element={<Admin products={products} onCart={onCart} onEdit={onEdit} onDelete={onDelete} />} />

        <Route path='/form/:params' element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;

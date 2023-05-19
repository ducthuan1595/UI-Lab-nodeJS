import React, { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";

import Navigation from "./layout/Navigation";
import HomePage from "./pages/HomePage";
import AddProduct from "./pages/AddProduct";
import Cart from "./pages/Cart";
import Detail from "./pages/Detail";
import Admin from "./pages/Admin";
import OrderPage from "./pages/OrderPage";
import Form from "./components/Forms";
import { context } from "./store/store";
import refreshToken from "./util/refreshToken";

export const url = "http://localhost:5000/";

function App() {
  const [products, setProducts] = useState([]);
  const [detailProduct, setDetailProduct] = useState({});
  const [editProduct, setEditProduct] = useState(null);
  const [cart, setCart] = useState(null);
  const [order, setOrder] = useState(null);

  const { user, setUser } = useContext(context);
  // console.log(user);

  const getProduct = async () => {
    try {
      const res = await fetch(`${url}`);
      const data = await res.json();
      if (data) {
        setProducts(data.products);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const getDetailProduct = async (id) => {
    try {
      const res = await fetch(`${url}detail/${id}`);
      if (!res.message === "ok") {
        return;
      }
      const data = await res.json();
      if (data) {
        console.log("data-detail", data);
        setDetailProduct(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onProduct = async (product) => {
    // let data;
    const fetchRequest = async (token) => {
      const formdata = new FormData();
      formdata.append("title", product.title);
      formdata.append("price", product.price);
      formdata.append("imageUrl", product.imageUrl);
      formdata.append("description", product.description);
      const res = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token ? token : user.token}`,
        },
        body: formdata,
      };
      const response = await fetch(`${url}`, res);
      let data = await response.json();
      return data;
    };

    const checkRequest = async () => {
      const data = await fetchRequest();
      if (data.message === "Token is not valid") {
        const token = await refreshToken(user, setUser);
        await fetchRequest(token);
      }
      getProduct();
    };
    checkRequest();
  };

  // delete product
  const deleteProduct = async (id) => {
    const fetchRequest = async (token) => {
      const res = await fetch(`${url}delete`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token ? token : user.token}`,
        },
        body: JSON.stringify({ id: id }),
      });
      const data = await res.json();
      return data;
    };
    const checkRequest = async () => {
      const data = await fetchRequest();
      if (data.message === "Token is not valid") {
        const token = await refreshToken(user, setUser);
        await fetchRequest(token);
      }
      getProduct();
    };
    checkRequest();
  };

  // delete product
  const onDelete = async (id) => {
    await deleteProduct(id);
    await getProduct();
  };

  const getCart = async () => {
    try {
      const fetchRequest = async (token) => {
        const res = await fetch(`${url}get-cart`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token ? token : user.token}` },
        });
        const data = await res.json();
        return data;
      };
      const checkRequest = async () => {
        const data = await fetchRequest();
        if (data.message === "Token is not valid") {
          const token = await refreshToken(user, setUser);
          await fetchRequest(token);
        }
        if(data.message === 'ok') {
          return setCart(data);
        } 
      };
      checkRequest();
    } catch (err) {
      console.log(err.message);
    }
  };

  const onGetCart = () => {
    if (cart !== null) {
      return cart;
    }
  };
  // add product to cart with id
  const onCart = async (id) => {
    try {
      const postCart = async (token) => {
        const res = await fetch(`${url}add-cart`, {
          method: "POST",
          headers: {
            // Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token ? token : user.token}`,
          },
          body: JSON.stringify({ id: id }),
        });
        const data = await res.json();
        return data;
      };
      const checkRequest = async () => {
        const data = await postCart();
        if (data.message === "Token is not valid") {
          const token = await refreshToken(user, setUser);
          await postCart(token);
        }
        if(data.message === 'ok') {
          return await getCart();
        }   
      };
      checkRequest();
    } catch (err) {
      console.log(err.message);
    }
  };

  const onDeleteCart = async (id) => {
    const fetchRequest = async(token) => {
      const res = await fetch(`${url}delete-cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token ? token : user.token}`,
        },
        body: JSON.stringify({ id: id }),
      });
      const data = await res.json();
      return data;
    }
    const checkRequest = async () => {
      const data = await fetchRequest();
      if (data.message === "Token is not valid") {
        const token = await refreshToken(user, setUser);
        await fetchRequest(token);
      }
      if(data.message === 'ok') {
        return getCart();
      }
    };
    checkRequest();
  };

  // ORDER
  const onOrder = async () => {
    const postOrder = async (token) => {
      const res = await fetch(`${url}post-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token ? token : user.token}`,
        },
      });
      const data = await res.json();
      return data;
    }
      const checkRequest = async () => {
        const data = await postOrder();
        if (data.message === "Token is not valid") {
          const token = await refreshToken(user, setUser);
          await postOrder(token);
        }
        if(data.message === 'ok') {
          getOrder();
          getCart();
        }
      };
      checkRequest();
  };

  const getOrder = async () => {
    try {
      const fetchRequest = async(token) => {
        const res = await fetch(`${url}get-orders`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token ? token : user.token}` },
        });
        const data = await res.json();
        return data;
      }
      const checkRequest = async () => {
        const data = await fetchRequest();
        if (data.message === "Token is not valid") {
          const token = await refreshToken(user, setUser);
          await fetchRequest(token);
        }
        if(data.message === 'ok') {
          setOrder(data.orders);
        }
      };
      checkRequest();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);
  useEffect(() => {
    getCart();
  }, [user]);
  useEffect(() => {
    getOrder();
  }, [user]);

  // get detail id from home page
  const onDetail = (productId) => {
    getDetailProduct(productId);
  };

  // Edit product
  const onEdit = async (id) => {
    try {
      const fetchRequest = async(token) => {
        const res = await fetch(`${url}get-edit/${id}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const data = await res.json();
        return data;
      }
      const checkRequest = async () => {
        const data = await fetchRequest();
        if (data.message === "Token is not valid") {
          const token = await refreshToken(user, setUser);
          await fetchRequest(token);
        }
      };
      checkRequest();
    } catch (err) {
      console.log(err);
    }
  };

  // fetch detail product from api
  const fetchDetailProduct = () => {
    if (Object.keys(detailProduct).length !== 0) {
      return detailProduct.product;
    }
  };

  const onGetOrder = () => {
    if (order !== null) {
      return order;
    }
  };

  return (
    <div>
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage products={products} onCart={onCart} onDetail={onDetail} />
          }
        />
        <Route
          path="/product"
          element={
            <HomePage products={products} onCart={onCart} onDetail={onDetail} />
          }
        />
        <Route
          path="/edit-product"
          element={
            <AddProduct editProduct={editProduct} getProduct={getProduct} />
          }
        />
        <Route
          path="/add-product"
          element={<AddProduct onProduct={onProduct} />}
        />
        <Route path="/order" element={<OrderPage onGetOrder={onGetOrder} />} />
        <Route
          path="/cart"
          element={
            <Cart
              onGetCart={onGetCart}
              onDelete={onDeleteCart}
              onOrder={onOrder}
            />
          }
        />
        <Route
          path="/detail"
          element={
            <Detail fetchDetailProduct={fetchDetailProduct} onCart={onCart} />
          }
        />
        <Route
          path="/admin"
          element={
            <Admin
              products={products}
              onCart={onCart}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          }
        />

        <Route path="/form/:params" element={<Form getCart={getCart} />} />
      </Routes>
    </div>
  );
}

export default App;

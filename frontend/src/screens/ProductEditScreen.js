import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { Link } from 'react-router-dom';
import { listProductDetails, updateProduct } from '../actions/productActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import axios from 'axios';

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [quality, setQuality] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [weight, setWeight] = useState('');
  const [originZone, setOriginZone] = useState('');
  const [originArea, setOriginArea] = useState('');
  const [originPostCode, setOriginPostCode] = useState('');
  const [krisiCardNumber, setKrisiCardNumber] = useState(0);
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { error, product, loading } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    error: errorUpdate,
    success: successUpdate,
    loading: loadingUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push('/products');
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else if (product.name === 'sample name') {
      } else {
        setName(product.name);
        setPrice(product.email);
        setImage(product.isAdmin);
        setQuality(product.quality);

        setCategory(product.category);
        setCountInStock(product.countInStock);
        setWeight(product.weight);
        setOriginZone(product.originZone);
        setOriginArea(product.originArea);
        setOriginPostCode(product.originPostCode);
        setKrisiCardNumber(product.krisiCardNumber);
      }
    }
  }, [productId, product, dispatch, history, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await axios.post('/api/upload', formData, config);
      console.log(data);
      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        category,
        countInStock,
        quality,
        weight,
        originZone,
        originArea,
        originPostCode,
        krisiCardNumber,
      })
    );
  };
  return (
    <>
      <Link to="/products" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id="image-file"
                label="choose file"
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>Quality</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand name"
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Count In Stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category "
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="weight">
              <Form.Label>Weight</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Weight "
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="originZone">
              <Form.Label>Origin Zone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Origin Zone "
                value={originZone}
                onChange={(e) => setOriginZone(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="originArea">
              <Form.Label>Origin Area</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Origin Area "
                value={originArea}
                onChange={(e) => setOriginArea(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="originPostCode">
              <Form.Label>Origin Post Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Origin Post Code "
                value={originPostCode}
                onChange={(e) => setOriginPostCode(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="krisiCardNumber">
              <Form.Label>Krisi Card Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Krisi Card Number Of Farmer "
                value={krisiCardNumber}
                onChange={(e) => setKrisiCardNumber(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update Product
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;

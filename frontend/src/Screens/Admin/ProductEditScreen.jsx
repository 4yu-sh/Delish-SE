import React, { useEffect, useState } from "react";

import {
  useUpdateProductMutation,
  useGetProductsDetailsQuery,
  useUploadProductImageMutation,
} from "../../slices/productsApiSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import Message from "../../Components/Message";
import Loader from "../../Components/Loader";
import { toast } from "react-toastify";

const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [seller, setSeller] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [unit, setUnit] = useState("");
  const [freshness, setFreshness] = useState("");
  const [dateHarvested, setDateHarvested] = useState("");
  const [expiresAt, setExpiresAt] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
  } = useGetProductsDetailsQuery(productId);

  const [updateProduct, { isLoading: isUpdating }, error] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const uploadFileHandler = async (e) => {
    // console.log(e.target.files[0]);
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const navigate = useNavigate();

  //   console.log(product);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setImage(product.imageSrc);
      setSeller(product.seller);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setUnit(product.unit);
      setFreshness(product.freshness);
      setDateHarvested(product.dateHarvested);
      setExpiresAt(product.expiresAt);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      _id: productId,
      name,
      price,
      description,
      image,
      seller,
      category,
      countInStock,
      unit,
      freshness,
      dateHarvested,
      expiresAt,
    };

    const result = await updateProduct(updatedProduct);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Product updated successfully");
      navigate("/admin/productlist");
    }
  };

  return (
    <>
      <div>
        <Link to="/admin/productlist" className="btn my-3">
          <h1>Go Back</h1>
        </Link>
        <div>
          <h1>Edit Product</h1>
          {isLoading && <h2>Loading...</h2>}
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">
              {error?.message?.data || error.error}
            </Message>
          ) : (
            <>
              <form className="form-container" onSubmit={submitHandler}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="price">Price</label>
                  <input
                    type="text"
                    id="price"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    id="description"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <input
                      type="text"
                      id="image"
                      placeholder="Enter image"
                      value={image}
                      onChange={(e) => setImage}
                    />
                    <input
                      type="file"
                      label="Choose File"
                      onChange={uploadFileHandler}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="seller">Seller</label>
                  <input
                    type="text"
                    id="seller"
                    placeholder="Enter seller"
                    value={seller}
                    onChange={(e) => setSeller(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <input
                    type="text"
                    id="category"
                    placeholder="Enter category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="countInStock">Count In Stock</label>
                  <input
                    type="text"
                    id="countInStock"
                    placeholder="Enter countInStock"
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="unit">Unit</label>
                  <input
                    type="text"
                    id="unit"
                    placeholder="Enter unit"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="freshness">Freshness</label>
                  <input
                    type="text"
                    id="freshness"
                    placeholder="Enter freshness"
                    value={freshness}
                    onChange={(e) => setFreshness(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="dateHarvested">Date Harvested</label>
                  <input
                    type="text"
                    id="dateHarvested"
                    placeholder="Enter dateHarvested"
                    value={dateHarvested}
                    onChange={(e) => setDateHarvested(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="expiresAt">Expires At</label>
                  <input
                    type="text"
                    id="expiresAt"
                    placeholder="Enter expiresAt"
                    value={expiresAt}
                    onChange={(e) => setExpiresAt(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductEditScreen;

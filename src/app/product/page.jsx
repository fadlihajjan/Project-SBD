"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Link from "next/link";

const cookies = new Cookies();

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [editingProduct, setEditingProduct] = useState(null); // State untuk produk yang sedang diedit

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    const token = cookies.get("token");
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProducts(response.data.result);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  const addProduct = () => {
    const token = cookies.get("token");
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
        {
          name: newProduct.name,
          description: newProduct.description,
          price: parseInt(newProduct.price, 10),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setProducts([...products, response.data.result]);
        setNewProduct({ name: "", description: "", price: "" });
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };

  const deleteProduct = (id) => {
    const token = cookies.get("token");
    axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setProducts(products.filter((product) => product._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  const getProductById = (id) => {
    const token = cookies.get("token");
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEditingProduct(response.data.result);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  };

  const updateProduct = () => {
    const token = cookies.get("token");
    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/${editingProduct._id}`,
        {
          name: editingProduct.name,
          description: editingProduct.description,
          price: parseInt(editingProduct.price, 10),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        // Update products list after successful update
        const updatedProducts = products.map((product) =>
          product._id === editingProduct._id ? editingProduct : product
        );
        setProducts(updatedProducts);
        setEditingProduct(null); // Clear editing state
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };

  const cancelEdit = () => {
    setEditingProduct(null); // Clear editing state
  };

  const handleLogout = () => {
    cookies.remove("token");
    // Redirect or handle logout logic
  };

  return (
    <div className="container mx-auto p-12">
      <h1 className="text-2xl font-bold mb-4">Product Page</h1>

      <div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="border px-2 py-1 mr-2"
          />
          <input
            type="text"
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            className="border px-2 py-1 mr-2"
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            className="border px-2 py-1 mr-2"
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            onClick={addProduct}
          >
            Add Product
          </button>
        </div>

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                No
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Description
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Price
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Edit/Delete
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product,index) => (
              <tr key={product._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {index+1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.price}
                </td>
                <td className="px-6 py-4 gap-2 flex whitespace-nowrap text-right text-sm font-medium">
                  <button
                    className="text-indigo-600 hover:text-indigo-900"
                    onClick={() => getProductById(product._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-indigo-600 hover:text-indigo-900"
                    onClick={() => deleteProduct(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editingProduct && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-lg">
              <h2 className="text-lg font-bold mb-4">Edit Product</h2>
              <input
                type="text"
                placeholder="Name"
                value={editingProduct.name}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    name: e.target.value,
                  })
                }
                className="border px-2 py-1 mb-2"
              />
              <input
                type="text"
                placeholder="Description"
                value={editingProduct.description}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    description: e.target.value,
                  })
                }
                className="border px-2 py-1 mb-2"
              />
              <input
                type="number"
                placeholder="Price"
                value={editingProduct.price}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    price: e.target.value,
                  })
                }
                className="border px-2 py-1 mb-2"
              />
              <div className="flex justify-end">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2"
                  onClick={updateProduct}
                >
                  Update
                </button>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <Link
          href={"/"}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md mt-4"
          onClick={handleLogout}
        >
          Logout
        </Link>
      </div>
    </div>
  );
};

export default ProductPage;

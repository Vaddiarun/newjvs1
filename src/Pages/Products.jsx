

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Products = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  useEffect(() => {
    const fetchCategory = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://clothbackend-t858.onrender.com/api/getProducts`,
          {
            method: "POST",
            body: JSON.stringify({ category }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const fetchedData = await response.json();
        setData(fetchedData);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch products. Please try again.", {
          position: toast.TOP_CENTER,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategory();
  }, [category]);

  const handleViewDetails = (item) => {
    localStorage.setItem("item", JSON.stringify(item));
    navigate("/detailspage");
  };

  const handleDelete = async (item) => {
    if (deleting) return; // Prevent multiple clicks
    setDeleting(true);
    try {
      const response = await fetch(
        `https://clothbackend-t858.onrender.com/api/deleteProduct`,
        {
          method: "DELETE",
          body: JSON.stringify({ id: item._id }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      toast.success("Product deleted successfully!", {
        position: toast.TOP_CENTER,
        autoClose: 3000,
      });
      setData(data.filter((product) => product._id !== item._id));
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product. Please try again.", {
        position: toast.TOP_CENTER,
      });
    } finally {
      setDeleting(false);
    }
  };

  const ProductCard = ({ item }) => (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
      <img
        src={item.imageUrl || "https://via.placeholder.com/150"}
        alt={item.name || "Product Image"}
        className="w-full h-48 object-cover rounded"
      />
      <h2 className="text-lg font-semibold text-gray-800 mt-4">{item.name}</h2>
      <p className="text-orange-900 mt-2 text-xl">{item.category}</p>
      <button
        onClick={() => handleViewDetails(item)}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        View Details
      </button>
      {isAdmin && (
        <button
          onClick={() => handleDelete(item)}
          className={`mt-4 w-full ${
            deleting ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"
          } text-white py-2 rounded`}
          disabled={deleting}
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      )}
    </div>
  );

  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <SyncLoader color="blue" size={15} margin={2} />
        </div>
      ) : (
        <div className="bg-gray-100 min-h-screen p-4">
          <h1 className="text-3xl font-bold text-center mb-6">
            {category ? `${category} Products` : "Products"}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data?.length > 0 ? (
              data.map((item, index) => (
                <ProductCard key={index} item={item} />
              ))
            ) : (
              <div className="col-span-4 flex flex-col items-center justify-center mt-10 p-4 text-2xl text-gray-600">
  <img
    className="sm:w-[20px] lg:w-[300px]"
    src="https://cdni.iconscout.com/illustration/premium/thumb/product-is-empty-illustration-download-in-svg-png-gif-file-formats--no-records-list-record-emply-data-user-interface-pack-design-development-illustrations-6430781.png?f=webp"
    alt="No Products Found"
  />
  <p className="mt-4 text-center">No products available in this category.</p>
</div>

            )}
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  );
};

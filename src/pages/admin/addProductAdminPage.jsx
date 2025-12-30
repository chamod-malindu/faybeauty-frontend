import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import uploadFile from "../../utils/mediaUpload";
import isAdmin from "../../utils/isAdmin";

export default function AddProductAdminPage() {
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [alternativeNames, setAlternativeNames] = useState("");
  const [labelledPrice, setLabelledPrice] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [category, setCategory] = useState("cream");
  const navigate = useNavigate();

  async function handleSubmit(){

    const promisesArray = [];

    for(let i=0; i<images.length; i++){
      const promise = uploadFile(images[i]);
      promisesArray[i] = promise;
    }

    const responses = await Promise.all(promisesArray);
    console.log(responses);
    
    const alternativeArray = alternativeNames.split(",");
    const productData = {
      productId: productId,
      name: productName,
      altNames: alternativeArray,
      labelledPrice: labelledPrice,
      price: price,
      images: responses,
      description: description,
      stock: stock,
      isAvailable: isAvailable,
      category: category,
    };
    
    const token = localStorage.getItem("token");

    if(!token) {
      navigate("/login");
      return;
    }
    //axios import.meta.env.VITE_BACKEND_URL

    axios.post(import.meta.env.VITE_BACKEND_URL+"/api/products", productData,
    {
      headers: {
        Authorization: "Bearer "+token
      }
    }
    ).then((res) => {
      if(!isAdmin(res)){
        toast.error("Unauthorized Access");
        navigate("/login");
        return;
      }
      console.log("Product Was Successfully Created");
      console.log(res.data);
      toast.success("Product created successfully!");
      navigate("/admin/products");
    }
    ).catch((err) => {
      console.error("Error creating product:", err);
      toast.error("Failed to create product. Please try again.");
    });
    console.log("Product Data:", productData);
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[600px] border-[3px] rounded-[15px] p-[40px] flex flex-wrap justify-between">
        <div className="w-[200px] flex flex-col gap-[5px]">
          <label className="text-sm font-semibold">Product ID</label>
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="w-full border-[1px] h-[40px] rounded-md"
          />
        </div>
        <div className="w-[300px] flex flex-col gap-[5px]">
          <label className="text-sm font-semibold">Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full border-[1px] h-[40px] rounded-md"
          />
        </div>
        <div className="w-[500px] flex flex-col gap-[5px]">
          <label className="text-sm font-semibold">Alternative Names</label>
          <input
            type="text"
            value={alternativeNames}
            onChange={(e) => setAlternativeNames(e.target.value)}
            className="w-full border-[1px] h-[40px] rounded-md"
          />
        </div>
        <div className="w-[200px] flex flex-col gap-[5px]">
          <label className="text-sm font-semibold">Labelled Price</label>
          <input
            type="number"
            value={labelledPrice}
            onChange={(e) => setLabelledPrice(e.target.value)}
            className="w-full border-[1px] h-[40px] rounded-md"
          />
        </div>
        <div className="w-[200px] flex flex-col gap-[5px]">
          <label className="text-sm font-semibold">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border-[1px] h-[40px] rounded-md"
          />
        </div>
        <div className="w-[500px] flex flex-col gap-[5px]">
          <label className="text-sm font-semibold">Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImages(e.target.files)}
            className="w-full border-[1px] h-[40px] rounded-md"
          />
        </div>
        <div className="w-[500px] flex flex-col gap-[5px]">
          <label className="text-sm font-semibold">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border-[1px] h-[100px] rounded-md"
          ></textarea>
        </div>
        <div className="w-[200px] flex flex-col gap-[5px]">
          <label className="text-sm font-semibold">Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full border-[1px] h-[40px] rounded-md"
          />
        </div>
        <div className="w-[200px] flex flex-col gap-[5px]">
          <label className="text-sm font-semibold">Is Available</label>
          <select
            value={isAvailable}
            onChange={(e) => setIsAvailable(e.target.value === "true")}
            className="w-full border-[1px] h-[40px] rounded-md"
          >
            <option value={true}>Available</option>
            <option value={false}>Not Available</option>
          </select>
        </div>
        <div className="w-[200px] flex flex-col gap-[5px]">
          <label className="text-sm font-semibold">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border-[1px] h-[40px] rounded-md"
          >
            <option value="cream">Skincare</option>
            <option value="face wash">Makeup</option>
            <option value="soap">Haircare</option>
            <option value="fragrance">Fragrance</option>
          </select>
        </div>
        <div className="w-full flex justify-center flex-row py-[20px]">
          <Link
            to={"/admin/products"}
            className="w-[200px] h-[50px] bg-white text-black border-[2px] rounded-md flex justify-center items-center"
          >
            Cancel
          </Link>
          <button
            onClick={handleSubmit}
            className="w-[200px] h-[50px] bg-black text-white border-[2px] rounded-md flex justify-center items-center ml-[20px]"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}

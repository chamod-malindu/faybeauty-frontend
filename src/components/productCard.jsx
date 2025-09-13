import { Link } from "react-router-dom";

export default function ProductCard(props) {
  const product = props.product; 
  return (
    <Link to={"/overview/"+product.productId}
      className="w-[300px] h-[400px] flex flex-col shrink-0 shadow-xl rounded-2xl overflow-hidden bg-white transition-transform hover:scale-105 hover:shadow-2xl"
    >
      {/* Product Image */}
      <div className="w-full h-[250px] relative">
        <img
          src={product.images[0] || "/default-product.jpg"}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.labelledPrice > product.price && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-lg shadow-md">
            SALE
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="w-full h-[150px] flex flex-col p-3">
        <div>
          <span className="text-gray-400 text-xs">{product.productId}</span>
          <h1 className="text-lg font-bold leading-tight">
            {product.name}{" "}
            <span className="text-gray-500 text-sm font-medium">
              ({product.category})
            </span>
          </h1>
        </div>

        {/* Price Section */}
        <div className="mt-2">
          {product.labelledPrice > product.price ? (
            <p className="text-base font-semibold">
              <span className="line-through mr-2 text-gray-400 text-sm">
                {product.labelledPrice.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
              <span className="text-accent">
                {product.price.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </p>
          ) : (
            <span className="text-green-600 font-semibold">
              {product.price.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

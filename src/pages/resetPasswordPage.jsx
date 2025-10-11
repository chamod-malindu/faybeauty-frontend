import { Link } from "react-router-dom";

export default function ResetPasswordPage() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-primary">
      <div className="w-[500px] h-[450px] bg-white shadow-2xl rounded-[30px] flex flex-col justify-center items-center relative gap-[12px] p-6">
        
        {/* Heading */}
        <h1 className="absolute top-[65px] text-2xl font-semibold text-secondary flex flex-col justify-center items-center">
          Reset Password
        </h1>
        
        {/* Subtext */}
        <div className="flex flex-col items-center text-center mt-16 gap-1">
          <h2 className="text-xl text-secondary font-medium">
            Enter Your New Password
          </h2>
          <span className="text-secondary text-sm">
            Make sure your password is strong
          </span>
        </div>
        
        {/* New Password Input */}
        <input
          type="password"
          placeholder="New Password"
          className="w-[300px] h-[40px] border-2 border-accent rounded-xl px-3 focus:outline-none focus:border-accent-hover focus:ring-2 focus:ring-accent-hover transition"
        />
        
        {/* Confirm Password Input */}
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-[300px] h-[40px] border-2 border-accent rounded-xl px-3 focus:outline-none focus:border-accent-hover focus:ring-2 focus:ring-accent-hover transition"
        />
        
        {/* Button */}
        <button className="w-[300px] h-[40px] bg-accent text-white rounded-xl mt-2 hover:bg-accent-hover transition">
          Reset Password
        </button>
        
        {/* Back link */}
        <Link
          to="/login"
          className="text-accent hover:underline text-sm mt-2"
        >
          Back to Login page
        </Link>
      </div>
    </div>
  );
}

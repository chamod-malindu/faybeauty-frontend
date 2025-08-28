import { useState } from "react"
import Loader from "../components/loader";

export default function TestPage() {

  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + 1);
  }

  function decrement() {
    setCount(count - 1);
  }

  return(
    <div className="w-full h-screen flex justify-center items-center">
      <Loader />
    </div>
    
  )
}
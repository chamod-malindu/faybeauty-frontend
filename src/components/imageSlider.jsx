import { useState } from "react";

export default function ImageSlider({images}){ // const images = props.images;
  const[activeImageIndex, setActiveImageIndex] = useState(0);

  return(
    <div className="w-[300px] h-[400px] md:w-[400px] md:h-[500px]">
      <img src={images[activeImageIndex]} className="w-full h-[320px] md:h-[400px] object-cover" />
      <div className="w-full h-[50px] md:px-0 mt-[15px] md:mt-0 md:h-[100px] flex flex-row items-center justify-center gap-1">
        {
          images.map(
            (image, index)=> {
              return(
                <img src={image} key={index} className={"w-[70px] h-[70px] md:w-[90px] md:h-[90px] object-cover cursor-pointer" + (activeImageIndex == index ? " border-[3px]" : "")} 
                onClick={
                  ()=> {
                    setActiveImageIndex(index);
                  }
                }/>
              )
            }
          )
        }
      </div>
    </div>
  )
}
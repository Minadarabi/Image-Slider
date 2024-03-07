import { useEffect , useState } from "react";
import "./style.css";
import { FaArrowCircleLeft , FaArrowCircleRight } from "react-icons/fa";




export const SliderImg = ({page , limit}) => {
    const [images , setImages] = useState([]);
    const [slider , setSlider] = useState(0);
    const [errMsg , setErrMsg] = useState(null)

  async function fetchData(){
    try {
        const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`)
        const data = await response.json()
        const imageUrls = data.map((item)=>{
        return item.download_url});
            setImages(imageUrls)
        
    } catch (error) {
        setErrMsg("Error fetching images")
    }

    }
    useEffect(()=>{
        fetchData()
        
    },[page , limit])
    
    const nextSlide = ()=>{

        setSlider((prev) => (prev === images.length -1 ? 0 : prev + 1));

    };

    const prevSlide = ()=>{

        setSlider((prev) => (prev === 0 ? images.length -1 : prev - 1))

    }

  return (
    <>
    
    <div className="container">
        {errMsg && <p>{errMsg}</p>}
        <div className="slider">
            {images.map((imageUrl , index) => {
                return <div key={index} className={index === slider ? "slide active" : "slide"}> 
                {index === slider && <img src={imageUrl} alt={`Image ${index}`} />}

                </div>

            })}
            <div className="arrow-holder">
               <FaArrowCircleLeft className="left-arrow" onClick={prevSlide} />
               <FaArrowCircleRight className="right-arrow" onClick={nextSlide} />

            </div>
            <div className="indicators">
                {images.map(( _ , index) => {
                    return <span key={index} className={index === slider ? "circle active" : "circle"} onClick={()=> setSlider(index)}></span>
                })}
                
            </div>
            

        </div>

    </div>
    </>
  )
}

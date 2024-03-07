import '../styles/Slideshow.css'
import arrowLeft from '../assets/images/arrowLeft.png'
import arrowRight from '../assets/images/arrowRight.png'
import { useState } from 'react'

function Slideshow(props) {
    const [slideIndex, setSlideIndex] = useState(0)

    return (
        <div className='slideshow'>
            <button 
                className='slideArrowBox'
                onClick={() => {
                    setSlideIndex(
                        (i) => i ? i-1 : props.slides.length-1
                    )
                }}
            ><img src={arrowLeft}/></button>
            <div className='slide'>
                <img src={props.slides[slideIndex]}/>
            </div>
            <button 
                className='slideArrowBox'
                onClick={() => {
                    setSlideIndex(
                        (i) => (i + 1) % props.slides.length
                    )
                }}
            ><img src={arrowRight}/></button>
        </div>  
    )
}


export default Slideshow
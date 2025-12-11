import { useState, useEffect } from 'react';
import './CustomSlider.css';

const CustomSlider = ({ images, interval = 3000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const numImages = images.length;

    useEffect(() => {
        if (numImages === 0) return;
        const timer = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % numImages);
        }, interval);
        return () => clearInterval(timer); // Cleanup timer on unmount
    }, [numImages, interval]);

    if (numImages === 0) {
        return null; // Don't render anything if there are no images
    }

    return (
        <div className="slider-container-final">
            <div
                className="slider-track-final"
                style={{
                    width: `${numImages * 100}%`, // Set track width to be N * 100%
                    transform: `translateX(-${currentIndex * (100 / numImages)}%)` // Translate by 1/N of the track width
                }}
            >
                {images.map((image, index) => (
                    <div className="slide-final" key={index}>
                        <img src={image} alt={`Slide ${index + 1}`} className="slide-image-final" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomSlider;

import {useEffect, useState} from 'react';
import './App.css'

const getRandomImageIds = (count: number, maxId = 80): number[] => {
    const ids = new Set<number>();
    while (ids.size < count) {
        ids.add(Math.floor(Math.random() * maxId));
    }
    return Array.from(ids);
};

const ProgressiveImage = ({ id }: { id: number }) => {
    const [loaded, setLoaded] = useState(false);

    const full = `https://picsum.photos/600/400?random=${id}`;
    const preview = `https://picsum.photos/20/13?random=${id}`;

    return (
        <div className="gallery-item">
            <img
                src={preview}
                alt=""
                className={`image preview ${loaded ? 'hidden' : ''}`}
                aria-hidden="true"
            />
            <img
                src={full}
                alt={`Image ${id}`}
                className={`image full ${loaded ? 'visible' : ''}`}
                onLoad={() => setLoaded(true)}
                loading="lazy"
            />
        </div>
    );
};

const ProgressiveGallery = () => {
    const [imageIds, setImageIds] = useState<number[]>([]);

    useEffect(() => {
        setImageIds(getRandomImageIds(9)); // например, 12 случайных картинок
    }, []);

    return (
        <div className="gallery-container">
            <h1 className="gallery-title">Галерея с прогрессивной загрузкой рандомных картинок из "picsum"</h1>
            <div className="gallery-grid">
                {imageIds.map((id) => (
                    <ProgressiveImage key={id} id={id} />
                ))}
            </div>
        </div>
    );
};


function App() {

  return (
    <ProgressiveGallery />
  )
}

export default App

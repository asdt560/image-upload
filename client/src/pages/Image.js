import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getImages } from '../redux/images/imagesSlice';
import { mainClass, pClass } from '../constants';
import { useParams } from 'react-router-dom';

const Image = () => {
  const [image, setImage] = useState('');
  const dispatch = useDispatch();
  const { id } = useParams()

  useEffect(() => {
    const getImage = async () => {
      const result = await dispatch(getImages(`id=${id}`));

      console.log('id:', id);
      console.log(result);

      if (result.payload?.body?.[0]) {
        setImage(result.payload.body[0]);
      }
    };

    if (id) {
      getImage();
    }
  }, [id, dispatch]);

  if (!image) {
    return <main className={mainClass}>Loading...</main>;
  }

  return (
    <main className={mainClass}>
      <img
          className="max-w-36"
          src={`http://localhost:5000/${image.filepath}` || '#'}
          alt=""
        />
      <p className={pClass}>{image.img_name}</p>
    </main>
  )
}

export default Image;
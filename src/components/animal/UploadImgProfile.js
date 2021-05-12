import React from 'react';
import ImageUpload from 'image-upload-react';
import { useDispatch } from 'react-redux';

import 'image-upload-react/dist/index.css';
import { uploadImg } from '../../actions/AnimalAction';

export default function UploadImgProfile({ animal }) {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = React.useState(false);

  const [img, setImg] = React.useState();

  const [formValues, setFormValues] = React.useState('');
  const { photo } = formValues;

  const handleInputChange = ({ target }) => {
    setImg(URL.createObjectURL(target.files[0]));
    setFormValues({
      ...formValues,
      photo: target.files[0]
    });
  };

  return (
    <>
      {animal && (
        <img
          onClick={() => setShowModal(true)}
          alt="Hacienda El Orosi"
          className="lg:w-1/2 w-full lg:h-96 h-64 sm:mt-14 object-cover border-4 object-center rounded"
          src={
            animal.photo_link ? animal.photo_link : 'https://alternos.la/image/not-available-es.png'
          }
        />
      )}

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-700 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 rounded-t">
                  <h3 className="text-3xl font-semibold">Foto de perfil</h3>
                  <button
                    className="p-1 ml-auto border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}

                <ImageUpload
                  name="photo"
                  handleImageSelect={handleInputChange}
                  imageSrc={img}
                  setImageSrc={setImg}
                  value={photo}
                  style={{
                    marginTop: 0,
                    width: '100%',
                    height: 315,
                    background: '#12B981',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                />

                <button
                  disabled={!img}
                  onClick={() => dispatch(uploadImg(photo, animal._id, 'foto-de-perfil'))}
                  className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-2 py-2 rounded shadow hover:bg-green-900 outline-none focus:outline-none mr-1 mb-1 mt-6"
                  type="submit"
                  style={{ transition: 'all .15s ease' }}
                >
                  Guardar
                </button>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="bg-gray-500 text-white active:bg-gray-600 font-semibold uppercase text-sm px-2 py-2 rounded shadow hover:bg-gray-800 outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: 'all .15s ease' }}
                    onClick={() => setShowModal(false)}
                  >
                    Regresar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

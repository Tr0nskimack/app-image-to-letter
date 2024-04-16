import React, { useState } from 'react'
import Tesseract from 'tesseract.js';
import { Toaster, toast } from 'sonner'

const App = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [text, setText] = useState("")
  const [image, setImage] = useState("")
  const [progress, setProgress] = useState(0)


  const allowedExtensions = ['jpg', 'jpeg', 'png'];

  const handleClick = () => {
    
      

      if (!image) {
        toast.error("Debe seleccionar un archivo de imagen")
        return
      }

      setIsLoading(true);
      Tesseract.recognize(image, 'eng', {
        logger: (m) => {
          console.log(m);
          if (m.status === 'recognizing text') {
            setProgress(parseInt(m.progress * 100));
          }
        },
      })
        .catch((err) => {
          console.error(err);
        })
        .then((result) => {
          console.log(result.data);
          setText(result.data.text);
          setIsLoading(false);
        });

   

  }

  return (
    <div className='bg-slate-50 min-h-screen flex justify-center items-center'>
      <Toaster richColors position='top-right' />

      <div className='border w-[480px] h-[500px] rounded-lg flex items-center justify-center bg-white shadow-sm'>

        <div className='flex flex-col space-y-5'>
          {!isLoading && <h1 className='text-center font-semibold text-2xl text-gray-700'>Image to Text</h1>}

          {!isLoading && !text && (
            <>
              {/* Form */}
              <div className='flex flex-col space-y-5'>
                <input type="file" name='hola' onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))} />
                <button onClick={handleClick} className='bg-indigo-500 rounded-md py-1 text-gray-50 font-semibold uppercase active:bg-indigo-700 transition-all duration-200'>Convertir</button>
              </div>
            </>
          )}


          {isLoading && <h1 className='text-center font-semibold text-2xl text-gray-700'>Convirtiendo... {progress}</h1>}

          {/* text area */}
          {
            !isLoading && text && (
              <textarea cols="55" rows="15" value={text} className='bg-yellow-50 outline-none' onChange={(e) => setText(e.target.value)}></textarea>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default App
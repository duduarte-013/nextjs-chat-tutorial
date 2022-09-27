import axios from "axios";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";



export default function Auth() {
  const [ name, setName ] = useState();
  const [ brand, setBrand ] = useState();
  const [ category, setCategory ] = useState();
  const [ description, setDescription ] = useState();
  const [showModal, setShowModal] = useState(false);
  const [info, setInfo] = useState("");
  const router = useRouter();

  async function onSubmit(e) { 
    e.preventDefault();
    
   
    const data = { 
      template_name: "product_description",
      prompt: {
        product_name: name, 
        brand: brand, 
        product_category: category, 
        product_features: description
      }, 
      temperature: 0.9, 
      word_count:500, 
      n_gen: 2, 
      source_language: "en", 
      api_key: "xxxxxxxx"
      
    }

    try{ 
      const r =  await axios.post("https://api.textcortex.com/hemingwai/generate_text_v2/", 
      data )
      console.log(r), 
      setInfo(r.data.generated_text[1].text),
            console.log(info), 
            setShowModal(true)
    } catch(error) {
      console.log(error);
    } 
            
  }


  return <div className="background p-24 absolute top-0 left-0">
    <div className="auth-container">
    <form className="auth-form" onSubmit={(e) => onSubmit(e)}>
        <div className="auth-title">Copy for generate description products</div>

        <div className='input-container'>
          <input 
            placeholder="Product Name"
            className="text-input"
            onChange={e => setName(e.target.value)}/>
        </div>
        <div className='input-container'>
          <input 
            placeholder="Brand"
            className="text-input"
            onChange={e => setBrand(e.target.value)}/>
        </div>
        <div className='input-container'>
          <input 
            placeholder="Category"
            className="text-input"
            onChange={e => setCategory(e.target.value)}/>
        </div>
        <div className='input-container'>
          <input 
            type="text"
            placeholder="Description"
            className="text-input"
            onChange={e => setDescription(e.target.value)}/>
        </div>
      <button
      type='submit'
      className="submit-button">
      Generate
      </button>
    </form>
  </div> 
  <div>
  {showModal ? (
        <>
          <div
            className="containerModal"
          >
            <div className="contentModal">
              {/*content*/}
              <div className="headerModal">
                {/*header*/}
                <div className="modal flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">

                  <button
                   
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="modalBody">
                  <p className="pModal">
                    Descrição: {info}
                  </p>
                </div>
                {/*footer*/}
                <div className="fotModal">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Voltar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      </div>
      </div>

}

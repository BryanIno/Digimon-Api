import {useState, useEffect } from "react"


const App = () => {
  const [digimon,setDigimon]=useState([]);
  const [pagina, setPagina]=useState(0);

  useEffect(()=>{
    consumirApi();
  },[pagina]);

  const siguientePagina= () => {setPagina(pagina + 1)};
  const anteriorPagina= () => { pagina===0 ?setPagina(pagina - 0 ): setPagina(pagina - 1 )};

  const consumirApi=async()=>{
    
   
    try{
      const respuesta= await fetch(`https://www.digi-api.com/api/v1/digimon?page=${pagina}`);

      if(respuesta.status===200){
        const datos= await respuesta.json();
        setDigimon(datos.content);
      }

    }catch(error){
      console.log(error);
    }
  }


  return (
    <div>
      <div className="tarjeta">
        {digimon.map((digimon,index)=>
          <>
            <h2 key={index}>{digimon.name}</h2>
            <img src={digimon.image} alt="" />
          </>
        )}
      </div>
      <div className="botones">
        <button onClick={anteriorPagina}>
          Anterior
        </button>
        <button onClick={siguientePagina}>
          Siguiente
        </button>
      </div>
      
      {pagina}
    </div>
  )
}

export default App
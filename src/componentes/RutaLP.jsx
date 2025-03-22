export const RutaLP = ({nombre, imagen, bgColor}) => {
  return (
    <div className="carta" style={{ backgroundColor: bgColor}}>

        <h2>{nombre}</h2>
        <img src={imagen} className='img-carta'></img>
    </div>
  )
}


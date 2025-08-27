
export default function ProduactCard(props){

  return(
    <dev>
      <h1>{props.name}</h1>
      <img src={props.image}></img>
      <p>Price {props.price}</p>
      <button>View More</button>
    </dev>

  )
}
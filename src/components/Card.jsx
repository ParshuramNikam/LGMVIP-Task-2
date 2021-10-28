function Card(props) {
    return (
      <div className="card">
        <img src={props.img} alt="Avatar" className="card__img" />
        <div className="card__body">
          <h2 className="card__title">{props.title}</h2>
          <button className="card__btn">{props.email}</button>
        </div>
      </div>
    );
  }
export default Card;   
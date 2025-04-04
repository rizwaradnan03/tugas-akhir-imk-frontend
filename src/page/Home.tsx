import React from 'react'

const Home = () => {
  return (

    <div>
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://img.freepik.com/free-vector/hand-drawn-person-playing-padel-illustration_23-2149208677.jpg?t=st=1743759340~exp=1743762940~hmac=c65e48305ca6eecf485f393a98127fa4ac3636b416935afd356074873b89a57e&w=1380" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://img.freepik.com/free-vector/hand-drawn-person-playing-padel-illustration_23-2149208677.jpg?t=st=1743759340~exp=1743762940~hmac=c65e48305ca6eecf485f393a98127fa4ac3636b416935afd356074873b89a57e&w=1380" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://img.freepik.com/free-vector/hand-drawn-person-playing-padel-illustration_23-2149208677.jpg?t=st=1743759340~exp=1743762940~hmac=c65e48305ca6eecf485f393a98127fa4ac3636b416935afd356074873b89a57e&w=1380" className="d-block w-100" alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <img src="..." className="object-fit-contain border rounded" alt="..." />
          <img src="https://img.freepik.com/premium-photo/basketball_172429-282.jpg?uid=R194703580&ga=GA1.1.1203588368.1739245046&semt=ais_hybrid&w=740" width={200} height={150} className="object-fit-cover border rounded" alt="Bola Basket" />
          <img src="..." className="object-fit-fill border rounded" alt="..." />
          <img src="..." className="object-fit-scale border rounded" alt="..." />
          <img src="..." className="object-fit-none border rounded" alt="..."></img>
          <img src="..." className="object-fit-contain border rounded" alt="..." />


    </div>
  )
}

export default Home
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const items = [
    {
      src: "https://img.freepik.com/premium-photo/basketball_172429-282.jpg?uid=R194703580&ga=GA1.1.1203588368.1739245046&semt=ais_hybrid&w=740",
      title: "Bola Basket",
      price: "Rp 120.000"
    },
    {
      src: "https://img.freepik.com/free-photo/view-football-shoes_23-2150885778.jpg?t=st=1744036502~exp=1744040102~hmac=33917e1382b2d6d08c7b019ad88e50a173927f19d7e66d55979f169ac03bbc2e&w=1380",
      title: "Sepatu Bola",
      price: "Rp 500.000"
    },
    {
      src: "https://img.freepik.com/free-vector/soccer-jersey-pattern-design_23-2150294673.jpg?t=st=1744036728~exp=1744040328~hmac=22a4dac1ec84c2ca93a4d18fe5947cbc6c50be4399d223ff23fac6242d6dc3e1&w=1380",
      title: "Jersey Bola",
      price: "Rp 800.000"
    },
    {
      src: "https://img.freepik.com/free-vector/handball-design_23-2147886950.jpg?t=st=1744036931~exp=1744040531~hmac=cfc94dc3f18bf9dffd1816ad3fbd445f58a22258e9c3f2dd6858f7fe27c33b64&w=900",
      title: "Bola Sepak",
      price: "Rp 100.000"
    },
    {
      src: "https://img.freepik.com/free-vector/male-female-swimwear-vector-illustrations-set-different-designs-bikinis-swimsuits-women-pants-underwear-men-swim-suits-beach-white-background-summer-fashion-concept_74855-26058.jpg?t=st=1744037218~exp=1744040818~hmac=6bbaf7706f140f81d2fb7089066c4cab2fa62a10b3f505b359fbbd9fe5ef9a53&w=1380",
      title: "Satu Set Baju Renang",
      price: "Rp 250.000"
    },
    {
      src: "https://img.freepik.com/free-vector/barbells-dumbbells-fitness-realistic-composition-with-isolated-image-dumbbell-with-heavy-load-vector-illustration_1284-66976.jpg?t=st=1744037327~exp=1744040927~hmac=042acdc258302b14c196f5dd2357f2c793098d37c6e77cb651b5e9a048198e0b&w=1380",
      title: "Baerbel",
      price: "Rp 500.000"
    },
    {
      src: "https://img.freepik.com/premium-vector/badminton-racquet-racket-with-shuttlecock-vector-illustration_575828-243.jpg?w=900",
      title: "satu set racket Samurai",
      price: "Rp 600.000"
    }
  ];

  const handleItemClick = (item) => {
    navigate('/checkout', { state: item });
  };

  return (
    <div>
      <div className="position-relative">
        {/* CAROUSEL */}
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://img.freepik.com/free-vector/hand-drawn-person-playing-padel-illustration_23-2149208677.jpg?t=st=1743759340~exp=1743762940~hmac=c65e48305ca6eecf485f393a98127fa4ac3636b416935afd356074873b89a57e&w=1380"
                className="d-block w-100"
                alt="..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* PRODUK */}
      <div className="mt-5 d-flex flex-row flex-wrap gap-4 justify-content-center">
        {items.map((item, index) => (
          <div
            key={index}
            className="text-center cursor-pointer"
            onClick={() => handleItemClick(item)}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={item.src}
              width={150}
              height={150}
              className="object-fit-cover border rounded"
              alt={item.title}
            />
            <div className="mt-2 fw-bold">{item.title}</div>
            <div className="text-success">{item.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

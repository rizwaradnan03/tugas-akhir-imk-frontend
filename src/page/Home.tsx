import { FetchFindFindManyProducts } from '@/api/product';
import { ProductInterface } from '@/interfaces/schema-interface';
import { formatPrice } from '@/lib/price';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Home = () => {
  const [items, setItems] = useState<ProductInterface[]>([]);

  const fetchData = async () => {
    try {
      const data = await FetchFindFindManyProducts();
      setItems(data);
    } catch (error: any) {
      toast.error(error.message ? error.message : "Gagal melakukan fetch product");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {/* CAROUSEL */}
      <div className="position-relative">
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://img.freepik.com/free-vector/hand-drawn-person-playing-padel-illustration_23-2149208677.jpg?t=st=1743759340~exp=1743762940~hmac=c65e48305ca6eecf485f393a98127fa4ac3636b416935afd356074873b89a57e&w=1380"
                className="d-block w-100"
                alt="Banner"
                style={{ maxHeight: '400px', objectFit: 'cover' }}
              />
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
                <h3 className="text-white">Selamat Datang di Toko Kami!</h3>
                <p className="text-white">Temukan berbagai produk menarik di sini.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUK */}
      <div className="container mt-5">
        <h4 className="mb-4 text-center">Produk Unggulan</h4>
        <div className="row justify-content-center">
          {items.map((item, index) => (
            <div className="col-6 col-sm-4 col-md-3 mb-4" key={index}>
              <Link to={`/checkout/${item.id}`} className="text-decoration-none text-dark">
                <div className="card h-100 shadow-sm hover-shadow-sm">
                  <img
                    src={item.image}
                    className="card-img-top object-fit-cover"
                    style={{ height: '150px', objectFit: 'cover' }}
                    alt={item.title}
                  />
                  <div className="card-body text-center">
                    <h6 className="card-title">{item.title}</h6>
                    <p className="card-text text-success fw-bold">{formatPrice({ price: item.price })}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

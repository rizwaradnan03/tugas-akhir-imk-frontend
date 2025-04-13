import { CreateCheckout } from '@/api/checkout';
import { FetchFindOneProduct } from '@/api/product';
import { ProductInterface } from '@/interfaces/schema-interface';
import { formatPrice } from '@/lib/price';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const Checkout = () => {
  const {id} = useParams()
  const [product, setProduct] = useState<ProductInterface | undefined>(undefined)
  const [email, setEmail] = useState<string | undefined>(undefined)
  const [alamat, setAlamat] = useState<string | undefined>(undefined)

  const navigate = useNavigate()

  const handlePayment = async () => {
    if(!email || !product || !alamat){
      toast.error("Email / Product harus diisi!")

      return
    }

    const createToken = await CreateCheckout({email: email, product_id: product.id, alamat: alamat})
    console.log("create tokenn", createToken)

    navigate(`/pay/${createToken.snap_token}`)
  };

  const fetchData = async () => {
    if(!id){
      return
    }
    try {
      const fetch = await FetchFindOneProduct({id: Number(id)})

      setProduct(fetch)
      console.log("fetzzz", fetch)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
      fetchData()
  }, [id])

  return (
    <div className="container mt-5">
      <h2>Checkout</h2>
      {product ? (
        <div className="row mt-4">
          <div className="col-md-4">
            <img src={product.image} alt={product.title} className="img-fluid rounded" />
          </div>
          <div className="col-md-8">
            <h4>{product.title}</h4>
            <p className="text-success fw-bold">{formatPrice({price: product.price})}</p>

            <hr />
            <h5>Metode Pembayaran</h5>

            <div className="mb-3">
              <label className="form-label">Email Pembeli</label>
              <input
                type="text"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Alamat Pembeli</label>
              <input
                type="text"
                className="form-control"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
              />
            </div>

            <button className="btn btn-primary" onClick={handlePayment}>
              Bayar Sekarang
            </button>
          </div>
        </div>
      ) : (
        <p>Produk tidak ditemukan.</p>
      )}
    </div>
  );
};

export default Checkout;

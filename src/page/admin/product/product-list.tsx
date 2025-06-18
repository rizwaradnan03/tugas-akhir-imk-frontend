import { FetchFindFindManyProducts } from '@/api/product';
import { ProductInterface } from '@/interfaces/schema-interface';
import { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const ProductList = () => {
  const navigate = useNavigate();
  const [produk, setProduk] = useState<ProductInterface[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetch = await FetchFindFindManyProducts()

        setProduk(fetch)
      } catch (error) {
        toast.error("Gagal Fetch product")
      }
    }

    fetchData()
  }, [])

  return (
    <div className="container mt-4">
      <h2>Daftar Produk</h2>
      <Button className="mb-3" onClick={() => navigate('/admin/product/create')}>
        + Tambah Produk
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nama Produk</th>
            <th>Harga</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {produk.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td>Rp{item.price.toLocaleString("id-ID")}</td>
              <td><Link to={`/admin/product/${item.id}`} className='btn btn-warning'>Edit</Link></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductList;

import { FetchFindFindManyCategory } from '@/api/category';
import { CategoryInterface } from '@/interfaces/schema-interface';
import { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CategoryList = () => {
  const navigate = useNavigate();
  const [kategori, setKategori] = useState<CategoryInterface[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetch = await FetchFindFindManyCategory()

        setKategori(fetch)
      } catch (error) {
        toast.error("Gagal Fetch kategori")
      }
    }

    fetchData()
  }, [])

  return (
    <div className="container mt-4">
      <h2>Daftar Kategori</h2>
      <Button className="mb-3" onClick={() => navigate('/admin/category/create')}>
        + Tambah Kategori
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nama Kategori</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {kategori.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td><a href={`/admin/category/${item.id}`} className='btn btn-warning'>Edit</a></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CategoryList;

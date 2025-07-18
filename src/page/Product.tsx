import { useState, useEffect } from 'react'
import axios from 'axios'
import { ProductInterface } from '@/interfaces/schema-interface';

const Product = () => {
  const [data, setData] = useState<ProductInterface[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://f775-66-96-225-158.ngrok-free.app/api/product", {
          headers: { "ngrok-skip-browser-warning": "true" },
        });
        console.log("Data dari Server:", response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>
        <h2>Daftar Kategori</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ID</th>
              <th scope="col">Title</th>
              <th scope="col">CreatedAt</th>
              <th scope="col">UpdatedAt</th>
              <th scope="col">image</th>
              <th scope="col">price</th>
              <th scope="col">categoryId</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={item.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{new Date(item.created_at).toLocaleString()}</td>
                  <td>{new Date(item.updated_at).toLocaleString()}</td>
                  <td>{item.image}</td>
                  <td>{item.price}</td>
                  <td>{item.category_id}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center">

                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Product
import { useEffect, useState } from "react";
import axios from "axios";

const Category = () => {
  const [data, setData] = useState<{ id: string; title: string; createdAt: Date; updatedAt: Date }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://1f30-66-96-225-79.ngrok-free.app/api/category", {
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
      <h2>Daftar Kategori</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">ID</th>
            <th scope="col">Title</th>
            <th scope="col">Created At</th>
            <th scope="col">Updated At</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{new Date(item.createdAt).toLocaleString()}</td>
                <td>{new Date(item.updatedAt).toLocaleString()}</td>
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
  );
};

export default Category;

import { FetchFindOneCategory, UpdateCategory } from "@/api/category";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export const CategoryEdit = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [nama, setNama] = useState("");

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const fetch = await FetchFindOneCategory({ id: Number(id) });

          setNama(fetch.title);
        } catch (error) {
          toast.error("Gagal fetch produk");
        }
      };

      fetchData();
    }
  }, [id]);

  const handleSubmit = async () => {
    try {
      await UpdateCategory({id: Number(id), data: {title: nama}})

      navigate(`/admin/category`)
    } catch (error) {
      toast.error("Gagal")
    }
  };

  return (
    <div className="container mt-4">
      <h2>Ubah Kategori</h2>
      <div className="row">
        <Form.Group className="col-12 mb-3">
          <Form.Label>Nama Kategori</Form.Label>
          <Form.Control
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
            placeholder="Nama Nama Kategori"
          />
        </Form.Group>
      </div>
      <Button variant="primary" onClick={() => handleSubmit()}>
        Simpan
      </Button>{" "}
      <Button variant="secondary" onClick={() => navigate("/admin/kategori")}>
        Batal
      </Button>
    </div>
  );
};

import { CreateCategory } from "@/api/category";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CategoryCreate = () => {
  const navigate = useNavigate();

  const [nama, setNama] = useState("");

  const handleSubmit = async () => {

    await CreateCategory({data: {title: nama}})

    navigate("/admin/category");
  };

  return (
    <div className="container mt-4">
      <h2>Tambah Kategori Baru</h2>
      <div className="row">
        <Form.Group className="col-12 mb-3">
          <Form.Label>Nama Kategori</Form.Label>
          <Form.Control
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
            placeholder="Nama Kategori"
          />
        </Form.Group>
      </div>
      <Button variant="primary" onClick={() => handleSubmit()}>
        Simpan
      </Button>{" "}
      <Button variant="secondary" onClick={() => navigate("/admin/category")}>
        Batal
      </Button>
    </div>
  );
};

export default CategoryCreate;

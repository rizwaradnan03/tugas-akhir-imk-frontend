import { FetchFindFindManyCategory } from "@/api/category";
import { CreateProduct } from "@/api/product";
import { CategoryInterface } from "@/interfaces/schema-interface";
import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ProductCreate = () => {
  const navigate = useNavigate();

  const [nama, setNama] = useState("");
  const [image, setImage] = useState("");
  const [stock, setStock] = useState("");
  const [harga, setHarga] = useState("");
  const [kategoriId, setKategoriId] = useState("");

  const [categories, setCategories] = useState<CategoryInterface[]>([]);

  const handleSubmit = async () => {

    await CreateProduct({data: {title: nama, image: image, stock: Number(stock), price: Number(harga), category_id: Number(kategoriId)}})

    toast.success("Berhasil membuat produk!")
    navigate("/admin/product");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetch = await FetchFindFindManyCategory();
        setCategories(fetch);
      } catch (error) {
        toast.error("Gagal melakukan fetch category");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Tambah Produk Baru</h2>
      <div className="row">
        <Form.Group className="col-4 mb-3">
          <Form.Label>Nama Produk</Form.Label>
          <Form.Control
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
            placeholder="Nama Produk"
          />
        </Form.Group>

        <Form.Group className="col-4 mb-3">
          <Form.Label>Link Gambar</Form.Label>
          <Form.Control
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            placeholder="Gambar Produk"
          />
        </Form.Group>

        <Form.Group className="col-4 mb-3">
          <Form.Label>Kategori</Form.Label>
          <Form.Select
            value={kategoriId}
            onChange={(e) => setKategoriId(e.target.value)}
            required
          >
            <option value="">-- Pilih Kategori --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.title}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </div>
      <Form.Group className="mb-3">
        <Form.Label>Stok</Form.Label>
        <Form.Control
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required

          placeholder="Stok Produk"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Harga</Form.Label>
        <Form.Control
          type="number"
          value={harga}
          onChange={(e) => setHarga(e.target.value)}
          required

          placeholder="Harga Produk"
        />
      </Form.Group>
      <Button variant="primary" onClick={() => handleSubmit()}>
        Simpan
      </Button>{" "}
      <Button variant="secondary" onClick={() => navigate("/admin/product")}>
        Batal
      </Button>
    </div>
  );
};

export default ProductCreate;

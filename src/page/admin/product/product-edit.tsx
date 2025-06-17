import { FetchFindFindManyCategory } from "@/api/category";
import { FetchFindOneProduct, UpdateProduct } from "@/api/product";
import { CategoryInterface } from "@/interfaces/schema-interface";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export const ProductEdit = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [nama, setNama] = useState("");
  const [image, setImage] = useState("");
  const [stock, setStock] = useState("");
  const [harga, setHarga] = useState("");
  const [kategoriId, setKategoriId] = useState("");

  const [categories, setCategories] = useState<CategoryInterface[]>([]);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const fetch = await FetchFindOneProduct({ id: Number(id) });

          setNama(fetch.title);
          setImage(fetch.image);
          setStock(fetch.stock);
          setHarga(fetch.price);
          setKategoriId(fetch.category_id);
        } catch (error) {
          toast.error("Gagal fetch produk");
        }
      };

      fetchData();
    }

    const fetchCategory = async () => {
      try {
        const data = await FetchFindFindManyCategory()

        setCategories(data)
      } catch (error) {
        toast.error("Gagal fetch category");
      }
    };

    fetchCategory();
  }, [id]);

  const handleSubmit = async () => {
    try {
      await UpdateProduct({id: Number(id), data: {title: nama, image: image, stock: Number(stock), price: Number(harga), category_id: Number(kategoriId)}})

      navigate(`/admin/product`)
    } catch (error) {
      toast.error("Gagal mengubah produk")
    }
  };

  return (
    <div className="container mt-4">
      <h2>Ubah Produk</h2>
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

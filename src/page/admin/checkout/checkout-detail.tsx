import { FetchFindOneUserPayment } from "@/api/user-payment";
import { UserPaymentInterface } from "@/interfaces/schema-interface";
import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const CheckoutDetail = () => {
  const [userPayment, setUserPayment] = useState<UserPaymentInterface | null>(null);
  const { id } = useParams();

  const navigate = useNavigate()

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await FetchFindOneUserPayment({id: Number(id)});
        setUserPayment(data);
      } catch (err) {
        console.error("Gagal fetch userPayment:", err);
      }
    };

    fetchOrder();
  }, [id]);


  if (!userPayment) return <p>Order tidak ditemukan.</p>;

  return (
    <div className="container mt-4">
      <h4>Detail Pembelian</h4>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Order Id</Form.Label>
          <Form.Control type="text" value={userPayment.order_id} disabled />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Jumlah</Form.Label>
          <Form.Control type="number" value={1} disabled />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Total</Form.Label>
          <Form.Control
            type="text"
            value={`Rp ${userPayment.amount.toLocaleString()}`}
            disabled
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Status Pembayaran</Form.Label>
          <Form.Control type="text" value={userPayment.status} disabled />
        </Form.Group>

        <Button variant="secondary" onClick={() => navigate("/admin/checkout")}>
          Kembali
        </Button>
      </Form>
    </div>
  );
};

export default CheckoutDetail;

import { FetchFindFindManyUserPayment } from '@/api/user-payment';
import { UserPaymentInterface } from '@/interfaces/schema-interface';
import { useEffect, useState } from 'react';
import { Table,  } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Checkout = () => {
 const [userPayments,setUserPayments] = useState<UserPaymentInterface[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetch = await FetchFindFindManyUserPayment()

        setUserPayments(fetch)
      } catch (error) {
        toast.error("Gagal Fetch kategori")
      }
    }

    fetchData()
  }, [])

  return (
    <div className="container mt-4">
      <h2>Daftar Pembelian</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Order Id</th>
            <th>Email</th>
            <th>Alamat</th>
            <th>Nominal</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {userPayments.map((userPayment, index) => (
            <tr key={userPayment.id}>
              <td>{index + 1}</td>
              <td>{userPayment.order_id}</td>
              <td>{userPayment.email}</td>
              <td>{userPayment.alamat}</td>
              <td>{userPayment.amount}</td>
              <td>
                <Link to={`/admin/checkout/detail/${userPayment.id}`} className='btn btn-success'>Lihat</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Checkout;

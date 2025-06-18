import { FetchFindManyUser } from '@/api/user';
import { UserInterface } from '@/interfaces/schema-interface';
import { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AccountList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserInterface[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetch = await FetchFindManyUser()

        setUsers(fetch)
      } catch (error) {
        toast.error("Gagal Fetch users")
      }
    }

    fetchData()
  }, [])

  return (
    <div className="container mt-4">
      <h2>Daftar Akun Admin</h2>
      <Button className="mb-3" onClick={() => navigate('/admin/account/register')}>
        + Tambah Admin
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AccountList;

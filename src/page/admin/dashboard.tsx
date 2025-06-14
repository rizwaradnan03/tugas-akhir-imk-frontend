import { Statistic } from "@/api/statistic"
import { ProductInterface } from "@/interfaces/schema-interface"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export const AdminDashboard = () => {
    const [payedAmount, setPayedAmount] = useState<number>(0)
    const [products, setProducts] = useState<ProductInterface[]>([])    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetch = await Statistic()

                setPayedAmount(fetch.amount)
                setProducts(fetch.products)
            } catch (error) {
                toast.error("Gagal fetch statistik")
            }
        }

        fetchData()
    }, [])

    console.log("Payed Amount : ", )

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Admin Dashboard</h2>
      <div className="row g-3">
        <div className="col-md-4">
          <div className="card text-white bg-primary shadow">
            <div className="card-body">
              <h5 className="card-title">Pembelian Hari Ini</h5>
              <p className="card-text fs-4">Rp{payedAmount}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-success shadow">
            <div className="card-body">
              <h5 className="card-title">Jumlah Produk</h5>
              {/* <p className="card-text fs-4">{data.jumlah_produk}</p> */}
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-warning shadow">
            <div className="card-body">
              <h5 className="card-title">Jumlah Kategori</h5>
              {/* <p className="card-text fs-4">{data.jumlah_kategori}</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
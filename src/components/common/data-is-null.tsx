import { AEmptyData } from "@/lib/assets"

const DataIsNull = () => {
  return (
    <div className='flex justify-center items-center min-h-screen'>
        <img src={AEmptyData} width={400} alt="Data Tidak Ditemukan" />
    </div>
  )
}

export default DataIsNull
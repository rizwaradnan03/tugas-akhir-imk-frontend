import { Helmet } from 'react-helmet-async'
import CompanyIcon from "@/assets/images/icon/company.png";

const Header = ({ title }: { title: string }) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title} | {import.meta.env.VITE_APP_NAME}</title>
      <meta
        name="description"
        content="Selamat datang di Soekarno Run, acara lari yang menginspirasi semangat perjuangan bangsa."
      />
      <meta
        name="keywords"
        content="Soekarno Run, lari, olahraga, event, Indonesia, sejarah"
      />
      <meta name="author" content="Soekarno Run Team" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content={`${title}| Soekarno Run`} />
      <meta
        property="og:description"
        content="Selamat datang di Soekarno Run, acara lari yang menginspirasi semangat perjuangan bangsa."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.soekarnorun.com/" />
      <meta
        property="og:image"
        content="https://www.soekarnorun.com/images/thumbnail.jpg"
      />
      <link rel="canonical" href="https://www.soekarnorun.com/" />
      <link rel="icon" href={CompanyIcon} />
    </Helmet>
  )
}

export default Header
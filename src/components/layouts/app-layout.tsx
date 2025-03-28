import { HelmetProvider } from "react-helmet-async"
import Header from '../Header'
import { TReactNode } from "@/types/htmlType"

const AppLayout = ({children, title}: {children: TReactNode, title: string}) => {
  return (
    <HelmetProvider>
      <Header title={title} />
      {children}
    </HelmetProvider>
  )
}

export default AppLayout
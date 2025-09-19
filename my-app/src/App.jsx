import { useState } from 'react'
import Products from './components/product_list'
import CreateProduct from './components/create_product'

function App() {
  const [reload, setReload] = useState(false);

  const handleReload = () => {
    setReload(!reload);
  }

  return (
    <>
      <CreateProduct onReload={handleReload}/>
      <Products reload={reload}/>
    </>
  )
}

export default App

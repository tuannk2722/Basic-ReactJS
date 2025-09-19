import { useEffect, useState } from "react";
import './style.scss'
import EditProduct from "../edit_product";
import DeleteProduct from "../delete_product";

function Products(props) {
    const { reload } = props;
    const [data, setData] = useState([]);
    const [editReload, setEditReload] = useState(false);

    const handleReload = () => {
        setEditReload(!editReload);
    }

    useEffect(() => {
        fetch('http://localhost:3001/products')
            .then(res => res.json())
            .then(data => {
                setData(data.reverse());
            })
    }, [reload, editReload])

    return (
        <>
            <div className="product container-fluid">
                <div className="row">
                    {data.map(item => (
                        <div key={item.id} className="product__item col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12">
                            <div className="product__item-img">
                                <img src={item.thumbnail} alt={item.title} />
                            </div>
                            <div className="product__item-content">
                                <div className="product__title">{item.title}</div>
                                <div className="product__price">{item.price}</div>
                                <div className="product__discount">{item.discountPercentage}</div>
                            </div>
                            <div className="product__btns">
                                <EditProduct item={item} onReload={handleReload}/>
                                <DeleteProduct item={item} onReload={handleReload}/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default Products;
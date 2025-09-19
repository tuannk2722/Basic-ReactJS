import { useEffect, useState } from "react";
import '../create_product/style.scss';
import { MdClose } from "react-icons/md";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

function EditProduct(props) {
    const { item, onReload } = props;
    const [modal, setModal] = useState(false);
    const [dataCategory, setDataCategory] = useState([]);
    const [dataInput, setDataInput] = useState(item);

    useEffect(() => {
        fetch('http://localhost:3001/categories')
            .then(res => res.json())
            .then(data => {
                setDataCategory(data);
            })
    })

    const handleModal = () => {
        setModal(!modal);
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setDataInput({
            ...dataInput,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3001/products/${item.id}`, {
            method: "PATCH",
            headers:{
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataInput)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setModal(!modal);
                    onReload();
                    Swal.fire({
                        title: "Drag me!",
                        icon: "success",
                        draggable: true
                    });
                }
            })
    }

    return (
        <>
            <button onClick={handleModal}>Edit</button>
            {modal && (
                <div className="modal" onClick={handleModal}>
                    <form className="frame" onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Title</td>
                                    <td>
                                        <input name="title" value={dataInput.title} onChange={handleChange} required/>
                                    </td>
                                </tr>
                                {dataCategory.length > 0 && (
                                    <tr>
                                        <td>Category</td>
                                        <td>
                                            <select name="category" onChange={handleChange}>
                                                <option>{dataInput.category}</option>
                                                {dataCategory.map((item, index) => (
                                                    <option key={index}>{item}</option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                )}
                                <tr>
                                    <td>Price</td>
                                    <td>
                                        <input name="price" value={dataInput.price} onChange={handleChange} required/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Discount Percentage</td>
                                    <td>
                                        <input name="discountPercentage"value={dataInput.discountPercentage} onChange={handleChange} required/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Stock</td>
                                    <td>
                                        <input name="stock" value={dataInput.stock} onChange={handleChange} required/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Thumbnail</td>
                                    <td>
                                        <input name="thumbnail" value={dataInput.thumbnail} onChange={handleChange} required/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Description</td>
                                    <td>
                                        <textarea rows={4} name="description" value={dataInput.description} onChange={handleChange} required></textarea>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="frame__btn">
                            <div className="frame__btn-close" onClick={handleModal}>
                                <MdClose />
                            </div>
                            <input type="submit" value="Create"/>
                        </div>
                    </form>
                </div>
            )}
        </>
    )
}
export default EditProduct;
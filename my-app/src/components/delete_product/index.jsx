import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { getDeleteProduct } from '../../services/productList';

function DeleteProduct(props) {
    const { item, onReload } = props;

    const deleteItem = async () => {
        const result = await getDeleteProduct(item.id);
        return result;
    }

    const  handleClick = () => {
        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
            }).then((result) => {
            if (result.isConfirmed) {
                deleteItem();
                onReload();
                Swal.fire("Saved!", "", "success");
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    }

    return (
        <>
            <button onClick={handleClick}>Delete</button>
        </>
    )
}
export default DeleteProduct;
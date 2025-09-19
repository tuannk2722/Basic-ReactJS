import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

function DeleteProduct(props) {
    const { item, onReload } = props;

    const  handleClick = () => {
        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
            }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3001/products/${item.id}`, { method: "DELETE" })
                .then(res => res.json())
                .then(data => {
                    onReload();
                })
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
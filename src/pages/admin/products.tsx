// import { useState } from 'react';
// import axios from 'axios';
// import { useAppDispatch } from '../../store';

// import Modal from '../../components/Modal';

// const AdminProducts = () => {
//     const [products, setProducts] = useState([]);
//     const [modalOpen, setModalOpen] = useState(false);
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const [formData, setFormData] = useState({ name: '', price: 0, description: '' });
//     const dispatch = useAppDispatch();

//     const fetchProducts = async () => {
//         const { data } = await axios.get('/api/products');
//         setProducts(data);
//     };

//     const handleCreateProduct = async () => {
//         await axios.post('/api/products', formData);
//         setModalOpen(false);
//         fetchProducts();
//     };

//     const handleUpdateProduct = async () => {
//         await axios.put(`/api/products/${selectedProduct._id}`, formData);
//         setModalOpen(false);
//         fetchProducts();
//     };

//     const handleDeleteProduct = async (id: string) => {
//         await axios.delete(`/api/products/${id}`);
//         fetchProducts();
//     };

//     return (
//         <div className="max-w-2xl mx-auto p-4">
//             <h1 className="text-2xl mb-4">Admin Products</h1>
//             <button onClick={() => setModalOpen(true)} className="bg-blue-500 text-white p-2 rounded mb-4">Add Product</button>
//             <table className="w-full border">
//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>Price</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {products.map(product => (
//                         <tr key={product._id}>
//                             <td>{product.name}</td>
//                             <td>${product.price}</td>
//                             <td>
//                                 <button onClick={() => { setSelectedProduct(product); setModalOpen(true); }} className="bg-yellow-500 text-white p-1 rounded">Edit</button>
//                                 <button onClick={() => handleDeleteProduct(product._id)} className="bg-red-500 text-white p-1 rounded ml-2">Delete</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//             <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
//                 <h2 className="text-xl mb-4">{selectedProduct ? 'Edit Product' : 'Add Product'}</h2>
//                 <input
//                     type="text"
//                     value={formData.name}
//                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                     placeholder="Name"
//                     className="border p-2 mb-2 w-full"
//                 />
//                 <input
//                     type="number"
//                     value={formData.price}
//                     onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
//                     placeholder="Price"
//                     className="border p-2 mb-2 w-full"
//                 />
//                 <textarea
//                     value={formData.description}
//                     onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                     placeholder="Description"
//                     className="border p-2 mb-4 w-full"
//                 />
//                 <button onClick={selectedProduct ? handleUpdateProduct : handleCreateProduct} className="bg-blue-500 text-white p-2 rounded">
//                     {selectedProduct ? 'Update Product' : 'Create Product'}
//                 </button>
//             </Modal>
//         </div>
//     );
// };

// export default AdminProducts;

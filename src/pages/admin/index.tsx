import Link from 'next/link';

const AdminDashboard = () => {
    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl mb-4">Admin Dashboard</h1>
            <ul>
                <li>
                    <Link href="/admin/products">
                        <a className="bg-blue-500 text-white p-2 rounded">Manage Products</a>
                    </Link>
                </li>
                {/* Add other admin links here */}
            </ul>
        </div>
    );
};

export default AdminDashboard;

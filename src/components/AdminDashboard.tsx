import { useState } from 'react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="flex space-x-4 mb-4">
        <button onClick={() => setActiveTab('users')} className={`px-4 py-2 rounded ${activeTab === 'users' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
          Users
        </button>
        <button onClick={() => setActiveTab('products')} className={`px-4 py-2 rounded ${activeTab === 'products' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
          Products
        </button>
        <button onClick={() => setActiveTab('orders')} className={`px-4 py-2 rounded ${activeTab === 'orders' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
          Orders
        </button>
      </div>
      {activeTab === 'users' && <div>Users content</div>}
      {activeTab === 'products' && <div>Products content</div>}
      {activeTab === 'orders' && <div>Orders content</div>}
    </div>
  );
};

export default AdminDashboard;

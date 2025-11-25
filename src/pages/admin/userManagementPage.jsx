import { useState } from 'react';
import { FaSearch, FaCheckCircle } from 'react-icons/fa';

export default function UserManagementPage() {
  const initialUsers = [
    { id: 1, name: "Sarah Johnson", email: "sarah@example.com", joinDate: "Oct 01, 2024", isEmailVerified: true, verified: true, orders: 12, isBlocked: false },
    { id: 2, name: "Emma Wilson", email: "emma@example.com", joinDate: "Sep 15, 2024", isEmailVerified: true, verified: true, orders: 8, isBlocked: false },
    { id: 3, name: "Lisa Anderson", email: "lisa@example.com", joinDate: "Sep 20, 2024", isEmailVerified: false, verified: false, orders: 5, isBlocked: false },
    { id: 4, name: "Jennifer Lee", email: "jennifer@example.com", joinDate: "Aug 10, 2024", isEmailVerified: true, verified: true, orders: 3, isBlocked: true },
    { id: 5, name: "Maria Garcia", email: "maria@example.com", joinDate: "Jul 25, 2024", isEmailVerified: true, verified: true, orders: 15, isBlocked: false },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleBlockToggle = (userId) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, isBlocked: !user.isBlocked } : user
    ));
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                          (filterStatus === 'active' && user.status === 'Active') ||
                          (filterStatus === 'inactive' && user.status === 'Inactive') ||
                          (filterStatus === 'blocked' && user.isBlocked);
    return matchesSearch && matchesFilter;
  });

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'Active').length;
  const blockedUsers = users.filter(u => u.isBlocked).length;

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
        <p className="text-gray-600 mt-1">Manage and monitor all user accounts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white flex items-center p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="relative w-full">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent" size={20} />
            <input 
              className="w-full pl-10 pr-4 py-2 border border-accent rounded-lg placeholder:text-accent focus:outline-none focus:ring-2 focus:ring-accent-hover"
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="text-sm text-gray-600 mb-1">Total Users</div>
            <div className="text-2xl font-bold text-blue-600">{totalUsers}</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="text-sm text-gray-600 mb-1">Active</div>
            <div className="text-2xl font-bold text-green-600">{activeUsers}</div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <div className="text-sm text-gray-600 mb-1">Blocked</div>
            <div className="text-2xl font-bold text-red-600">{blockedUsers}</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4 p-4">
        <div className="flex gap-2">
          <button 
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-lg ${filterStatus === 'all' ? 'bg-accent text-white' : 'bg-gray-100 text-gray-700'}`}>
            All Users
          </button>
          <button 
            onClick={() => setFilterStatus('active')}
            className={`px-4 py-2 rounded-lg ${filterStatus === 'active' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700'}`}>
            Active
          </button>
          <button 
            onClick={() => setFilterStatus('inactive')}
            className={`px-4 py-2 rounded-lg ${filterStatus === 'inactive' ? 'bg-gray-500 text-white' : 'bg-gray-100 text-gray-700'}`}>
            Inactive
          </button>
          <button 
            onClick={() => setFilterStatus('blocked')}
            className={`px-4 py-2 rounded-lg ${filterStatus === 'blocked' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'}`}>
            Blocked
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">User</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Join Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Verification</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Orders</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>  
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="font-medium text-gray-900">{user.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{user.email}</td>
                  <td className="px-6 py-4 text-gray-600">{user.joinDate}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full gap-1 ${
                      user.isEmailVerified ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.isEmailVerified ? <><FaCheckCircle /> Verified</> : 'Unverified'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{user.orders}</td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => handleBlockToggle(user.id)}
                      className={`px-4 py-1 rounded-lg text-sm font-medium ${
                        user.isBlocked 
                          ? 'bg-green-500 text-white hover:bg-green-600' 
                          : 'bg-red-500 text-white hover:bg-red-600'
                      }`}>
                      {user.isBlocked ? 'Unblock' : 'Block'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredUsers.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No users found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
}
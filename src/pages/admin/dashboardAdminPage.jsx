import { MdOutlineAttachMoney } from "react-icons/md";
import Card from "../../components/Card";
import { TiShoppingCart } from "react-icons/ti";
import { FaUserFriends } from "react-icons/fa";
import { SiDropbox } from "react-icons/si";
import { AreaChart,BarChart, Bar, Rectangle, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import TitleHeaderDashboard from "../../components/TitleHeader";

export const SALES_DATA = [
  { name: 'Mon', revenue: 4000, orders: 24 },
  { name: 'Tue', revenue: 3000, orders: 18 },
  { name: 'Wed', revenue: 2000, orders: 12 },
  { name: 'Thu', revenue: 2780, orders: 20 },
  { name: 'Fri', revenue: 1890, orders: 15 },
  { name: 'Sat', revenue: 2390, orders: 22 },
  { name: 'Sun', revenue: 3490, orders: 30 },
];

const userData = [
  { month: "Jan", users: 25 },
  { month: "Feb", users: 40 },
  { month: "Mar", users: 18 },
  { month: "Apr", users: 30 },
  { month: "May", users: 22 },
  { month: "Jun", users: 41 },
  { month: "Jul", users: 55 },
  { month: "Aug", users: 33 },
  { month: "Sep", users: 27 },
  { month: "Oct", users: 15 },
  { month: "Nov", users: 12 },
  { month: "Dec", users: 20 },
];

export default function DashboardAdminPage() {
  return (
    <div className="w-full h-full">
      
      <TitleHeaderDashboard title="Dashboard Overview" subtitle="Welcome back to Faye Beauty Admin." />

      <div className="grid grid-cols-4 gap-2 w-full mb-6">
        <Card title="Total Revenue" amount="$0.00" percentage="12.5%" icon={<MdOutlineAttachMoney size={20} />} />
        <Card title="Total Orders" amount="$0.00" percentage="12.5%" icon={<TiShoppingCart size={20} />} />
        <Card title="Active Users" amount="$0.00" percentage="12.5%" icon={<FaUserFriends size={20} />} />
        <Card title="Total Products" amount="$0.00" percentage="12.5%" icon={<SiDropbox size={20} />} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className=" bg-white rounded-2xl py-5 pr-5">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={SALES_DATA}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#c28d59" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#c28d59" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} tickFormatter={(val) => `$${val}`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#2C2C2C', borderRadius: '8px', border: 'none', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#c28d59" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-2xl p-5">
          <BarChart
            style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
            responsive
            data={userData}
            margin={{
              top: 5,
              right: 0,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis width="auto" />
            <Tooltip />
            <Legend />
            <Bar dataKey="users" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          </BarChart>
        </div>
      </div>
      
    </div>
    
  ) 
}
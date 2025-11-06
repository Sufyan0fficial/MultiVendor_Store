import React from 'react'
import ProfileUpdate from './ProfileUpdate'
import ProfileTable from './Table.jsx'
import Logout from './Logout.jsx'
import Addresses from './Addresses.jsx';

function ProfilePageWrapper({activeMenu, setActiveMenu}) {
    const headers = [
        { key: "_id", name: "Order ID" },
        { key: "status", name: "Status" },
        { key: "Qty", name: "Item Qty" },
        { key: "total", name: "Total" },
    ];

    const orders = [
        { _id: "ORD-1001", status: "Reviewed", Qty: 3, total: 2450 },
        { _id: "ORD-1002", status: "Processing", Qty: 3, total: 2450 },
        { _id: "ORD-1003", status: "Delivered", Qty: 5, total: 2450 },
        { _id: "ORD-1004", status: "Processing", Qty: 3, total: 2450 },
        { _id: "ORD-1005", status: "Pending", Qty: 2, total: 2450 },
        { _id: "ORD-1006", status: "Processing", Qty: 3, total: 2450 },
        { _id: "ORD-1007", status: "Processing", Qty: 1, total: 2450 },
        { _id: "ORD-1008", status: "Pending", Qty: 3, total: 2450 },
        { _id: "ORD-1009", status: "Completed", Qty: 6, total: 2450 },
        { _id: "ORD-1010", status: "Delivering", Qty: 3, total: 2450 },
    ];
  return (
    <div className='flex-grow border border-gray-200 px-3 md:px-6 rounded-xl overflow-x-auto overflow-y-auto'>
        {
            activeMenu === 1 &&
        <ProfileUpdate />
        }
        {
            activeMenu === 2 &&
        <ProfileTable headers={headers} data={orders} className={'min-w-[800px]'}/>
        }
        {
            activeMenu === 3 &&
        <ProfileTable headers={headers} data={orders} className={'min-w-[800px]'}/>
        }
        {
            activeMenu === 5 &&
        <ProfileTable headers={headers} data={orders} className={'min-w-[800px]'}/>
        }
        {
            activeMenu === 8 &&
        <Logout setActiveMenu={setActiveMenu}/>
        }
        {
            activeMenu === 7 &&
        <Addresses />
        }
        
    </div>
  )
}

export default ProfilePageWrapper
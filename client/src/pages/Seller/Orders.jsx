import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { assets, dummyOrders } from '../../assets/assets'  // changed dummyAddress to dummyOrders

const Orders = () => {

  const { currency } = useAppContext()
  const [orders, setOrders] = useState([])

  const fetchOrders = async () => {
    setOrders(dummyOrders)  // set orders to dummyOrders, not dummyAddress
  }

  useEffect(() => {
    fetchOrders();
  }, [])

  return (
    <div className='flex-1 h-[95vh] overflow-y-scroll'>
      <div className="md:p-10 p-4 space-y-4">
        <h2 className="text-lg font-medium">Orders List</h2>
        {orders.map((order, index) => (
          <div
            key={index}
            className="flex flex-col md:items-center md:flex-row gap-5 justify-center p-5 max-w-4xl rounded-md border border-gray-300 text-gray-800"
          >
            <div className="flex gap-5 max-w-80">
              <img
                className="w-12 h-12 object-cover"
                src={assets.box_icon}
                alt="boxIcon"
              />
              <div>
                {order.items?.map((item, idx) => (
                  <div key={idx} className="flex flex-col">
                    <p className="font-medium">
                      {item?.product?.name} <span className="text-primary">× {item?.quantity}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-sm md:text-base text-black/60">
              <p className='font-medium mb-1'>{order.address?.firstName} {order.address?.lastName}</p>
              <p>{order.address?.street}, {order.address?.city}</p>
              <p>{order.address?.state}, {order.address?.zipcode}, {order.address?.country}</p>
            </div>

            <p className="font-medium text-base my-auto text-black/70">{currency}{order.amount}</p>

            <div className="flex flex-col text-sm md:text-base text-black/60">
              <p>Method: {order.paymentType}</p>
              <p>Date: {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}</p>
              <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders

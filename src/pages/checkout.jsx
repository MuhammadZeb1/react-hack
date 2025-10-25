import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../features/cart/cartSlice'
import { User, Mail, Home as HomeIcon, Phone, ShoppingCart } from 'lucide-react'
import { motion } from 'framer-motion'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Checkout() {
  const items = useSelector((state) => state.cart.items)
  const dispatch = useDispatch()

  const [form, setForm] = useState({ name: '', email: '', address: '', phone: '' })
  const [submitting, setSubmitting] = useState(false)

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (items.length === 0) {
      toast.error("🛒 Cart is empty!")
      return
    }

    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      toast.success("✅ Order placed successfully!")
      dispatch(clearCart())
      setForm({ name: '', email: '', address: '', phone: '' })
    }, 800)
  }

  return (
    <div className="max-w-2xl mx-auto px-3 py-6 space-y-6">
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold text-gray-800 text-center"
      >
        Checkout
      </motion.h2>

      {/* Order Summary */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-4 rounded-lg shadow-md space-y-3"
      >
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <ShoppingCart size={18} /> Order Summary
        </h3>

        {items.length === 0 ? (
          <div className="text-gray-500 text-sm">No items in cart.</div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="space-y-2"
          >
            {items.map((i) => (
              <motion.div
                key={i.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="flex justify-between items-center text-sm border-b pb-1"
              >
                <div className="truncate w-36">{i.title}</div>
                <div className="flex gap-1">
                  <span className="font-semibold">${i.price.toFixed(2)}</span>
                  <span className="text-gray-500">×{i.qty}</span>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-2 border-t text-right font-bold text-md"
            >
              Total: ${total.toFixed(2)}
            </motion.div>
          </motion.div>
        )}
      </motion.div>

      {/* Checkout Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white p-4 rounded-lg shadow-md space-y-3"
      >
        {/** Input fields with animation **/}
        {[{name:"name", icon:User, placeholder:"Full Name"},
          {name:"email", icon:Mail, placeholder:"Email Address", type:"email"},
          {name:"address", icon:HomeIcon, placeholder:"Address"},
          {name:"phone", icon:Phone, placeholder:"Phone Number"}].map((field, idx) => (
          <motion.div
            key={field.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * idx }}
            className="flex items-center gap-2 border px-2 py-1.5 rounded-lg focus-within:ring focus-within:ring-indigo-300"
          >
            <field.icon className="text-gray-400" size={16} />
            <input
              name={field.name}
              type={field.type || "text"}
              placeholder={field.placeholder}
              value={form[field.name]}
              onChange={handleChange}
              required
              className="flex-1 outline-none text-sm"
            />
          </motion.div>
        ))}

        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          disabled={submitting}
          className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold shadow-sm hover:bg-indigo-700 transition text-sm"
        >
          {submitting ? 'Processing...' : 'Place Order'}
        </motion.button>
      </motion.form>
    </div>
  )
}

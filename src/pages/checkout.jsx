import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../features/cart/cartSlice'

export default function Checkout() {
  const items = useSelector((state) => state.cart.items) // ✅ Correct variable
  const dispatch = useDispatch()

  const [form, setForm] = useState({ name: '', email: '', address: '', phone: '' })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  // ✅ Calculate total dynamically from items
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (items.length === 0) return alert('Cart is empty')

    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSuccess(true)
      dispatch(clearCart()) // ✅ clear cart
    }, 800)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-semibold">Checkout</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form Section */}
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-3">
          <label className="block">
            <div className="text-sm mb-1">Name</div>
            <input name="name" value={form.name} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
          </label>

          <label className="block">
            <div className="text-sm mb-1">Email</div>
            <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
          </label>

          <label className="block md:col-span-2">
            <div className="text-sm mb-1">Address</div>
            <textarea name="address" value={form.address} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
          </label>

          <label className="block">
            <div className="text-sm mb-1">Phone</div>
            <input name="phone" value={form.phone} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
          </label>

          <button type="submit" disabled={submitting} className="w-full bg-blue-600 text-white py-2 rounded">
            {submitting ? 'Processing...' : 'Place Order'}
          </button>

          {success && <div className="text-green-600">Order placed successfully! 🎉</div>}
        </form>

        {/* Order Summary */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-3">Order Summary</h3>

          {items.length === 0 ? (
            <div className="text-sm text-gray-600">No items in cart.</div>
          ) : (
            <div className="space-y-2">
              {items.map(i => (
                <div key={i.id} className="flex justify-between text-sm">
                  <div className="truncate w-48">{i.title}</div>
                  <div>{i.qty} × ${i.price.toFixed(2)}</div>
                </div>
              ))}
              <div className="border-t pt-2 mt-2 text-right font-semibold">
                Total: ${total.toFixed(2)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

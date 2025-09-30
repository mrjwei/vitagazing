import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import axiosInstance from "../axiosConfig"

const SubscriptionForm = () => {
  const navigate = useNavigate()
  let { user, login } = useAuth()
  const [formData, setFormData] = useState({
    cardNum: "",
    cardHolder: "",
    expDate: "",
    cvv: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axiosInstance.put("/api/subscription", {subscribed: true}, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      login({...user, subscribed: true})
      navigate(localStorage.getItem("prevURL") || "/")
      setFormData({
        cardNum: "",
        cardHolder: "",
        expDate: "",
        cvv: "",
      })
    } catch (error) {
      console.error(error)
      alert("Failed to submit subscription.")
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 md:p-8 shadow-md rounded-lg"
    >
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-4">Payment Information</h2>
        <div>
          <label htmlFor="cardNum" className="block mb-2">
            Card Number
          </label>
          <input
            type="text"
            placeholder="Card Number"
            value={formData.cardNum}
            onChange={(e) =>
              setFormData({ ...formData, cardNum: e.target.value })
            }
            className="w-full mb-4 p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="cardHolder" className="block mb-2">
            Card Holder
          </label>
          <input
            type="text"
            placeholder="Card Holder"
            value={formData.cardHolder}
            onChange={(e) =>
              setFormData({ ...formData, cardHolder: e.target.value })
            }
            className="w-full mb-4 p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="expDate" className="block mb-2">
            Expiration Date
          </label>
          <input
            type="text"
            placeholder="MM/YY"
            id="expDate"
            value={formData.expDate}
            onChange={(e) =>
              setFormData({ ...formData, expDate: e.target.value })
            }
            className="w-full mb-4 p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="cvv" className="block mb-2">
            CVV
          </label>
          <input
            type="text"
            placeholder="CVV"
            value={formData.cvv}
            onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
            className="w-full mb-4 p-2 border rounded"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-violet-800 text-white p-2 rounded-lg mt-4"
      >
        Submit
      </button>
    </form>
  )
}

export default SubscriptionForm

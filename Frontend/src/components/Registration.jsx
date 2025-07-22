import React, { useState } from "react";

const Registration = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Capacity: "",
    Tyres: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/vehicles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Name: formData.Name,
          Capacity: parseInt(formData.Capacity),
          Tyres: parseInt(formData.Tyres),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`${data.message}`);
        setFormData({ Name: "", Capacity: "", Tyres: "" });// reset formData
      } else {
        setMessage("Failed to register vehicle");
      }
    } catch (err) {
      console.log("Error:", err);
      setMessage("Error registering vehicle.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="w-full max-w-md p-8 bg-base-100 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">
          Vehicle Registration
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text text-base-content">Name</span>
            </label>
            <input
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text text-base-content">
                Capacity (kg)
              </span>
            </label>
            <input
              type="number"
              name="Capacity"
              value={formData.Capacity}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text text-base-content">Tyres</span>
            </label>
            <input
              type="number"
              name="Tyres"
              value={formData.Tyres}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Register
          </button>
        </form>

        {message && (
          <div className="mt-4 alert alert-info text-sm justify-center">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Registration;

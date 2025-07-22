import React from "react";
import { useDispatch } from "react-redux";
import { addVehicle } from "../../Utils/AppSlice";
import { useNavigate } from "react-router";

const CheckAvailability = () => {
  const [formData, setFormData] = React.useState({
    Capacity: "",
    FromPincode: "",
    ToPincode: "",
    DateTime: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Checking Availability with data:", formData);

    const localDate = new Date(formData.DateTime);
    const utcDate = localDate.toISOString(); // This ensures consistent backend interpretation

    try {
      const response = await fetch(
        `http://localhost:3000/api/vehicles/available?capacityRequired=${formData.Capacity}&fromPincode=${formData.FromPincode}&toPinCode=${formData.ToPincode}&startTime=${utcDate}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();

      dispatch(
        addVehicle({
          vehicle: data,
          startTime: formData.DateTime,
          toPincode: formData.ToPincode,
          fromPincode: formData.FromPincode,
        })
      );

      navigate("/bookVehicle");
      console.log("Available Vehicles:", data.availableVehicles);
    } catch (err) {
      console.error("Error checking availability:", err);
      alert("Error checking availability. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-full max-w-md shadow-xl bg-base-100 p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Check Availability
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label htmlFor="Capacity" className="label">
              <span className="label-text">Capacity Required (kg)</span>
            </label>
            <input
              type="number"
              name="Capacity"
              id="Capacity"
              value={formData.Capacity}
              onChange={handleChange}
              className="input input-bordered"
              placeholder="Enter required capacity"
              required
            />
          </div>

          <div className="form-control">
            <label htmlFor="FromPincode" className="label">
              <span className="label-text">From Pincode</span>
            </label>
            <input
              type="text"
              name="FromPincode"
              id="FromPincode"
              value={formData.FromPincode}
              onChange={handleChange}
              className="input input-bordered"
              placeholder="From area pincode"
              required
            />
          </div>

          <div className="form-control">
            <label htmlFor="ToPincode" className="label">
              <span className="label-text">To Pincode</span>
            </label>
            <input
              type="text"
              name="ToPincode"
              id="ToPincode"
              value={formData.ToPincode}
              onChange={handleChange}
              className="input input-bordered"
              placeholder="To area pincode"
              required
            />
          </div>

          <div className="form-control">
            <label htmlFor="DateTime" className="label">
              <span className="label-text">Start Date & Time</span>
            </label>
            <input
              type="datetime-local"
              name="DateTime"
              id="DateTime"
              value={formData.DateTime}
              onChange={handleChange}
              className="input input-bordered"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Check Availability
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckAvailability;

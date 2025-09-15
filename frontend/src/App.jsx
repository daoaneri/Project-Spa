import React, { useState, useEffect, useRef } from "react";

// Generate times from 09:00 to 18:00 in 30-minute increments
const generateTimes = () => {
  const times = [];
  for (let hour = 9; hour <= 18; hour++) {
    times.push(`${hour.toString().padStart(2, "0")}:00`);
    if (hour < 18) times.push(`${hour.toString().padStart(2, "0")}:30`);
  }
  return times;
};

export default function App() {
  const [services, setServices] = useState([]); // State for backend data
  const [booking, setBooking] = useState(null);
  const [submittedBookings, setSubmittedBookings] = useState([]);
  const fetched = useRef(false);

  // Fetch services from backend when component mounts
      useEffect(() => {
        if (!fetched.current) {
        fetched.current = true;
        fetch("http://localhost:5064/api/services")
            .then(res => res.json())
            .then(data => {
            console.log("Fetched services:", data); 
            setServices(data);
            })
            .catch(err => console.error(err));
        }
    }, []);

  const startBooking = (service) => {
    setBooking({ service, date: "", time: "" });
  };

  const submitBooking = () => {
    setSubmittedBookings([...submittedBookings, booking]);
    alert(`Your ${booking.service.Name} is booked on ${booking.date} at ${booking.time}`);
    setBooking(null);
  };

  return (
    <div>
      <div className="hero">
        <img src="/icons/logo.jpg" alt="Serenity Spa Logo" style={{ width: 90, height: 90, objectFit: "cover", borderRadius: "50%", display: "block", margin: "0 auto 1rem auto" }} />
        <h1>Welcome to Serenity Spa</h1>
        <h3>Address: 000 Nguyễn Cư Trinh, Vĩnh Thanh, Tp. Rạch Giá, Kiên Giang, Vietnam</h3>
        <h3>Phone number: +01 23 45 67 89</h3>
      </div>

      <h1>Our Services</h1>
      <div className="service-grid-wrapper">
        <div className="service-grid">
          {services.length === 0 ? (
            <p>Loading services...</p>
          ) : (
            services.map(service => (
            <div key={service.id} className="service-card">
                <img src={service.image} alt={service.name} className="service-image" />
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <p>duration: {service.duration}</p>
                <strong>{service.price?.toFixed(3)} ₫</strong>
                <button onClick={() => startBooking(service)}>Book Now</button>
            </div>
            ))
          )}
        </div>
      </div>

      {booking && (
        <>
          <div className="modal-overlay" onClick={() => setBooking(null)}></div>
          <div className="booking-form">
            <h2>Book: {booking.service.Name}</h2>
            <label>
              Date:
              <input type="date" value={booking.date} onChange={(e) => setBooking({ ...booking, date: e.target.value })} />
            </label>
            <label>
              Time:
              <select value={booking.time} onChange={(e) => setBooking({ ...booking, time: e.target.value })}>
                <option value="">Select a time</option>
                {generateTimes().map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </label>
            <button onClick={submitBooking}>Submit Booking</button>
            <button onClick={() => setBooking(null)}>Cancel</button>
          </div>
        </>
      )}

      <footer style={{ marginTop: "2.5rem", padding: "1.2rem 0 0.5rem 0", textAlign: "center" }}>
        <div className="social-icons">
          <a href="https://m.me/your-page-id" target="_blank" rel="noopener noreferrer" title="Facebook">
            <img src="/icons/facebook.png" alt="Facebook" />
          </a>
          <a href="https://m.me/your-page-id" target="_blank" rel="noopener noreferrer" title="Messenger">
            <img src="/icons/messenger.png" alt="Messenger" />
          </a>
          <a href="https://zalo.me/your-phone-number" target="_blank" rel="noopener noreferrer" title="Zalo">
            <img src="/icons/zalo.png" alt="Zalo" />
          </a>
        </div>
      </footer>
    </div>
  );
}

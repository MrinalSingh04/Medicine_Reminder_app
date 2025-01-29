import React, { useState, useEffect } from "react";
import "./MedicineReminder.css";

const MedicineReminder = () => {
  const [medicines, setMedicines] = useState([]);
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  
  useEffect(() => {
    const savedMeds = JSON.parse(localStorage.getItem("medicines")) || [];
    setMedicines(savedMeds);
  }, []);

  useEffect(() => {
    localStorage.setItem("medicines", JSON.stringify(medicines));
  }, [medicines]);

  useEffect(() => {
    const checkReminders = setInterval(() => {
      const now = new Date().toTimeString().slice(0, 5);
      console.log("Checking reminders at:", now);
      medicines.forEach((med) => {
        if (med.time === now) {
          setTimeout(() => {
            alert(`Time to take ${med.name}!`);
          }, 0);
        }
      });
    }, 60000);
    return () => clearInterval(checkReminders);
  }, [medicines]);

  const addMedicine = () => {
    if (!name || !time) return alert("Please fill all fields");
    const newMed = { name, time };
    setMedicines([...medicines, newMed]);
    setName("");
    setTime("");
  };

  return (
    <div className="container">
      <h2>Medicine Reminder</h2>
      <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Medicine Name" />
      <input className="input" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      <button className="button" onClick={addMedicine}>Add Reminder</button>
      <ul className="list">
        {medicines.map((med, index) => (
          <li key={index} className="list-item">{med.name} - {med.time}</li>
        ))}
      </ul>
    </div>
  );
};

export default MedicineReminder;
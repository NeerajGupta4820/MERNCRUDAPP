import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function View() {
  const [getstud, SetGetstud] = useState([]);

  const { id } = useParams();
  console.log(id);

  const getstuddata = async () => {
    const res = await fetch(`http://localhost:5000/getstud/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await res.json();

    if (res.status === 422 || !data) {
      console.log("error");
    } else {
      SetGetstud(data);
      console.log("get data");
    }
  }

  useEffect(() => {
    getstuddata();
  }, [])

  return (
    <div className='container mt-5'>
      <h4>Student Information</h4>
      <div className='underline'></div>
      {getstud && (
        <ul className="list-group w-50 mt-4">
          <li className="list-group-item active" aria-current="true">All Information About</li>
          <img src={`http://localhost:5000/public/images/${getstud.profile}`} alt='Student Profile' width="240" height="200" />
          <li className="list-group-item">Student Name: {getstud.name}</li>
          <li className="list-group-item">Student Email: {getstud.email}</li>
          <li className="list-group-item">Student Address: {getstud.address}</li>
          <li className="list-group-item">Student Age: {getstud.age}</li>
          <li className="list-group-item">
            Document Images:
            {getstud.documenetImg && getstud.documenetImg.length > 0 ? (
              <ul>
                {getstud.documenetImg.map((image, index) => (
                  <li key={index}>
                    <img src={`http://localhost:5000/public/images/${image}`} alt={`docImg${index}`} width="120" height="100" />
                  </li>
                ))}
              </ul>
            ) : (
              <p>No document images available.</p>
            )}
          </li>
        </ul>
      )}
      <Link className='btn btn-primary mt-5' to="/allstud">Back</Link>
    </div>
  );
}

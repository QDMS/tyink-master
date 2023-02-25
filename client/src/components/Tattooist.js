import React from 'react'
import { useNavigate } from 'react-router-dom';

function Tattooist({ tattooist }) {
    const navigate = useNavigate();
    return (
        <div className="card p-2 cursor-pointer" onClick={() => navigate(`/book-appointment/${tattooist._id}`)}>
            <h1 className="card-title">
                {tattooist.firstName}
                {tattooist.lastName}
            </h1>
            <hr />
            <p><b>Phone Number : </b>{tattooist.phoneNumber}</p>
            <p><b>Address : </b>{tattooist.address}</p>
            <p><b>Fee Per Visit : </b>{tattooist.feePerCunsultation}</p>
            <p><b>Availability : </b>{tattooist.availability[0]} - {tattooist.availability[1]}</p>

        </div>
    )
}

export default Tattooist

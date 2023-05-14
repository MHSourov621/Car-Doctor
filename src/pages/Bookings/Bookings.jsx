import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import BookingRow from "./BookingRow";
import { useNavigate } from "react-router-dom";


const Bookings = () => {
    const { user } = useContext(AuthContext);
    const url = `https://car-doctor-server-mhsourov621.vercel.app/bookings?email=${user?.email}`;
    const navigate = useNavigate();

    const [bookings, setBookings] = useState([])
    useEffect(() => {
        fetch(url, {
            method: "GET",
            headers: {
                authorization : `Bearer ${localStorage.getItem('car-access-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if(!data.error){
                    setBookings(data)
                }
                else{
                    navigate('/')
                }
            })
    }, [url, navigate]);

    const handleDelete = id => {
        const proceed = confirm("Are you sure to delete data");
        if (proceed) {
            fetch(`https://car-doctor-server-mhsourov621.vercel.app/bookings/${id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        alert('Deleted successfully')
                    }
                    const remaining = bookings.filter(booking => booking._id !== id);
                    setBookings(remaining)
                })
        }
    }

    const handleConfirm = id => {
        fetch(`https://car-doctor-server-mhsourov621.vercel.app/bookings/${id}`, {
            method: "PATCH",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify({status : "confirm"})
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.modifiedCount > 0){
                    //update status
                    const remaining = bookings.filter(booking => booking._id !== id);
                    const update = bookings.find(booking => booking._id === id);
                    update.status = 'confirm'
                    const newBookings = [update, ...remaining];
                    setBookings(newBookings)
                }
            })


    }

    return (
        <div>
            <h2 className="text-5xl">Your Bookings : {bookings.length}</h2>

            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Image</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>States</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map(booking => <BookingRow
                                key={booking._id}
                                booking={booking}
                                handleDelete={handleDelete}
                                handleConfirm={handleConfirm}
                            ></BookingRow>)
                        }
                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default Bookings;
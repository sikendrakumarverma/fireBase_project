import axios from "axios";
import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate} from "react-router-dom";
import DataTable from 'react-data-table-component';
import { SERVER_URI } from '../config/keys';

import Swal from "sweetalert2";

function AllUsersList() {

    let [data1, setData] = useState([]);
    let navigate = useNavigate();
    let data=[...data1]

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Phone',
            selector: row => row.phone,

        },
        {
            name: 'Email',
            selector: row => row.email,
        },
        {
            name: 'Address',
            selector: row => row.address,
        },
        {
            name: 'CreatedAt',
            selector: row => row.createdAt,
             sortable: true,
        },
        {
            name: 'More Details',
            selector: row => <button  onClick={() => { Vieww(row) }} className="Give_Review"> More Details</button>,

        },
    ];
    
    //  {data.map((item, index) =>{
    //  data = [
    //     {
    //         id: 1 ,
    //         name: `${data[0].name}`,
    //         phone:  `${data[0].phone}`,
    //         email: `${data[0].email}`,
    //         address: `${data[0].address}`,
    //         createdAt:  `${data[0].createdAt}`,
    //         moreDetails: <button onClick={() => { Vieww(data[0]) }} className="Give_Review">View Details</button>,
    //     },
    // ]
       

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate("/login")
        }
        getBooksData();

    }, [])
    console.log(localStorage.getItem("token"))

    async function getBooksData() {
        await axios.get(`${SERVER_URI}/getAllUser`,{
            headers: {
                'x-api-key': localStorage.getItem("token")
              
            }
        })
            .then((response) => {
                setData(response.data.data)
                //alert(`success : ${response.data.message}`)
                Swal.fire({
                    // position: 'top-end',
                    icon: 'success',
                    title: response.data.message,
                    showConfirmButton: false,
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    },
                     timer: 2500
                })
            })
            .catch((error) => {
                console.log("error :", error.response.data.message)
                alert(`Error: ${error.response.data.message}`)
            })
        
    }

    
    function Vieww(user) {
        
        // navigate("/createReview/"+id );
        // Vieww
        console.log(user.name)
        Swal.fire({
            // position: 'top-end',
            icon: 'success',
            title:`Name: ${user.name}
            Phone: ${user.phone}
            Email: ${user.email}
            Address: ${user.address}`,
            
            showConfirmButton: false,
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            },
            timer: 5000
          }).then(() => {
            navigate("/");
          })

    }


    return (
        <div >
            <h1> All Users List</h1>

            <DataTable
            columns={columns}
            data={data} 
        />

            {/* <div className="col-sm-10 offset-sm-1">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>UserId</th>
                            <th>CreatedAt</th>
                            <th>View Details</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) =>
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item._id}</td>
                                <td>{item.createdAt}</td>
                                <td><span onClick={() => { Vieww(item) }} className="Give_Review">View Details</span></td>
                            </tr>)
                        }
                    </tbody>
                </Table>
            </div> */}
        </div>
    )
}
export default AllUsersList;
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState } from "react";
import Swal from "sweetalert2";
import { auth } from "../../firebase";
import { signOut} from "firebase/auth";


export function Header(props) {

    let object = props
    console.log(object)

    let navigate = useNavigate();

    function Logout() {


        auth.signOut().then(() => {
            // Sign-out successful.
            Swal.fire({
                // position: 'top-end',
                icon: 'success',
                title: 'Logged Out!',
                showConfirmButton: false,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                },
                timer: 2500
            }).then(() => {
                navigate("/login")
                window.location.reload()
            })

        }).catch((error) => {
            // An error happened.
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                },
                text: error
              })
        });

    }

    return (
        <div style={{background:"#6E6E6E"}}>
            <Navbar bg="light-white" expand="lg">

                <Navbar.Brand href="#"  > Navbar </Navbar.Brand>

                <Nav
                    className="me-auto nav_bar_wrraper"
                >
                    <Link to='/' className="space">Home</Link>
                    {
                        props.name ?
                            <>
                                
                            </> : <>
                                <Link to='/signup' className="space">Register</Link>
                                <Link to='/login' className="space">Login</Link>
                            </>
                    }
                </Nav>
                {props.name ?
                    <div>
                        <Form className="d-flex">

                            <Form.Control
                                type="search"
                                placeholder="Search "
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </div> : null}

                {props.name ?
                    <div className="logiContent" >
                        <Nav >
                            <NavDropdown title={object.name} className="logiContent" >
                                <NavDropdown.Item onClick={Logout}> Logout</NavDropdown.Item>
                                <NavDropdown.Item > Profile</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>

                    </div>
                    : null}

            </Navbar>

        </div>

    );
}
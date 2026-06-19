import {Link} from "react-router-dom";


export default function Home(){
    return(
        <>
        <h1>Welocome to image - processing-webApp</h1>
        <Link to="/Login">
        <button>LOGIN</button></Link>

        <Link to="/Register">
        <button>Register</button></Link>

        <Link to="/Dashboard">
        <button>Dashboard</button></Link>
        </>
    );
}
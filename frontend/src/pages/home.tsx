import {Link} from "react-router-dom";


export default function Home(){
    return(
        <>
        <h1>Welocome to image - processing-webApp</h1>
        <Link to="/loginUser">
        <button>LOGIN</button></Link>

        <Link to="/registerUser">
        <button>Register</button></Link>

        <Link to="/Dashboard">
        <button>Dashboard</button></Link>
        </>
    );
}
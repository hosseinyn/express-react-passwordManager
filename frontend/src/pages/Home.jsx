import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock , faHardDrive , faPerson } from '@fortawesome/free-solid-svg-icons';
import ParticlesBg from "particles-bg";
import { Link } from 'react-router-dom';
import 'animate.css/animate.css';

const Home = () => {
    return(
        <>
        <div className="flex flex-col gap-5 items-center mt-15">
            <ParticlesBg type="tadpole" bg={true} />
            <FontAwesomeIcon icon={faLock} className='text-amber-200 text-9xl rounded-2xl bg-amber-400 animate__animated animate__backInDown' />
            <h1 className='text-3xl animate__animated animate__backInUp text-center'>Save , <span className='text-blue-500'>Encrypt</span> , Manage your password</h1>
            
            <h3 className='text-green-700 font-bold animate__animated animate__backInLeft'>Only 5 minutes , Almost done!</h3>

            <div className="flex gap-2 animate__animated animate__backInRight">
                <Link to="/login"><button className='bg-blue-600 text-white hover:bg-blue-900 w-36 h-10 rounded-4xl cursor-pointer duration-300'>Get Started</button></Link>
                <a href="https://github.com/hosseinyn/express-react-passwordManager">
                    <button className='bg-yellow-500 text-white hover:bg-yellow-800 w-24 h-10 rounded-3xl cursor-pointer duration-300'>GitHub</button>
                </a>
            </div>
        </div>

        <div className='flex flex-col items-center gap-5 mt-24 bg-gray-700' id="features" style={{minHeight: "400px"}}>
            <h1 className="text-white text-4xl mt-14">Features : </h1>

            <div className="flex flex-wrap sm:flex-wrap gap-5 mt-4 justify-center">
                <div className="flex flex-col items-center text-white gap-3 animate__animated animate__backInLeft">
                    <FontAwesomeIcon icon={faLock} className='text-4xl text-blue-400' />
                    <h3 className='text-xl'>Encrypted</h3>
                    <p className='w-96 text-center'>Passwords are fully encrypted using CryptoJS with your personal decryption key, making them unreadable even by the owner, ensuring your complete privacy.</p>
                </div>

                <div className="flex flex-col items-center text-white gap-3 animate__animated animate__backInLeft">
                    <FontAwesomeIcon icon={faHardDrive} className='text-4xl text-blue-400' />
                    <h3 className='text-xl'>Persistent</h3>
                    <p className='w-96 text-center'>Passwords are persistently stored in the database and will remain accessible unless you manually remove them.</p>
                </div>

                <div className="flex flex-col items-center text-white gap-3 animate__animated animate__backInLeft">
                    <FontAwesomeIcon icon={faPerson} className='text-4xl text-blue-400' />
                    <h3 className='text-xl'>Access from everywhere</h3>
                    <p className='w-96 text-center'>With your account and authentication system, you can access, delete, or edit your passwords anytime, anywhere, on any device temporarily or permanently. Fast access ensures you're never confused in urgent situations.</p>
                </div>

            </div>
            <br />
        </div>

        <div className='flex flex-col gap-5 items-center text-black mt-10' id="how-does-it-works">
            <h3 className='text-4xl'>How does it works?</h3>

            <p className="text-center" style={{width : "80%"}}>
                This project is a practice/demo full-stack password manager built with Express.js and Node.js on the backend, and React.js, Tailwind CSS, Animate.css, Particles-bg, and other libraries on the frontend.
It uses JWT authentication and encrypts all user passwords using a private encryption key with the AES method via the CryptoJS library, storing them in a SQLite database.
In this way, only the user with their own private decryption key can view their saved passwords, without the key being stored anywhere.
            </p>

            <div className="flex gap-10 items-center mt-3 flex-wrap sm:flex-wrap justify-center">
                <div className="flex flex-col  items-center">
                    <h5 className='text-xl text-green-500'>Express js | backend</h5>
                    <img src="https://www.vectorlogo.zone/logos/expressjs/expressjs-ar21.svg" alt="Express js" className='h-24'/>
                </div>

                <div className="flex flex-col  items-center">
                    <h5 className='text-xl text-blue-500'>React js | frontend</h5>
                    <img src="https://www.vectorlogo.zone/logos/reactjs/reactjs-ar21.svg" alt="React js" className='h-24'/>
                </div>

                <div className="flex flex-col  items-center">
                    <h5 className='text-xl text-purple-500'>Tailwind css | ui framework</h5>
                    <img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-ar21.svg" alt="Tailwind css" className='h-24'/>
                </div>
            </div>
            
        </div>

        <br />

        
        </>
    )
}

export default Home;
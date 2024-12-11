import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import './Signup.css'; // Ensure this CSS file includes styles for the logo
import logo from './nous_infosystems_logo.jpg'; // Adjust the path as needed

const SignupForm = () => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (!name || !code) {
      setError('Please provide both name and code');
      toast.error('Please provide both name and code');
      return;
    }

    try {
      // Use a relative URL for proxy compatibility
      const response = await axios.post('/api/auth', { name,code });

      // If signup is successful, navigate to the quiz page
      if (response.status === 201) {
        toast.success('Signup successful!');
        setTimeout(() => navigate('/questions'), 1500);
      } else {
        setError('Invalid code or error during signup');
        toast.error('Invalid code or error during signup');
      }
    } catch (err) {
      setError('Error during signup. Please try again.');
      toast.error('Access code wrong');
      console.error('Signup failed:', err);
    }
  };

  return (
    <div className="signup-container">
      <Toaster />
      <img src={logo} alt="Nous Infosystems Logo" className="logo" />
      <div className="signup-card">
        <h2 className="signup-title">Signup</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <div>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Enter your code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="input-field"
            />
          </div>
          {error && <p className="error-text">{error}</p>}
          <button
            type="submit"
            className="submit-button"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import toast, { Toaster } from 'react-hot-toast';
// import './Signup.css'; // Ensure this CSS file includes styles for the logo
// import logo from './nous_infosystems_logo.jpg'; // Adjust the path as needed

// const SignupForm = () => {
//   const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
//   const [name, setName] = useState('');
//   const [code, setCode] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate input
//     if (!name || !code) {
//       setError('Please provide both name and code');
//       toast.error('Please provide both name and code');
//       return;
//     }

//     try {
//       // Use a relative URL for proxy compatibility
//       const response = await axios.post(`${BASE_URL}/auth/signup`, { name,code });

//       // If signup is successful, navigate to the quiz page
//       if (response.status === 201) {
//         toast.success('Signup successful!');
//         console.log(name);
//         console.log(code);
//         setTimeout(() => navigate('/questions'), 1500);
//       } else {
//         setError('Invalid code or error during signup');
//         console.log(name);
//         console.log(code);
//         toast.error('Invalid code or error during signup');
//       }
//     } catch (err) {
//       setError('Error during signup. Please try again.');
//       console.log(name);
//         console.log(code);
//       toast.error('Access code wrong');
//       console.error('Signup failed:', err);
//     }
//   };

//   return (
//     <div className="signup-container">
//       <Toaster />
//       <img src={logo} alt="Nous Infosystems Logo" className="logo" />
//       <div className="signup-card">
//         <h2 className="signup-title">Signup</h2>
//         <form onSubmit={handleSubmit} className="signup-form">
//           <div>
//             <input
//               type="text"
//               placeholder="Enter your name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="input-field"
//             />
//           </div>
//           <div>
//             <input
//               type="text"
//               placeholder="Enter your code"
//               value={code}
//               onChange={(e) => setCode(e.target.value)}
//               className="input-field"
//             />
//           </div>
//           {error && <p className="error-text">{error}</p>}
//           <button
//             type="submit"
//             className="submit-button"
//           >
//             Next
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignupForm;

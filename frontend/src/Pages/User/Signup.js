import { useSignup } from '../../hooks/useSignup';
import { useState } from 'react';

const Signup = () => {
    const { error, isLoading , signup } = useSignup();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        await signup(email, password);
    }

    return ( 
        <div className="signupContainer">
            <h2>Sign up</h2>
            <form onSubmit={handleSubmit} className="signup">
                <label>Email</label>
                <input type="email" required placeholder="Email" value={email} onChange={(e) => {setEmail(e.target.value);}} />
                <label>Password</label>
                <input type="password" required placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value);}} />
                <label>Check Password</label>
                <input type="password" required placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value);}} />
                { isLoading && <button className="button" disabled>Loading...</button>}
                { !isLoading && <button className="button">Sign up</button>}
                { error && <div className="error">{error}</div>}
            </form>
        </div>
     );
}
 
export default Signup;
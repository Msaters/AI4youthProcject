import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { error, isLoading , login } = useLogin();

    const handleSubmit = (event) => {
        event.preventDefault();
        login(email, password);
    }

    return ( 
        <div className="signupContainer">
        <h2>Log in</h2>
            <form onSubmit={handleSubmit} className="signup">
                <label>Email</label>
                <input type="email" required placeholder="Email" value={email} onChange={(e) => {setEmail(e.target.value);}} />
                <label>Password</label>
                <input type="password" required placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value);}} />
                <label>Check Password</label>
                <input type="password" required placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value);}} />
                { isLoading && <button className="button" disabled>Loading...</button>}
                { !isLoading && <button className="button">Log in</button>}
                { error && <div className="error">{error}</div>}
            </form>
</div>
     );
}
 
export default Login;
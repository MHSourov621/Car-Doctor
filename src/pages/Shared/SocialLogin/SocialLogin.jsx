import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const SocialLogin = () => {
    const {googleLogin} = useContext(AuthContext);
    const handleGoogleLogin = () => {
        googleLogin()
        .then(result => {
            const user = result.user;
            console.log(user);
        })
        .catch(error => {
            console.log(error.message);
        })
    }
    return (
        <div>
            <div className="divider">or</div>
            <div className="text-center">
                <button onClick={handleGoogleLogin} className="btn btn-circle btn-outline">
                    G
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom'
import IconPopcorn from '../assets/popcorn.png'
import UserContext from '../context/UserContext';

type Inputs = {
    email: string,
    password: string,
};
const Login = () => {

    const { register, handleSubmit, watch, errors } = useForm<Inputs>();
    const { signin, user } = useContext(UserContext)
    const history = useHistory();

    const onSubmit = (userData: any) => {
        signin(userData, history)
    }

    return (
        <div className="container">
            <div className="row justify-content-center my-5">
                <div className="col-md-6 card-login">
                    <div className="row justify-content-center">
                        <div className="py-2 text-center">
                            <img className="mb-4" src={IconPopcorn} alt="" width="76" height="76" />
                            <h1 className="title-login mb-3 font-weight-normal">Welcome</h1>
                        </div>
                    </div>

                    <div className="row justify-content-center my-4">
                        <div className="col">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="">
                                    <input
                                        id="validationServer03"
                                        name="email" type="email"
                                        placeholder="user@gmail.com"
                                        className="form-control input-login"
                                        ref={register({ required: true })} />
                                    {errors.email &&
                                        (
                                            <p
                                                id="validationServer03Feedback"
                                                className="invalid-feedback">
                                                This field is required
                                            </p>
                                        )}
                                </div>
                                <br />
                                <div className="">
                                    <input
                                        name="password" type="password"
                                        placeholder="password"
                                        className="form-control input-login"
                                        ref={register({ required: true })} />
                                    {errors.password &&
                                        (
                                            <p
                                                id="validationServer03Feedback"
                                                className="invalid-feedback">
                                                This field is required
                                            </p>
                                        )}
                                </div><br />
                                {user.error &&
                                    (<p className="invalid-feedback">{user.error}</p>)
                                }
                                <div className="row my-1">
                                    <div className="col-md-3">
                                        <button
                                            className="btn btn-sm btn-login btn-primary"
                                            type="submit" >Login
                                    </button>
                                    </div>
                                    <div className="col-md-9">
                                        <span>Don't have an account? </span>
                                        <Link to="/signup" className="signin-login"> Sign in here</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login

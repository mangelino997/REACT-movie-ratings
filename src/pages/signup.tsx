import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom'
import IconPopcorn2 from '../assets/popcorn2.png'
import UserContext from '../context/UserContext';

type Inputs = {
    email: string,
    username: string,
    password: string,
};
const Signup = () => {

    const { register, handleSubmit, watch, errors } = useForm<Inputs>();
    const {signup, user} = useContext(UserContext);
    const history = useHistory();

    const onSubmit = (newUser: any) =>{
        signup(newUser, history)
    }


    return (
        <div className="container">
            <div className="row justify-content-center my-5">
                <div className="col-md-6 card-login">
                    <div className="row justify-content-center">
                        <div className="py-2 text-center">
                            <img className="mb-4" src={IconPopcorn2} alt="" width="76" height="76" />

                            <h1 className="title-login mb-3 font-weight-normal">Sign Up</h1>
                        </div>
                    </div>
                    <div className="row justify-content-center my-4">
                        <div className="col">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="">
                                    <input
                                        name="username" type="text"
                                        placeholder="username"
                                        className="form-control input-login"
                                        ref={register({ required: true })} />
                                    {errors.username &&
                                        <span
                                            className="invalid-feedback">
                                            This field is required
                                        </span>
                                    }
                                </div>
                                <br />
                                <div className="">
                                    <input
                                        name="email" type="email"
                                        placeholder="email"
                                        className="form-control input-login"
                                        ref={register({ required: true })} />
                                    {errors.email &&
                                        <span
                                            className="invalid-feedback">
                                            This field is required
                                        </span>
                                    }
                                </div>
                                <br />
                                <div className="">
                                    <input
                                        name="password" type="password"
                                        placeholder="password"
                                        className="form-control input-login"
                                        ref={register({ required: true })} />
                                    {errors.password &&
                                        <span
                                            className="invalid-feedback">
                                            This field is required
                                        </span>
                                    }
                                </div><br />
                                {user.error &&
                                    (<p className="invalid-feedback">{user.error}</p>)
                                }
                                <div className="row my-1">
                                    <div className="col-md-3">
                                        <button
                                            className="btn btn-sm btn-login btn-primary"
                                            type="submit" >Signup
                                    </button>
                                    </div>
                                    <div className="col-md-9">
                                        <span>Have an account? </span>
                                        <Link to="/login" className="signin-login"> Login here</Link>
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

export default Signup

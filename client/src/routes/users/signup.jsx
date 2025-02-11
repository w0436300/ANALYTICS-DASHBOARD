import { Form, Link, useActionData, useNavigation } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import api from '../../services/api';

const Signup = () => {
    const navigation = useNavigation();
    const actionData = useActionData();
    const isSubmitting = navigation.state === 'submitting';
    const [errorMessage, setErrorMessage] = useState('');

    const handleGoogleSignup = async () => {
        try {
            const response = await axios.get('/api/auth/google');
            window.location.href = response.data.url;
        } catch (error) {
            console.error('Google sign up error:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');

        const formData = new FormData(event.target);
        const data = {
            firstname: formData.get('firstname'),
            lastname: formData.get('lastname'),
            email: formData.get('email'),
            password: formData.get('password')
        };

        try {
            const response = await api.post('/api/auth/register', data);

            if (response.status === 201) {
                // Registration successful, redirect to login or dashboard
                window.location.href = '/signin';
            }
        } catch (error) {
            console.error('Registration error:', error);
            setErrorMessage(error.response?.data?.error || 'An error occurred during registration.');
        }
    };

    return (
        <main className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-center mb-8">Create an Account</h2>

            <div className="w-full">
                <button
                    type="button"
                    className="w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={handleGoogleSignup}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Processing...' : 'Sign Up with Google'}
                </button>
            </div>

            <div className="relative flex items-center justify-center my-8">
                <div className="absolute w-full border-t border-gray-300"></div>
                <div className="relative bg-base-100 px-4">
                    <p className="text-sm text-gray-500">Or, register with your email</p>
                </div>
            </div>

            <Form method="post" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="First name"
                            name="firstname"
                            required
                        />
                    </div>

                    <div>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Last name"
                            name="lastname"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Email"
                            name="email"
                            type="email"
                            required
                        />
                    </div>

                    <div>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="password"
                            placeholder="Password"
                            name="password"
                            required
                        />
                    </div>
                </div>

                {errorMessage && <div className="p-4 text-red-700 bg-red-100 rounded-md">{errorMessage}</div>}

                <div className="flex flex-wrap justify-between items-center">
                    <div className="flex items-center">
                        <input
                            id="default-checkbox"
                            type="checkbox"
                            name="keepSignedIn"
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="default-checkbox" className="ml-2 text-sm text-base-content">
                            Keep me signed in
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Creating Account...' : 'Create Account'}
                    </button>
                </div>

                <div className="border-t border-base-300 pt-6 text-center">
                    <p className="text-sm text-base-content">
                        Already have an account?{' '}
                        <Link to="/signin" className="text-blue-600 hover:text-blue-500">
                            Sign In
                        </Link>
                    </p>
                </div>
            </Form>
        </main>
    );
};

export default Signup;

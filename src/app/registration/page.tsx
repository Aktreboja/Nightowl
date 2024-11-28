'use client';
import { useState } from 'react';

export default function Registration() {
  const [firstName, setFirstName] = useState('');
  const [username, setUsername] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="w-full h-full flex">
      <div className="max-lg:w-full w-2/5 mx-auto h-full flex flex-col items-center justify-center">
        <div className="w-4/5">
          <h1 className="text-2xl font-bold w-full">Tell us about yourself</h1>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="my-2">First Name</label>
              <input
                placeholder="First Name"
                className="input input-bordered rounded-md "
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="my-2">Username</label>
              <input
                placeholder="Username"
                className="input input-bordered rounded-md"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="my-2">City</label>
              <input
                placeholder="City"
                className="input input-bordered rounded-md "
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="my-2">State</label>
              <input
                placeholder="State"
                className="input input-bordered rounded-md "
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            <button
              disabled={!firstName || !username || !city || !state}
              className="btn btn-accent rounded-md mt-4"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
      <div className="max-lg:hidden w-3/5 border h-full bg-button-primary"></div>
    </div>
  );
}

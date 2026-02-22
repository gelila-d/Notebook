import React from "react";

const RateLimitedUI = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-center">
            Rate Limited Action
          </h2>
          <p className="text-center text-gray-600 mb-4">
            You can only perform this action once every few seconds.
          </p>
          <div className="flex justify-center">
            <button className="btn btn-accent btn-lg">
              Perform Action
            </button>
          </div>
          <p className="text-center text-sm text-gray-400 mt-2">
            Wait <span className="font-semibold">10s</span> before next action
          </p>
        </div>
      </div>
    </div>
  );
};

export default RateLimitedUI;

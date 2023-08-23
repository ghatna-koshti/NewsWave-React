import React from 'react';

const Spinner = () => {

    return (
        // <div className='text-center'>
        //     <img src={loading} alt="loading" />

        // </div>
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <div className="spinner-grow" role="status" style={{ width: "4rem", height: "4rem" }}>
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )

}

export default Spinner

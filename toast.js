import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

class Toast extends Component {
    notify = (message) => toast(message, {
                        position: "top-center",
                        autoClose: 20000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false
                    });

    render() {
        return (
            <div>
                <button onClick={this.notify("hello")}>Notify !</button>
                <ToastContainer className="toast"
                    position="top-center"
                    autoClose={20000}
                    hideProgressBar
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable={false}
                    pauseOnHover
                />
            </div>
        );
    }
}
export default Toast;
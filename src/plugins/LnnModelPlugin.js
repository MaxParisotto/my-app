import React, { useState } from 'react';

const LnnModelPlugin = () => {
    const [status, setStatus] = useState('Stopped');
    const [logs, setLogs] = useState([]);

    const startLnnModel = async () => {
        const response = await fetch('http://your_backend_ip:8000/lnn_model/start', { method: 'POST' });
        if (response.ok) {
            setStatus('Running');
            initializeLnnLogs(); // Start listening for logs
        }
    };

    const stopLnnModel = async () => {
        const response = await fetch('http://your_backend_ip:8000/lnn_model/stop', { method: 'POST' });
        if (response.ok) {
            setStatus('Stopped');
        }
    };

    const initializeLnnLogs = () => {
        const wsLNN = new WebSocket("ws://your_backend_ip:8001/logs/lnn");
        wsLNN.onmessage = (event) => {
            setLogs(prev => [...prev, event.data]);
        };
    };

    return (
        <div className="plugin">
            <h4>LNN Model Control</h4>
            <div className="training-controls">
                <button onClick={startLnnModel}>Start LNN Model</button>
                <button onClick={stopLnnModel}>Stop LNN Model</button>
                <p>Status: <span className="status">{status}</span></p>
            </div>
            <div className="log-container">
                {logs.map((log, index) => (
                    <div key={index}>{log}</div>
                ))}
            </div>
        </div>
    );
};

export default LnnModelPlugin;
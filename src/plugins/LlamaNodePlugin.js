import React, { useState } from 'react';

const LlamaNodePlugin = () => {
    const [status, setStatus] = useState('Stopped');
    const [logs, setLogs] = useState([]);

    const startLlamaNode = async () => {
        const response = await fetch('http://your_backend_ip:8000/llama_node/start', { method: 'POST' });
        if (response.ok) {
            setStatus('Running');
            initializeLlamaLogs(); // Start listening for logs
        }
    };

    const stopLlamaNode = async () => {
        const response = await fetch('http://your_backend_ip:8000/llama_node/stop', { method: 'POST' });
        if (response.ok) {
            setStatus('Stopped');
        }
    };

    const initializeLlamaLogs = () => {
        const wsLlama = new WebSocket("ws://your_backend_ip:8001/logs/llama");
        wsLlama.onmessage = (event) => {
            setLogs(prev => [...prev, event.data]);
        };
    };

    return (
        <div className="plugin">
            <h4>Llama Node Control</h4>
            <div className="training-controls">
                <button onClick={startLlamaNode}>Start Llama Node</button>
                <button onClick={stopLlamaNode}>Stop Llama Node</button>
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

export default LlamaNodePlugin;
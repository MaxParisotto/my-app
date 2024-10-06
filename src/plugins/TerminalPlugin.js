import React, { useEffect, useRef } from 'react';
import { Terminal } from '@xterm/xterm';
import '@xterm/xterm/css/xterm.css'; 

const TerminalPlugin = () => {
    const terminalRef = useRef(null);
    const terminal = useRef(null);

    useEffect(() => {
        terminal.current = new Terminal();
        terminal.current.open(terminalRef.current);

        // Example command and output
        terminal.current.writeln('Welcome to the terminal!');

        terminal.current.onData(data => {
            // Handle input and send to backend here if needed
            terminal.current.write(`You typed: ${data}`);
        });

        // Cleanup on unmount
        return () => {
            terminal.current.dispose();
        };
    }, []);

    return (
        <div className="plugin">
            <h4>Terminal</h4>
            <div ref={terminalRef} style={{ height: '400px', width: '100%' }}></div>
        </div>
    );
};

export default TerminalPlugin;
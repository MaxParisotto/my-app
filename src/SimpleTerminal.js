import React, { useEffect, useRef } from 'react';
import { Terminal } from '@xterm/xterm';
import 'xterm/css/xterm.css';

const SimpleTerminal = () => {
    const terminalRef = useRef(null);

    useEffect(() => {
        const terminal = new Terminal();
        terminal.open(terminalRef.current);
        terminal.writeln('Welcome to xterm.js!');

        return () => {
            terminal.dispose();
        };
    }, []);

    return <div ref={terminalRef} style={{ height: '300px', width: '100%' }} />;
};

export default SimpleTerminal;
import React, { useState, useEffect } from 'react';
import './Layout.css';
import ChatPlugin from './plugins/ChatPlugin';
import LlamaNodePlugin from './plugins/LlamaNodePlugin';
import LnnModelPlugin from './plugins/LnnModelPlugin';
import TerminalPlugin from './plugins/TerminalPlugin'; // Import the Terminal Plugin

const Layout = () => {
    const [activeWidgets, setActiveWidgets] = useState([]);
    const [plugins, setPlugins] = useState([]);

    useEffect(() => {
        const loadPlugins = async () => {
            const pluginList = await scanPlugins();
            setPlugins(pluginList);
        };
        loadPlugins();
    }, []);

    const scanPlugins = async () => {
        return ['ChatPlugin', 'LlamaNodePlugin', 'LnnModelPlugin', 'TerminalPlugin']; // Include TerminalPlugin
    };

    const addWidget = (widgetName) => {
        if (!activeWidgets.includes(widgetName)) {
            setActiveWidgets([...activeWidgets, widgetName]);
        }
    };

    const onDragStart = (e, widget) => {
        e.dataTransfer.setData('text/plain', widget);
    };

    const onDrop = (e) => {
        const widget = e.dataTransfer.getData('text/plain');
        addWidget(widget);
    };

    return (
        <div className="layout-container">
            <main
                className="main-content"
                onDrop={onDrop}
                onDragOver={(e) => e.preventDefault()}
            >
                {activeWidgets.map((widget, index) => (
                    <div 
                        key={index} 
                        className="widget" 
                        draggable 
                        onDragStart={(e) => onDragStart(e, widget)}
                    >
                        {widget === 'ChatPlugin' && <ChatPlugin />}
                        {widget === 'LlamaNodePlugin' && <LlamaNodePlugin />}
                        {widget === 'LnnModelPlugin' && <LnnModelPlugin />}
                        {widget === 'TerminalPlugin' && <TerminalPlugin />} {/* Render Terminal Plugin */}
                    </div>
                ))}
            </main>
            <footer className="dock">
                {plugins.map((plugin) => (
                    <div key={plugin} className="dock-item" onClick={() => addWidget(plugin)}>
                        {plugin}
                    </div>
                ))}
            </footer>
        </div>
    );
};

export default Layout;
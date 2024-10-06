import React, { useEffect, useState } from 'react';
import './App.css'; // Your main stylesheet
import DraggableResizableWidget from './components/DraggableResizableWidget'; // Assuming you have this component for widgets

const App = () => {
    const [activeWidgets, setActiveWidgets] = useState([]);
    const [plugins, setPlugins] = useState([]);

    useEffect(() => {
        // Function to scan the plugins directory
        const loadPlugins = async () => {
            const pluginList = await scanPlugins();
            setPlugins(pluginList);
        };
        
        loadPlugins();
        
        // This could be enhanced with a more complex hot-plug system if needed
        const intervalId = setInterval(loadPlugins, 5000); // Check for new plugins every 5 seconds

        return () => clearInterval(intervalId);
    }, []);

    // Mock function to simulate plugin loading
    const scanPlugins = async () => {
        // Replace this mock with actual logic to dynamically import your plugins
        return [
            { name: 'ChatPlugin', component: React.lazy(() => import('./plugins/ChatPlugin')) },
            { name: 'TerminalPlugin', component: React.lazy(() => import('./plugins/TerminalPlugin')) },
            // Add more plugins here as needed
        ];
    };

    const addWidget = (widget) => {
        if (!activeWidgets.includes(widget.name)) {
            setActiveWidgets([...activeWidgets, widget]);
        }
    };

    return (
        <div className="App">
            <header>
                <h1>Dynamic Widget Dashboard</h1>
            </header>
            <main>
                {activeWidgets.map((widget, index) => {
                    const WidgetComponent = widget.component;
                    return (
                        <DraggableResizableWidget key={index} title={widget.name} onClose={() => setActiveWidgets(activeWidgets.filter(w => w !== widget))}>
                            <React.Suspense fallback={<div>Loading...</div>}>
                                <WidgetComponent />
                            </React.Suspense>
                        </DraggableResizableWidget>
                    );
                })}
            </main>
            <footer className="dock">
                <h4>Available Widgets</h4>
                {plugins.map((plugin) => (
                    <button key={plugin.name} onClick={() => addWidget(plugin)}>
                        {plugin.name}
                    </button>
                ))}
            </footer>
        </div>
    );
};

export default App;
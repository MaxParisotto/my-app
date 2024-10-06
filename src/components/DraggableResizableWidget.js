import React from 'react';
import { Rnd } from 'react-rnd';
import './WidgetStyles.css';

const DraggableResizableWidget = ({ children, title, onClose }) => {
    return (
        <Rnd
            default={{ x: 100, y: 100, width: 300, height: 300 }}
            minWidth={200}
            minHeight={100}
            bounds="parent"
            className="widget"
        >
            <div className="widget-header">
                <span>{title}</span>
                <button onClick={onClose} className="close-button">✖</button>
            </div>
            <div className="widget-content">
                {children}
            </div>
        </Rnd>
    );
};

export default DraggableResizableWidget;
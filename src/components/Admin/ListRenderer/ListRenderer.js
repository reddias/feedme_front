// ListRenderer.js
import React from 'react';
import './listRenderer.css';

const ListRenderer = ({ title, items, renderItem }) => {
    return (
        <div className="list-renderer-container">
            <h2 className="list-renderer-title">{title}</h2>
            <ul className="list-renderer-list">
                {items && items.length > 0 ? (
                    items.map((item, index) => (
                        <li key={index} className="list-renderer-item">
                            {renderItem(item)}
                        </li>
                    ))
                ) : (
                    <li className="list-renderer-empty">No {title?.toLowerCase()} available.</li>
                )}
            </ul>
        </div>
    );
};

export default ListRenderer;

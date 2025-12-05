import React from 'react';
import '../styles/jsonViewer.css';

const JsonViewer = ({ data }) => {
  if (!data) return null;

  const formatJson = (obj, indent = 0) => {
    if (obj === null) {
      return <span className="json-null">null</span>;
    }
    
    if (typeof obj === 'string') {
      return <span className="json-string">"{obj}"</span>;
    }
    
    if (typeof obj === 'number') {
      return <span className="json-number">{obj}</span>;
    }
    
    if (typeof obj === 'boolean') {
      return <span className="json-boolean">{obj.toString()}</span>;
    }
    
    if (Array.isArray(obj)) {
      if (obj.length === 0) {
        return <span className="json-array-empty">[]</span>;
      }
      return (
        <>
          <span className="json-bracket">[</span>
          <div className="json-indent" style={{ marginLeft: `${(indent + 1) * 20}px` }}>
            {obj.map((item, index) => (
              <div key={index} className="json-item">
                {formatJson(item, indent + 1)}
                {index < obj.length - 1 && <span className="json-comma">,</span>}
              </div>
            ))}
          </div>
          <span className="json-bracket" style={{ marginLeft: `${indent * 20}px` }}>]</span>
        </>
      );
    }
    
    if (typeof obj === 'object') {
      const keys = Object.keys(obj);
      if (keys.length === 0) {
        return <span className="json-object-empty">{'{}'}</span>;
      }
      return (
        <>
          <span className="json-bracket">{'{'}</span>
          <div className="json-indent" style={{ marginLeft: `${(indent + 1) * 20}px` }}>
            {keys.map((key, index) => {
              const value = obj[key];
              const isNull = value === null || value === undefined;
              return (
                <div key={key} className={`json-item ${isNull ? 'json-item-null' : ''}`}>
                  <span className="json-key">"{key}"</span>
                  <span className="json-colon">: </span>
                  {formatJson(value, indent + 1)}
                  {index < keys.length - 1 && <span className="json-comma">,</span>}
                </div>
              );
            })}
          </div>
          <span className="json-bracket" style={{ marginLeft: `${indent * 20}px` }}>{'}'}</span>
        </>
      );
    }
    
    return <span>{String(obj)}</span>;
  };

  return (
    <div className="json-viewer">
      {formatJson(data)}
    </div>
  );
};

export default JsonViewer;


import React from 'react';

const Progress = ({current, total}) => {
    return (
        <h2 className="progress">
            ~Question {current} of {total}~
        </h2>
    );
}

export default Progress;

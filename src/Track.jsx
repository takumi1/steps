import React from 'react';
import PropTypes from "prop-types";

const Track = (props) => {
    return (
        <div>
            <div className="trackContainer">
            <div>{props.date}</div> <div>{props.distance}</div><div className='cross' onClick={() => props.delete(props.date)}>✘</div>
            </div>
        </div>
    );
};
Track.propTypes = {
    date: PropTypes.string,
    distance: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    delete: PropTypes.func
}
export default Track;
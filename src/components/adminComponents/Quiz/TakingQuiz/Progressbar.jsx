import {motion, animate} from 'framer-motion';
import PropTypes from 'prop-types';
import { useEffect, useRef } from "react";

function Progressbar({value}) {
    const progressTextRef = useRef(null);
    useEffect(() => {
        const progressText = progressTextRef.current?.textContent;
        if(progressText != null) {
            animate(parseInt(progressText),value, {
                duration: 5,
                onUpdate : (cv) => {
                    progressTextRef.current.textContent =parseFloat(cv).toFixed(0);
                }
            });
        }
    }, [value]);
    return(
        <div className="progressbar-container mb-3">
            <div className="progressbar" >
                <motion.div 
                className="bar"
                animate={
                    value <= 100 ? { width: `${value}%` } :(value <= 500 ?  { width: `${value/5}%` }:{ width: `${value/10}%` })
                }
                transition={{
                    duration: 2
                }}
                />
            </div>
        </div>
    );
}
Progressbar.propTypes = {
    value: PropTypes.number.isRequired
}
export default Progressbar;
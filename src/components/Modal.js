import { motion } from "framer-motion";
import Backdrop from "./Backdrop";

export default function Modal({ children, handleClose }) {

    const dropIn = {
        hidden: {
            y: '-50vh',
            opacity: 0
        },
        visible: {
            y: '0',
            opacity: 1,
            transition: {
                duration: 0.1,
                type: "spring",
                damping: 100,
                stiffness: 500
            }
        },
        exit: {
            y: '-50vh',
            opacity: 0
        }
    }

    return(
        <Backdrop onClick={handleClose}>
            <motion.div 
                className="modal flex" 
                onClick={e => e.stopPropagation()}
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                {children}
                <button className="button inverted" onClick={handleClose}>Close</button>
            </motion.div>
        </Backdrop>
    )
}
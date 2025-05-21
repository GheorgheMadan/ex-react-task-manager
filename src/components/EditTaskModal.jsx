import { createPortal } from "react-dom";

export default function EditTaskModal({ show, onClose, title, confirmText, onConfirm, content }) {

    return createPortal(
        <>
            {show && <div className="container-modale">
                <div className="modale">
                    <h3>{title}</h3>
                    <div>
                        {content}
                    </div>
                    <button onClick={onConfirm} type="submit" >{confirmText}</button>
                    <button onClick={onClose}>Annulla</button>
                </div>
            </div>}
        </>, document.body
    )
}
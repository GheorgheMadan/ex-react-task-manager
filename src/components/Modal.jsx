import { createPortal } from "react-dom";

export default function Modal({ title, content, show, onClose, onConfirm, confirmText }) {

    // se non viene passato show allora non si aprirà nessuna modale 
    if (!show) return null

    return createPortal(
        <>
            {show && < div className="container-modale" >
                <div className="modale">
                    <h3>{title}</h3>
                    {content}
                    <div>
                        <button onClick={onConfirm}>{confirmText}</button>
                        <button onClick={onClose}>Annulla</button>
                    </div>
                </div>
            </div >}
        </>, document.body
    )
}



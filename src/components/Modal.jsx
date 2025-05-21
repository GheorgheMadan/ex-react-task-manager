import { createPortal } from "react-dom";

export default function Modal({ title, content, show, onClose, onConfirm, confirmText }) {

    return createPortal(
        <>
            {show && < div className="container-modale" >
                <div className="modale">
                    <h3>{title}</h3>
                    <p>{content}</p>
                    <div>
                        <button onClick={onConfirm}>{confirmText}</button>
                        <button onClick={onClose}>Annulla</button>
                    </div>
                </div>
            </div >}
        </>, document.body
    )
}



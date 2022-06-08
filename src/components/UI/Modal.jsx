import styles from "./Modal.module.css";
import ReactDOM from "react-dom";

function Backdrop(props) {
	return <div className={styles.backdrop}></div>;
}

function ModalOverlay(props) {
	return (
		<div className={styles.modal}>
			<div className={styles.content}>{props.children}</div>
		</div>
	);
}

const portalElement = document.getElementById("overlays");

function Modal(props) {
	return (
		<>
			{ReactDOM.createPortal(<Backdrop />, portalElement)}
			{ReactDOM.createPortal(
				<ModalOverlay>{props.children}</ModalOverlay>,
				portalElement
			)}
		</>
	);
}

export default Modal;

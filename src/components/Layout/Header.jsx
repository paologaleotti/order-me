import styles from "./Header.module.css";
import mealsImg from "../../assets/meals.jpg";

import HeaderCartButton from "./HeaderCartButton";

function Header() {
	return (
		<>
			<header className={styles.header}>
				<h1>OrderMe!</h1>
				<HeaderCartButton />
			</header>
			<div className={styles["main-image"]}>
				<img src={mealsImg} alt="Meals" />
			</div>
		</>
	);
}

export default Header;

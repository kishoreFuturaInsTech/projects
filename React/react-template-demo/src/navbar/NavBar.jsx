import React from "react";
import styles from "./navbar.module.css";

function NavBar() {
  return (
    <header className={styles.navheader}>
      <nav className={styles.navlist}>
        <h2 id={styles.logo}>Kotak</h2>
        <h2 id={`${styles["application-name"]}`}>
          Insurance Policy Surrender Application
        </h2>
        <ul>
          <li>Home</li>
          <li>Profile</li>
          {/* <li>
              <a href="#About">About</a>
            </li> */}
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;

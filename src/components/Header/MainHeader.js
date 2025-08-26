import Link from "next/link";
import Image from "next/image";
import logoImg from "../../assets/logo.png";
import MainHeaderBackground from "./MainHeaderBackground";

import classes from "./MainHeader.module.css";
import NavLink from "../UI/NavLink";

export default function MainHeader() {
  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link href={"/"} className={classes.logo}>
          <Image
            src={logoImg}
            width={100}
            height={100}
            alt="A plate with foods on it"
            className={classes.logoImage}
            priority
          />
          Next Level Food
        </Link>

        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href="/meals">Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href="/community">Food Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

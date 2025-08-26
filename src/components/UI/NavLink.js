"use client";
import Link from "next/link";
import classes from "./NavLink.module.css";
import { usePathname } from "next/navigation";

export default function NavLink({ className, href, children }) {
  const path = usePathname();
  console.log(path);

  return (
    <Link
      href={href}
      className={`${classes.link} ${className} ${path.startsWith(href) ? classes.active : ""}`}
    >
      {children}
    </Link>
  );
}

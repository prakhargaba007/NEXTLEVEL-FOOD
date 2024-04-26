"use client";
import Link from "next/link";
import Image from "next/image";

import logoImg from "@/assets/logo.png";
import classes from "./main-header.module.css";
import MainHeaderBackground from "./main-header-backbround";

import NavBar from "./nav-bar";

export default function MainHeader() {
  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link href="/" className={classes.logo}>
          <Image src={logoImg} priority alt="Logo" />
          NextLevel Food
        </Link>
        <NavBar />
      </header>
    </>
  );
}

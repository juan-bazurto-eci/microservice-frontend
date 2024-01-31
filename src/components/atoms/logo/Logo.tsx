import React from "react";
import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";
import { AppState, useSelector } from "@/store/Store";

interface Props {
  logo?: string;
  height?: number;
  width?: number;
  href?: string;
}

const Logo = ({
  logo = "/images/logos/logo.webp",
  height = 100,
  width = 300,
  href = "/",
}: Props) => {
  const customizer = useSelector((state: AppState) => state.customizer);
  const LinkStyled = styled(Link)(() => ({
    height: 90,
    width: customizer.isCollapse && !customizer.isSidebarHover ? "40px" : width,
    overflow: "hidden",
    display: "block",
    marginTop:
      customizer.isCollapse && !customizer.isSidebarHover ? "30px" : "0px",
  }));

  return (
    <LinkStyled href={href}>
      {customizer.isCollapse && !customizer.isSidebarHover ? (
        <Image src="/favicon.ico" alt="logo" height={38} width={38} priority />
      ) : (
        <Image src={logo} alt="logo" height={height} width={width} priority />
      )}
    </LinkStyled>
  );
};

export default Logo;

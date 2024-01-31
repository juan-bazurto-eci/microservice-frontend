import { uniqueId } from "lodash";
import {
  IconFileDescription,
  IconFileDots,
  IconAperture,
} from "@tabler/icons-react";

interface MenuitemsType {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: MenuitemsType[];
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
}

const Menuitems: MenuitemsType[] = [
  {
    navlabel: true,
    subheader: "Posts App",
  },

  {
    id: uniqueId(),
    title: "Inicio",
    icon: IconAperture,
    href: "/dashboard",
  },
  {
    navlabel: true,
    subheader: "Posts",
  },
  {
    id: uniqueId(),
    title: "Publicar",
    icon: IconFileDescription,
    href: "/posts/publicar",
  },
  {
    id: uniqueId(),
    title: "Actualizar",
    icon: IconFileDots,
    href: "/posts/actualizar",
  },
];

export default Menuitems;

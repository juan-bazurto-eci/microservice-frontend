interface LinkType {
  href: string;
  title: string;
}

const pageLinks: LinkType[] = [
  {
    href: "/dashboard",
    title: "Inicio",
  },
  {
    title: "Publicar",
    href: "/posts/publicar",
  },
  {
    title: "Actualizar",
    href: "/posts/actualizar",
  },
];

export { pageLinks };

export const publicRoutes = (localizedRoutes: { [key: string]: string }) => [
  {
    label: localizedRoutes["home"],
    url: "/",
  },
  {
    label: localizedRoutes["about-us"],
    url: "/about-us",
  },
];

export const privateRoutes = (localizedRoutes: { [key: string]: string }) => [
  {
    label: localizedRoutes["my-account"],
    url: "/my-account",
  },
];

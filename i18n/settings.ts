export const fallbackLng = "fa";
export const languages = [fallbackLng, "en"];
export const defaultNS = "common";
export const ns = ["common", "post"];

export function getOptions(lng = fallbackLng, defaultns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    // preload: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultns,
    defaultNS: defaultns,
    ns,
  };
}

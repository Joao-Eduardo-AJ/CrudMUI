import { Texts as Texts_en_US } from "./tools.texts-en_US";
import { Texts as Texts_pt_BR } from "./tools.texts-pt_BR";

type TextsType = typeof Texts_pt_BR;

const map = new Map<string, TextsType>();

map.set("en", Texts_en_US);
map.set("pt", Texts_pt_BR);

export const TextsProvider = {
  get(lang = navigator.language) {
    return map.get(lang) ?? map.get(lang.substring(0, 2)) ?? Texts_pt_BR;
  },
};

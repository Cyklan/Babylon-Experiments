import { BuilderTypes } from "./BuilderTypes";
import ButtonBuilder from "./ButtonBuilder";

export default class UIFactory {
    static createElement(type: BuilderTypes, name: string) {
        switch (type) {
            case BuilderTypes.Button:
                return new ButtonBuilder(name)
        }
    }
}
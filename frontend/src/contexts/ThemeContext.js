import { createContext, useReducer } from "react";

export const ThemeContext = createContext();

export const styles = {SET_DARK: "SET_DARK", SET_LIGHT: "SET_LIGHT", SET_COLORFUL: "SET_COLORFUL", TRY_LIGHT: "trylight", TRY_DARK: "trydark", TRY_COLORFUL: "trycolorful"};


const ThemeContextProvider = ({children}) => {

    const setColors = style => {
        var r = document.querySelector(':root');

        switch (style) {
            case "dark":
                r.style.setProperty('--navGray', '#404040');
                r.style.setProperty('--navFontHover', 'gainsboro');
                r.style.setProperty('--contentGray', '#666666');
                r.style.setProperty('--bodyGray', '#333333');
                r.style.setProperty('--fontColor', 'aliceblue');
                r.style.setProperty('--ButtonBg', 'lightblue');
                r.style.setProperty('--ButtonBgHover', 'blue');
                break;

            case "light":
                r.style.setProperty('--navGray', '#E9DAC1');
                r.style.setProperty('--navFontHover', '#F4EAF4');
                r.style.setProperty('--contentGray', '#9ED2C6');
                r.style.setProperty('--bodyGray', '#54BAB9');
                r.style.setProperty('--fontColor', '#EFEAF4');
                r.style.setProperty('--ButtonBg', '#8AFFB2');
                r.style.setProperty('--ButtonBgHover', '#9CFF8A');
                break;

            case "colorful":
                r.style.setProperty('--navGray', '#6b5b95');
                r.style.setProperty('--navFontHover', '#ff7b25');
                r.style.setProperty('--contentGray', '#d64161');
                r.style.setProperty('--bodyGray', '#82b74b');
                r.style.setProperty('--fontColor', '#feb236');
                r.style.setProperty('--ButtonBg', '#03fc98');
                r.style.setProperty('--ButtonBgHover', '#a903fc');
                break;

            default:
                break;
        }
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case styles.SET_DARK || "dark":
                setColors("dark");
                return {theme: "dark"};
            case styles.SET_LIGHT || "light":
                setColors("light");
                return {theme: "light"};
            case styles.SET_COLORFUL || "colorful":
                setColors("colorful");
                return {theme: "colorful"};
            case styles.TRY_DARK:
                setColors("dark");
                return state;
            case styles.TRY_LIGHT:
                setColors("light");
                return state;
            case styles.TRY_COLORFUL:
                setColors("colorful");
                return state;
            default:
                return state;
        }
    }

    const[state, dispatch] = useReducer(reducer, {theme: "dark"});


    return ( 
    <>
        <ThemeContext.Provider value={{state, dispatch}}>
            {children}
        </ThemeContext.Provider>
    </> );
}
 
export default ThemeContextProvider;
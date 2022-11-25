import {FunctionComponent, useState} from "react";
import Header from '../Header/Header';
import Menu from "../Menu/Menu";
import {MenuContext} from "../../context/MenuContext";

const Layout: FunctionComponent = () => {
    const [outer, setOuter] = useState(false);
    const [inner, setInner] = useState(false);
    const [category, setCategory] = useState('');
    return (
        <>
            <MenuContext.Provider value={{outer, setOuter, inner, setInner, category, setCategory}}>
                <article className={'home'}>
                    <Header />
                    <Menu />
                </article>
            </MenuContext.Provider>
        </>
    )
}

export default Layout;

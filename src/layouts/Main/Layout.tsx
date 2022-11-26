import {FunctionComponent, useState} from "react";
import Header from '../Header/Header';
import Menu from "../Menu/Menu";
import {MenuContext} from "../../context/MenuContext";
import Collection from '../../pages/collection/Collection';

const Layout: FunctionComponent = () => {
    const [outer, setOuter] = useState(false);
    const [inner, setInner] = useState(false);
    return (
        <>
            <MenuContext.Provider value={{outer, setOuter, inner, setInner}}>
                <article className={'home'}>
                    <Header />
                    <Menu />
                    <Collection />
                </article>
            </MenuContext.Provider>
        </>
    )
}

export default Layout;

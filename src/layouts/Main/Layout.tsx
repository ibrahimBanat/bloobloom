import {FunctionComponent, useState} from "react";
import Header from '../Header/Header';
import Menu from "../Menu/Menu";
import {MenuContext} from "../../context/MenuContext";
import Collection from '../../pages/collection/Collection';

const Layout: FunctionComponent = () => {

    return (
        <>
                <article className={'home'}>
                    <Collection />
                </article>
        </>
    )
}

export default Layout;

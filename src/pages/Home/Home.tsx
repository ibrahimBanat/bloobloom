import {FunctionComponent} from "react";
import Header from '../../layouts/Header/Header';
import Menu from "../../layouts/Menu/Menu";

const Home: FunctionComponent = () => {
    return (
        <>
            <article className={'home'}>
                <Header />
            </article>
        </>
    )
}

export default Home;

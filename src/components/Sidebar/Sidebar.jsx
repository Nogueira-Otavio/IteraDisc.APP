import { Children } from "react";
import style from "./Sidebar.module.css";
import Logo from '../../assets/IteraDiscLogo.png';
import { SidebarItem } from "../SidebarItem/SidebarItem";
import { MdFormatListBulleted, MdGroup } from "react-icons/md";
import { MdChat } from "react-icons/md";
import { Link } from "react-router-dom";

export function Sidebar({children})
{
    return (
        <div>
            <div className={style.sidebar_conteudo}>
                <div className={style.sidebar_header}>
                    <Link to="/"><img src={Logo} alt="Logo-IteraDisc" className={style.logo}/></Link>

                    <hr className={style.linha}/>
                </div>

                <div className={style.sidebar_corpo}>
                    <SidebarItem texto="Usuários" link="/usuarios" logo={<MdGroup />}></SidebarItem>
                    <SidebarItem texto="ChatBot" link="/chatbot" logo={<MdChat />}></SidebarItem>
                    <SidebarItem texto="Histórico de Vendas" link="/historico" logo={<MdFormatListBulleted />}></SidebarItem>
                </div>
            </div>
            <div className={style.pagina_conteudo}>
                {children}
            </div>
        </div>
    )
}
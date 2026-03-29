import { Link, useNavigate } from 'react-router-dom';
import style from './Topbar.module.css';
import { MdAddShoppingCart, MdLogout } from 'react-icons/md';
import AuthService from '../../services/IteraDiscService/IteraDiscServiceAuth';

export function Topbar({children}) {
    const navigate = useNavigate();

    function handleLogout() {
        AuthService.encerrarSessao();
        navigate('/login');
    }

    return (
        <div>
            <div className={style.topbar_conteudo}>
                <Link to='/carrinho' className={style.botao_carrinho}>
                    <MdAddShoppingCart/>
                </Link>
                <div className={style.separador}></div>
                <button onClick={handleLogout} className={style.botao_deslogar}>
                    <MdLogout/>
                </button>
            </div>
            <div className={style.pagina_conteudo}>
                {children}
            </div>
        </div>
    )
}
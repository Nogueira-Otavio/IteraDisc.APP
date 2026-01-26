import { Sidebar } from '../../../components/Sidebar/Sidebar';
import { Topbar } from '../../../components/Topbar/Topbar';
import style from './NovoUsuario.module.css';

export function NovoUsuario() {
    return (
        <Sidebar>
            <Topbar>
                <div className={style.pagina_conteudo}>
                    <h3>Novo Usuário</h3>
                </div>
            </Topbar>
        </Sidebar>
    )
}
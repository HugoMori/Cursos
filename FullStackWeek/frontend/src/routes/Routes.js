  
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import cadastrarInvestimentos from '../pages/CadastrarInvestimentos';
import ListarInvestimentos from '../pages/ListarInvestimentos';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={ListarInvestimentos}></Route>
                <Route exact path="/cadastrar-investimento" component={cadastrarInvestimentos}></Route>
                <Route exact path="/listar-investimentos" component={ListarInvestimentos}></Route>
            </Switch>
        </BrowserRouter>
    );
}
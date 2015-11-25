package service.damas.comandos;

import service.util.Comando;
import service.util.Informacao;
import service.util.Game;

/**
 *
 * @author gilmario
 */
public class ProcessaComandoSelect implements ProcessaComando {

    @Override
    public Informacao processarComando(Game game, Comando comando) {
        game.comandoSelect();
        Informacao info = new Informacao(Informacao.SELECT, game.getJsonObject());
        return info;
    }

}

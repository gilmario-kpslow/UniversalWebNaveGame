package service.damas.comandos;

import service.util.Comando;
import service.util.Informacao;
import service.util.Game;

/**
 *
 * @author gilmario
 */
public interface ProcessaComando {

    public Informacao processarComando(Game game, Comando comando);
}

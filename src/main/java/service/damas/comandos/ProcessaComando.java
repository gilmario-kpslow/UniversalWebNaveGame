package service.damas.comandos;

import service.damas.Comando;
import service.damas.Informacao;
import service.damas.QdamasGame;

/**
 *
 * @author gilmario
 */
public interface ProcessaComando {

    public Informacao processarComando(QdamasGame game, Comando comando);
}

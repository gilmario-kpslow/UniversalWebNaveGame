package service.damas.comandos;

import service.damas.Comando;
import service.damas.Informacao;
import service.damas.QdamasGame;

/**
 *
 * @author gilmario
 */
public class ProcessaComandoStart implements ProcessaComando {

    @Override
    public Informacao processarComando(QdamasGame game, Comando comando) {
        game.iniciarJogo();
        Informacao info = new Informacao(Informacao.INICIAR, game.getJsonObject());
        return info;
    }

}

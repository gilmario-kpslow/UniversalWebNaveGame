package service.damas.comandos;

import service.damas.Comando;
import service.damas.Informacao;
import service.damas.QdamasGame;

/**
 *
 * @author gilmario
 */
public class ProcessaComandoA implements ProcessaComando {

    @Override
    public Informacao processarComando(QdamasGame game, Comando comando) {
        game.acaoBotaoA(game.getJogador(comando.getJogador()));
        Informacao info = new Informacao(Informacao.MOVE, game.getJsonObject());
        return info;
    }

}

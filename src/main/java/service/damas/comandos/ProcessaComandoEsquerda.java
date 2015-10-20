package service.damas.comandos;

import service.damas.Informacao;
import service.damas.QdamasGame;

/**
 *
 * @author gilmario
 */
public class ProcessaComandoEsquerda implements ProcessaComando {

    @Override
    public Informacao processarComando(QdamasGame game) {
        game.moveDireita();
        Informacao info = new Informacao(Informacao.INICIAR, game.getJsonObject());
        info.setTipo(Informacao.INICIAR);
        return info;
    }

}

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service.damas.comandos;

import service.damas.Informacao;
import service.damas.ProcessaComando;
import service.damas.QdamasGame;

/**
 *
 * @author gilmario
 */
public class ProcessaComandoStart implements ProcessaComando {

    @Override
    public Informacao processarComando(QdamasGame game) {
        game.iniciarJogo();
        Informacao info = new Informacao(Informacao.INICIAR, game.getJsonObject());
        info.setTipo(Informacao.INICIAR);
        return info;
    }

}

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service.damas.comandos;

import service.damas.Comando;
import service.damas.Informacao;
import service.damas.QdamasGame;

/**
 *
 * @author gilmario
 */
public class ProcessaComandoSubir implements ProcessaComando {

    @Override
    public Informacao processarComando(QdamasGame game, Comando comando) {
        game.moveSubir(game.getJogador(comando.getJogador()));
        Informacao info = new Informacao(Informacao.MOVE, game.getJsonObject());
        return info;
    }

}

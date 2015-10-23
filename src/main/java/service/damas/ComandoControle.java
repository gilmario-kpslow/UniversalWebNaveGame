/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service.damas;

import service.damas.comandos.ProcessaComando;
import service.damas.comandos.ProcessaComandoA;
import service.damas.comandos.ProcessaComandoB;
import service.damas.comandos.ProcessaComandoDescer;
import service.damas.comandos.ProcessaComandoDireita;
import service.damas.comandos.ProcessaComandoEsquerda;
import service.damas.comandos.ProcessaComandoStart;
import service.damas.comandos.ProcessaComandoSubir;

/**
 *
 * @author gilmario
 */
public enum ComandoControle {

    COMANDO_ESQUERDA("esquerda", new ProcessaComandoEsquerda()),
    COMANDO_DIREITA("direita", new ProcessaComandoDireita()),
    COMANDO_SUBIR("subir", new ProcessaComandoSubir()),
    COMANDO_DECER("descer", new ProcessaComandoDescer()),
    ACAO_01("acao01", new ProcessaComandoA()),
    ACAO_02("acao02", new ProcessaComandoB()),
    BOTAO_L("botaol", null),
    BOTAO_R("botaor", null),
    SELECT("select", null),
    START("start", new ProcessaComandoStart());

    private final String descricao;
    private final ProcessaComando processa;

    private ComandoControle(String desc, ProcessaComando p) {
        this.descricao = desc;
        this.processa = p;
    }

    public static ComandoControle restorePorNome(String nome) {
        for (ComandoControle c : ComandoControle.values()) {
            if (c.descricao.equals(nome)) {
                return c;
            }
        }
        return null;
    }

    @Override
    public String toString() {
        return descricao;
    }

    public String geraResposta(QdamasGame game, Comando comando) {
        return processa.processarComando(game, comando).toJson();
    }

}

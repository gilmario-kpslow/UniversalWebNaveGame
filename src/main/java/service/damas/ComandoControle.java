/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service.damas;

import service.damas.comandos.ProcessaComandoStart;

/**
 *
 * @author gilmario
 */
public enum ComandoControle {

    COMANDO_ESQUERDA("esquerda", null),
    COMANDO_DIREITA("direita", null),
    COMANDO_SUBIR("subir", null),
    COMANDO_DECER("descer", null),
    ACAO_01("acao01", null),
    ACAO_02("acao02", null),
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

    public String geraResposta(QdamasGame game) {
        return processa.processarComando(game).toJson();
    }

}

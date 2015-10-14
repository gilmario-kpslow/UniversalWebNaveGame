/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service.damas;

/**
 *
 * @author gilmario
 */
public enum ComandoControle {

    COMANDO_ESQUERDA("esquerda"),
    COMANDO_DIREITA("direita"),
    COMANDO_SUBIR("subir"),
    COMANDO_DECER("descer"),
    ACAO_01("acao01"),
    ACAO_02("acao02"),
    BOTAO_L("botaol"),
    BOTAO_R("botaor"),
    SELECT("select"),
    START("start");

    private String descricao;

    private ComandoControle(String desc) {
        this.descricao = desc;
    }

    @Override
    public String toString() {
        return descricao;
    }

}

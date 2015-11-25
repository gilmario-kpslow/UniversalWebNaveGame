/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service.nave;

import java.util.Objects;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import service.util.Animado;
import service.util.JogadorInterface;

/**
 *
 * @author gilmario
 */
public class Jogador implements JogadorInterface, Animado {

    private Nave nave;
    private String nome;
    private long pontuacao;
    private int vidas;

    public Jogador() {
    }

    public Jogador(String nome, Nave nave) {
        this.nave = nave;
        this.nome = nome;
    }

    @Override
    public JsonObject getJsonObject() {
        JsonObjectBuilder buider = Json.createObjectBuilder();
        if (nave != null) {
            buider.add("nave", nave.getJsonObject());
        }
        buider.add("pontuacao", pontuacao);
        buider.add("vidas", vidas);
        buider.add("nome", nome);
        return buider.build();
    }

    @Override
    public void restoreFromJson(JsonObject object) {

    }

    public Nave getNave() {
        return nave;
    }

    @Override
    public String getNome() {
        return nome;
    }

    @Override
    public void setNome(String nome) {
        this.nome = nome;
    }

    @Override
    public void atualizar() {
        nave.atualizar();
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 59 * hash + Objects.hashCode(this.nome);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Jogador other = (Jogador) obj;
        return Objects.equals(this.nome, other.nome);
    }

}

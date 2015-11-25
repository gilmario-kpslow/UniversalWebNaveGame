package service.nave;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import service.damas.Tela;
import service.util.Animacao;
import service.util.Fundo;
import service.util.Game;
import service.util.JogadorInterface;
import service.util.Listener;

/**
 *
 * @author gilmario
 */
public class NaveGame extends Game {

    private List<Jogador> jogadores;
    private Animacao animacao;
    private ScheduledExecutorService loop;
    private boolean iniciado;
    private Tela tela;
    private Fundo fundoEspaco;
    private Fundo fundoEstrela;
    private Fundo fundoNuvens;

    public NaveGame() {
        jogadores = new ArrayList<>();
        animacao = new Animacao();
        tela = new Tela();
        fundoEspaco = new Fundo(Resources.fundoEspaco, 5);
        fundoEstrela = new Fundo(Resources.fundoEstrelas, 7);
        fundoNuvens = new Fundo(Resources.fundoNuvens, 10);
        animacao.adicionaAnimacao(fundoEspaco);
        animacao.adicionaAnimacao(fundoEstrela);
        animacao.adicionaAnimacao(fundoNuvens);
        loop = Executors.newSingleThreadScheduledExecutor();
    }

    public void adicionaProcesasamento(Listener listener) {
        animacao.adicionaProcessamento(listener);
    }

    @Override
    public JsonObject getJsonObject() {
        JsonObjectBuilder buider = Json.createObjectBuilder();
        for (int i = 0; i < jogadores.size(); i++) {
            buider.add("jogador" + i, jogadores.get(i).getJsonObject());
        }
        buider.add("tela", tela.getJsonObject());
        buider.add("fundoEspaco", fundoEspaco.getJsonObject());
        buider.add("fundoEstrelas", fundoEstrela.getJsonObject());
        buider.add("fundoNuvens", fundoNuvens.getJsonObject());
        return buider.build();
    }

    @Override
    public void restoreFromJson(JsonObject object) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    public void remJogador(Jogador j) {

    }

    public void setJogador(Jogador jogador) {
        jogadores.add(jogador);
        animacao.adicionaAnimacao(jogador);
    }

    public void iniciar() {
        if (!iniciado) {
            int x = 150;
            int y = 750;
            for (Jogador j : jogadores) {
                j.getNave().setX(x);
                j.getNave().setY(y);
                x += 50;
            }
            loop.scheduleWithFixedDelay(animacao, 0, 1000, TimeUnit.MILLISECONDS);
            iniciado = true;
        } else {
            if (animacao.isLigado()) {
                animacao.desligar();
            } else {
                animacao.ligar();
            }
        }
    }

    @Override
    public JogadorInterface getJogador(String nome) {
        Jogador retorno = null;
        for (Jogador j : jogadores) {
            if (j.getNome().equals(nome)) {
                return j;
            }
        }
        return retorno;
    }

    @Override
    public void acaoBotaoA(JogadorInterface jogador) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void acaoBotaoB(JogadorInterface jogador) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void moveDescer(JogadorInterface jogador) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void moveDireita(JogadorInterface jogador) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void moveEsquerda(JogadorInterface jogador) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void comandoStart() {
        iniciar();
    }

    @Override
    public void moveSubir(JogadorInterface jogador) {
        ((Jogador) jogador).getNave().setSubir(true);
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void comandoSelect() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

}

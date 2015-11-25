package service.util;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author gilmario
 */
public class Animacao implements Runnable {

    private List<Animado> animacoes;
    private List<Animado> animacoesExcluidas;
    private List<Listener> processamentos;
    private List<Listener> processamentosExcluidos;
    private boolean ligado;

    public Animacao() {
        animacoes = new ArrayList<>();
        animacoesExcluidas = new ArrayList<>();
        processamentos = new ArrayList<>();
        processamentosExcluidos = new ArrayList<>();
        ligado = true;
    }

    public void adicionaAnimacao(Animado animado) {
        animacoes.add(animado);
    }

    public void removeAnimacao(Animado animado) {
        animacoesExcluidas.add(animado);
    }

    public void adicionaProcessamento(Listener listener) {
        processamentos.add(listener);
    }

    @Override
    public void run() {
        while (true) {
            if (ligado) {
                for (Animado a : animacoes) {
                    a.atualizar();
                }
                for (Listener l : processamentos) {
                    l.executa();
                }
                processarExclusoes();
            } else {
                return;
            }
        }
    }

    public void ligar() {
        ligado = true;
    }

    public void desligar() {
        ligado = false;
    }

    private void processarExclusoes() {
        animacoes.removeAll(animacoesExcluidas);
        animacoesExcluidas.clear();
        processamentos.removeAll(processamentosExcluidos);
        processamentosExcluidos.clear();
    }

    public boolean isLigado() {
        return ligado;
    }

}

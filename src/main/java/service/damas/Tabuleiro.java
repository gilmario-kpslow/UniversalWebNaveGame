package service.damas;

/**
 *
 * @author gilmario
 */
public class Tabuleiro {

    private final Integer[][] casas = new Integer[7][7];

    private String corPretas;
    private String corBrancas;

    public String getCorPretas() {
        return corPretas;
    }

    public void setCorPretas(String corPretas) {
        this.corPretas = corPretas;
    }

    public String getCorBrancas() {
        return corBrancas;
    }

    public void setCorBrancas(String corBrancas) {
        this.corBrancas = corBrancas;
    }

}

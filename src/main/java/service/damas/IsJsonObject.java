package service.damas;

import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;

/**
 *
 * @author gilmario
 */
public interface IsJsonObject {

    public JsonObject getJsonObject();

    public void restoreFromJson(JsonObject object);

}

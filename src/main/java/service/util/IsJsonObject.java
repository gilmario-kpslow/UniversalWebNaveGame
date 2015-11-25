package service.util;

import javax.json.JsonObject;

/**
 *
 * @author gilmario
 */
public interface IsJsonObject {

    public JsonObject getJsonObject();

    public void restoreFromJson(JsonObject object);

}

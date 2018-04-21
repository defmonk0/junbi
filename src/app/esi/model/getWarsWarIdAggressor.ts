/**
 * EVE Swagger Interface
 * An OpenAPI for EVE Online
 *
 * OpenAPI spec version: 0.8.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


/**
 * The aggressor corporation or alliance that declared this war, only contains either corporation_id or alliance_id
 */
export interface GetWarsWarIdAggressor {
    /**
     * Corporation ID if and only if the aggressor is a corporation
     */
    corporationId?: number;
    /**
     * Alliance ID if and only if the aggressor is an alliance
     */
    allianceId?: number;
    /**
     * The number of ships the aggressor has killed
     */
    shipsKilled: number;
    /**
     * ISK value of ships the aggressor has destroyed
     */
    iskDestroyed: number;
}

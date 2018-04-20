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
import { GetWarsWarIdAggressor } from './getWarsWarIdAggressor';
import { GetWarsWarIdAlly } from './getWarsWarIdAlly';
import { GetWarsWarIdDefender } from './getWarsWarIdDefender';


/**
 * 200 ok object
 */
export interface GetWarsWarIdOk { 
    /**
     * ID of the specified war
     */
    id: number;
    /**
     * Time that the war was declared
     */
    declared: Date;
    /**
     * Time when the war started and both sides could shoot each other
     */
    started?: Date;
    /**
     * Time the war was retracted but both sides could still shoot each other
     */
    retracted?: Date;
    /**
     * Time the war ended and shooting was no longer allowed
     */
    finished?: Date;
    /**
     * Was the war declared mutual by both parties
     */
    mutual: boolean;
    /**
     * Is the war currently open for allies or not
     */
    openForAllies: boolean;
    aggressor: GetWarsWarIdAggressor;
    defender: GetWarsWarIdDefender;
    /**
     * allied corporations or alliances, each object contains either corporation_id or alliance_id
     */
    allies?: Array<GetWarsWarIdAlly>;
}

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
 * 200 ok object
 */
export interface GetCharactersCharacterIdAttributesOk {
    /**
     * charisma integer
     */
    charisma: number;
    /**
     * intelligence integer
     */
    intelligence: number;
    /**
     * memory integer
     */
    memory: number;
    /**
     * perception integer
     */
    perception: number;
    /**
     * willpower integer
     */
    willpower: number;
    /**
     * Number of available bonus character neural remaps
     */
    bonusRemaps?: number;
    /**
     * Datetime of last neural remap, including usage of bonus remaps
     */
    lastRemapDate?: Date;
    /**
     * Neural remapping cooldown after a character uses remap accrued over time
     */
    accruedRemapCooldownDate?: Date;
}

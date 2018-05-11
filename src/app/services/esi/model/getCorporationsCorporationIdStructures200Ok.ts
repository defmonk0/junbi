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
import { GetCorporationsCorporationIdStructuresService } from './getCorporationsCorporationIdStructuresService';


/**
 * 200 ok object
 */
export interface GetCorporationsCorporationIdStructures200Ok {
    /**
     * The Item ID of the structure
     */
    structureId: number;
    /**
     * The type id of the structure
     */
    typeId: number;
    /**
     * ID of the corporation that owns the structure
     */
    corporationId: number;
    /**
     * The solar system the structure is in
     */
    systemId: number;
    /**
     * The id of the ACL profile for this citadel
     */
    profileId: number;
    /**
     * Date on which the structure will run out of fuel
     */
    fuelExpires?: Date;
    /**
     * Contains a list of service upgrades, and their state
     */
    services?: Array<GetCorporationsCorporationIdStructuresService>;
    /**
     * Date at which the structure entered it's current state
     */
    stateTimerStart?: Date;
    /**
     * Date at which the structure will move to it's next state
     */
    stateTimerEnd?: Date;
    /**
     * Date at which the structure will unanchor
     */
    unanchorsAt?: Date;
    /**
     * state string
     */
    state: GetCorporationsCorporationIdStructures200Ok.StateEnum;
    /**
     * The day of the week when the structure exits its final reinforcement period and becomes vulnerable to attack against its hull. Monday is 0 and Sunday is 6.
     */
    reinforceWeekday: number;
    /**
     * The hour of day that determines the four hour window when the structure will randomly exit its reinforcement periods and become vulnerable to attack against its armor and/or hull. The structure will become vulnerable at a random time that is +/- 2 hours centered on the value of this property.
     */
    reinforceHour: number;
    /**
     * The requested change to reinforce_weekday that will take effect at the time shown by next_reinforce_apply.
     */
    nextReinforceWeekday?: number;
    /**
     * The requested change to reinforce_hour that will take effect at the time shown by next_reinforce_apply.
     */
    nextReinforceHour?: number;
    /**
     * The date and time when the structure's newly requested reinforcement times (e.g. next_reinforce_hour and next_reinforce_day) will take effect.
     */
    nextReinforceApply?: Date;
}
export namespace GetCorporationsCorporationIdStructures200Ok {
    export type StateEnum = 'anchor_vulnerable' | 'anchoring' | 'armor_reinforce' | 'armor_vulnerable' | 'fitting_invulnerable' | 'hull_reinforce' | 'hull_vulnerable' | 'online_deprecated' | 'onlining_vulnerable' | 'shield_vulnerable' | 'unanchored' | 'unknown';
    export const StateEnum = {
        AnchorVulnerable: 'anchor_vulnerable' as StateEnum,
        Anchoring: 'anchoring' as StateEnum,
        ArmorReinforce: 'armor_reinforce' as StateEnum,
        ArmorVulnerable: 'armor_vulnerable' as StateEnum,
        FittingInvulnerable: 'fitting_invulnerable' as StateEnum,
        HullReinforce: 'hull_reinforce' as StateEnum,
        HullVulnerable: 'hull_vulnerable' as StateEnum,
        OnlineDeprecated: 'online_deprecated' as StateEnum,
        OnliningVulnerable: 'onlining_vulnerable' as StateEnum,
        ShieldVulnerable: 'shield_vulnerable' as StateEnum,
        Unanchored: 'unanchored' as StateEnum,
        Unknown: 'unknown' as StateEnum
    }
}

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
export interface GetCharactersCharacterIdSkillqueue200Ok {
    /**
     * skill_id integer
     */
    skillId: number;
    /**
     * finish_date string
     */
    finishDate?: Date;
    /**
     * start_date string
     */
    startDate?: Date;
    /**
     * finished_level integer
     */
    finishedLevel: number;
    /**
     * queue_position integer
     */
    queuePosition: number;
    /**
     * training_start_sp integer
     */
    trainingStartSp?: number;
    /**
     * level_end_sp integer
     */
    levelEndSp?: number;
    /**
     * Amount of SP that was in the skill when it started training it's current level. Used to calculate % of current level complete.
     */
    levelStartSp?: number;
}

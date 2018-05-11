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
import { GetFwLeaderboardsCorporationsActiveTotal } from './getFwLeaderboardsCorporationsActiveTotal';
import { GetFwLeaderboardsCorporationsLastWeek } from './getFwLeaderboardsCorporationsLastWeek';
import { GetFwLeaderboardsCorporationsYesterday } from './getFwLeaderboardsCorporationsYesterday';


/**
 * Top 10 rankings of corporations by number of kills from yesterday, last week and in total.
 */
export interface GetFwLeaderboardsCorporationsKills {
    /**
     * Top 10 ranking of corporations by kills in the past day
     */
    yesterday: Array<GetFwLeaderboardsCorporationsYesterday>;
    /**
     * Top 10 ranking of corporations by kills in the past week
     */
    lastWeek: Array<GetFwLeaderboardsCorporationsLastWeek>;
    /**
     * Top 10 ranking of corporations active in faction warfare by total kills. A corporation is considered \"active\" if they have participated in faction warfare in the past 14 days.
     */
    activeTotal: Array<GetFwLeaderboardsCorporationsActiveTotal>;
}

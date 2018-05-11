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
import { GetUniverseSystemsSystemIdPlanet } from './getUniverseSystemsSystemIdPlanet';
import { GetUniverseSystemsSystemIdPosition } from './getUniverseSystemsSystemIdPosition';


/**
 * 200 ok object
 */
export interface GetUniverseSystemsSystemIdOk {
    /**
     * star_id integer
     */
    starId: number;
    /**
     * system_id integer
     */
    systemId: number;
    /**
     * name string
     */
    name: string;
    position: GetUniverseSystemsSystemIdPosition;
    /**
     * security_status number
     */
    securityStatus: number;
    /**
     * security_class string
     */
    securityClass?: string;
    /**
     * The constellation this solar system is in
     */
    constellationId: number;
    /**
     * planets array
     */
    planets: Array<GetUniverseSystemsSystemIdPlanet>;
    /**
     * stargates array
     */
    stargates?: Array<number>;
    /**
     * stations array
     */
    stations?: Array<number>;
}

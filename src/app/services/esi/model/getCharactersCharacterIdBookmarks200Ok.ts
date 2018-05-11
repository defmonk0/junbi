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
import { GetCharactersCharacterIdBookmarksCoordinates } from './getCharactersCharacterIdBookmarksCoordinates';
import { GetCharactersCharacterIdBookmarksItem } from './getCharactersCharacterIdBookmarksItem';


/**
 * 200 ok object
 */
export interface GetCharactersCharacterIdBookmarks200Ok {
    /**
     * bookmark_id integer
     */
    bookmarkId: number;
    /**
     * folder_id integer
     */
    folderId?: number;
    /**
     * created string
     */
    created: Date;
    /**
     * label string
     */
    label: string;
    /**
     * notes string
     */
    notes: string;
    /**
     * location_id integer
     */
    locationId: number;
    /**
     * creator_id integer
     */
    creatorId: number;
    item?: GetCharactersCharacterIdBookmarksItem;
    coordinates?: GetCharactersCharacterIdBookmarksCoordinates;
}

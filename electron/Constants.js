const ESI_DATASOURCE = "tranquility";
const ESI_VERIFY_TOKEN_URL = "https://esi.tech.ccp.is/verify";
const GITHUB_HOME_URL = "https://github.com/defmonk0/junbi";
const GITHUB_ISSUE_URL = "https://github.com/defmonk0/junbi/issues";
const SSO_AUTH_URL = "https://login.eveonline.com/oauth/authorize/";
const SSO_CREATE_URL = "https://developers.eveonline.com/applications/create";
const SSO_DEFAULT_CLIENT_ID = "87f5e6722d904820acb88ee3970c4149";
const SSO_REDIRECT_URI = "https://localhost/manage/";
const SSO_TOKEN_URL = "https://login.eveonline.com/oauth/token";
const USER_AGENT = "Junbi/1.0.0 <" + GITHUB_HOME_URL + ">";

const SCOPES = [
	"esi-location.read_location.v1",
	"esi-location.read_online.v1",
	"esi-location.read_ship_type.v1",
	"esi-skills.read_skillqueue.v1",
	"esi-skills.read_skills.v1",
	"esi-wallet.read_character_wallet.v1",
].join(" ");

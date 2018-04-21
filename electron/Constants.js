const ESI_DATASOURCE = "tranquility";
const ESI_VERIFY_TOKEN_URL = "https://esi.tech.ccp.is/verify/";
const GITHUB_HOME_URL = "https://github.com/defmonk0/junbi/";
const GITHUB_ISSUE_URL = "https://github.com/defmonk0/junbi/issues/";
const SSO_AUTH_URL = "https://login.eveonline.com/oauth/authorize/";
const SSO_CREATE_URL = "https://developers.eveonline.com/applications/create/";
const SSO_DEFAULT_CLIENT_ID = "87f5e6722d904820acb88ee3970c4149";
const SSO_REDIRECT_URL = "https://localhost/manage/";
const SSO_TOKEN_CONTENT_TYPE = "application/x-www-form-urlencoded";
const SSO_TOKEN_URL = "https://login.eveonline.com/oauth/token/";
const USER_AGENT = "Junbi/1.0.0 <" + GITHUB_HOME_URL + ">";

const SCOPES = [
	"esi-location.read_location.v1",
	"esi-location.read_online.v1",
	"esi-location.read_ship_type.v1",
	"esi-skills.read_skillqueue.v1",
	"esi-skills.read_skills.v1",
	"esi-wallet.read_character_wallet.v1",
].join(" ");

module.exports.ESI_DATASOURCE = ESI_DATASOURCE;
module.exports.ESI_VERIFY_TOKEN_URL = ESI_VERIFY_TOKEN_URL;
module.exports.GITHUB_HOME_URL = GITHUB_HOME_URL;
module.exports.GITHUB_ISSUE_URL = GITHUB_ISSUE_URL;
module.exports.SCOPES = SCOPES;
module.exports.SSO_AUTH_URL = SSO_AUTH_URL;
module.exports.SSO_CREATE_URL = SSO_CREATE_URL;
module.exports.SSO_DEFAULT_CLIENT_ID = SSO_DEFAULT_CLIENT_ID;
module.exports.SSO_REDIRECT_URL = SSO_REDIRECT_URL;
module.exports.SSO_TOKEN_CONTENT_TYPE = SSO_TOKEN_CONTENT_TYPE;
module.exports.SSO_TOKEN_URL = SSO_TOKEN_URL;
module.exports.USER_AGENT = USER_AGENT;

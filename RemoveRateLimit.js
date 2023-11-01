/**
 * @summary Use this command line file/function to add a new key to the rate limit whitelist
 * @param ListType 'appid' or 'instanceid'
 * @param SourceID appid or instanceid value (key)
 * @param RateLimit Integer; default 0
 * @param LogLimit Integer; default 30000
 * @returns Will warn if key already exists in list. Will output file name that was changed if successful
 */
const rateFunctions = require('./RateLimitFileFactory');

function PrintHelp()
{
	console.log("Expected: ListType SourceID RateLimit\n");
	console.log("\tListType - appid or instanceid \n");
	console.log("\tSourceID - appid or instanceid value based on ListType\n");
	console.log("\tRateLimit - rate limit to remove instanceID from (Instance ID only)\n");
}

const base_parameter_count = 3;
const param_listType = 2;
const param_sourceID = 3;
const param_rateLimit = 4;

if(process.argv.length < base_parameter_count)
{
	PrintHelp();
}

let listType = process.argv[param_listType];

let parameterRequirements = 
[ 
	{ 'name' :'appid', 'parameters' : 3}, 
	{ 'name' : 'instanceid', 'parameters' : 4}
];

let parameterCount = parameterRequirements.find( (requirement) => requirement.name == listType);

if(process.argv.length < parameterCount)
{
	PrintHelp();
	return;
}

let sourceID = process.argv[param_sourceID];

let rateLimit = 0;

if(process.argv.length >= param_rateLimit)
	rateLimit = parseInt(process.argv[param_rateLimit]);

let rateLimitFile = rateFunctions.CreateRateLimitObject(listType);

if(!rateLimitFile.HasKey(sourceID))
{
	console.log(`${sourceID} not found in ${rateLimitFile.fileName}`)
	return;
}

let removeResult = rateLimitFile.RemoveRateItem( {'instanceID' : sourceID, 'appID' : sourceID, 'rateLimit' : rateLimit });

if(removeResult)
	rateLimitFile.WriteFile();
else
	console.log("Not writing file");

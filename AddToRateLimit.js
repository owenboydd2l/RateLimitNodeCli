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
	console.log("Expected: ListType SourceID RateLimit [LogLimit]\n");
	console.log("\tListType - appid or instanceid \n");
	console.log("\tSourceID - appid or instanceid value based on ListType\n");
	console.log("\tRateLimit - Integter value; default: 0\n");
	console.log("\tLogLimit - Integter value; default: 30000; Only for appid\n");

	
}

const base_parameter_count = 4;
const param_listType = 2;
const param_sourceID = 3;
const param_rateLimit = 4;
const param_logLimit = 5;

if(process.argv.length < base_parameter_count)
{
	PrintHelp();

	return;
}

let listType = process.argv[param_listType];

let parameterRequirements = 
[ 
	{ 'name' :'appid', 'parameters' : 5}, 
	{ 'name' : 'instanceid', 'parameters' : 4}
];

let parameterCount = parameterRequirements.find( (requirement) => requirement.name == listType);

if(parameterCount == null || parameterCount == undefined)
{
	console.log("Mis-matching ListType. Need either [appid] or [instanceid]");
	return;
}

if(process.argv.length <= parameterCount.parameters)
{
	PrintHelp();
	return;
}

let sourceID = process.argv[param_sourceID];
let rateLimit;
let logLimit;

rateLimit = parseInt(process.argv[param_rateLimit]);

if(listType == 'appid')
{
	logLimit = parseInt(process.argv[param_logLimit]);
}

let rateLimitFile = rateFunctions.CreateRateLimitObject(listType);

if(rateLimitFile.HasKey(sourceID))
{
	console.log(`${sourceID} found in ${rateLimitFile.fileName}`)

	var foundResults = rateLimitFile.FindKey(sourceID);

	for(var resultIndex in foundResults)
	{
		console.log("\n\n")
		console.log(foundResults[resultIndex]);
	}

	return;
}

let addResult = rateLimitFile.AddNewRateItem( {'instanceID' : sourceID, 'appID' : sourceID, 'logLimit' : logLimit, 'rateLimit' : rateLimit });

if(addResult)
	rateLimitFile.WriteFile();
else
	console.log("Not writing file");

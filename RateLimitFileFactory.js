let ApplicationRateLimitFile = require('./Models/ApplicationRateLimitFile');
let InstanceRateLimitFile = require('./Models/InstanceRateFile');
const fs = require('fs');

const DevFileName = "./Config.dev.json";

function GetConfigFile()
{
	let targetFileName = "./Config.json";

	if(fs.existsSync(targetFileName))
		targetFileName = DevFileName;

	let configFile = require(targetFileName);

	return configFile;
	
}

function CreateRateLimitObject(rateType)
{
	let configFile = GetConfigFile();

	if(rateType == 'appid')
	{
		return new ApplicationRateLimitFile(configFile.bucketDirectory + 'rate-limiting-default-bucket.feature.json');
	}
	else if (rateType == 'instanceid')
	{
		return new InstanceRateLimitFile(configFile.bucketDirectory + 'rate-limiting-bucket-rate-limit.feature.json');
	}
	else
		return null;

}

module.exports = { CreateRateLimitObject }

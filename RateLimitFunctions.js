var ApplicationRateLimitFile = require('./ApplicationRateLimitFile');
var InstanceRateLimitFile = require('./InstanceRateFile');



function CreateRateLimitObject(rateType)
{
	if(rateType == 'appid')
	{
		return new ApplicationRateLimitFile('bucket//rate-limiting-default-bucket.feature.json');
	}
	else if (rateType == 'instanceid')
	{
		return new InstanceRateLimitFile('bucket//rate-limiting-bucket-rate-limit.feature.json');
	}
	else
		return null;

}

module.exports = { CreateRateLimitObject }

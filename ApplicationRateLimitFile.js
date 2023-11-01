var RateLimitFile = require('./RateLimitFile');

class ApplicationRateLimitFile extends RateLimitFile
{
	constructor(fileName)
	{
		super(fileName);

		this.Find = this.FindKey;
	}

	FindKey(appID)
	{
		let whitelistJsonData = JSON.parse(this.data.variations[2].value);
	
		let returnList = [];

		if(whitelistJsonData[appID] != null && whitelistJsonData[appID] !== undefined)
			returnList.push(whitelistJsonData[appID]);		
		
		return returnList;
	}
	RemoveRateItem( {appID })
	{
		let whitelistJsonData = JSON.parse(this.data.variations[2].value);
		delete whitelistJsonData[appID];

		let beforeAlter = this.data.variations[2].value;
		this.data.variations[2].value = JSON.stringify(whitelistJsonData);

		return beforeAlter != this.data.variations[2].value;
	}

	AddNewRateItem({ appID, rateLimit, logLimit })
	{
		let whitelistJsonData = JSON.parse(this.data.variations[2].value);

		if(whitelistJsonData[appID] != null || whitelistJsonData[appID] !== undefined)
		{
			console.log("Key already exists");
			console.log(whitelistJsonData[appID]);
			return false;
		}

		whitelistJsonData[appID] = { 'rateLimit' : rateLimit, 'logLimit': logLimit };

		this.data.variations[2].value = JSON.stringify(whitelistJsonData);
		
		return true;
	}
	
}

module.exports = ApplicationRateLimitFile;

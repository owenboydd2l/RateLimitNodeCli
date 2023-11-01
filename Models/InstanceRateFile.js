var RateLimitFile = require('./RateLimitFile');

class InstanceRateLimitFile extends RateLimitFile
{
	constructor(fileName)
	{
		super(fileName);

		this.Find = this.FindKey;
	}
	FindKeyInVariations(environmentTargets, instanceId)
	{
		let returnList = [];
		
		for(const environmentVariation of environmentTargets)
		{
			let indexOfInstance = environmentVariation.instanceIds.indexOf(instanceId)

			if(indexOfInstance != -1)			
				returnList.push(environmentVariation);
		}		

		return returnList;
	}
	FindKey(instanceId)
	{
		let prodSetting = this.FindKeyInVariations(this.data.environments.production.targets, instanceId);

		let devSetting = this.FindKeyInVariations(this.data.environments.development.targets, instanceId);	
		

		return prodSetting.concat(devSetting);
	}
	RemoveRateItem( {instanceID, rateLimit })
	{

		let prodResult = this.RemoveInstanceIDFromList(instanceID, this.data.environments.production.targets, rateLimit);
		let devResult = this.RemoveInstanceIDFromList(instanceID, this.data.environments.development.targets, rateLimit);

		return prodResult || devResult;
	}

	AddInstanceIDToList(instanceID, environmentTargets, rateLimit)
	{
		let success = false;

		let rateLimitString = String(rateLimit);

		let rateTarget = environmentTargets.find( (environmentItem) => environmentItem.variation == rateLimitString);

		if(rateTarget == null || rateTarget === undefined)
		{
			rateTarget = { "variation" : rateLimitString, "instanceNames" : [], "instanceIds" : [] };
			environmentTargets.push( rateTarget );
		}

		let existingItem = rateTarget.instanceIds.find( (i) => i == instanceID);
		
		if(existingItem === null || existingItem === undefined)
		{
			rateTarget.instanceIds.push(instanceID);
			success = true;
			
		}
		else
		{
			console.log("Key already exists");
			success = false;
		}

		return success;
	}
	RemoveInstanceIDFromList(instanceID, environmentTargets, rateLimit)
	{
		let removedItem = false;
		let rateLimitString = String(rateLimit);

		let foundVariation = environmentTargets.find( (environmentVariation) => environmentVariation.variation == rateLimitString );

		if(foundVariation !== null && foundVariation !== undefined)
		{
			let foundInstanceIndex = foundVariation.instanceIds.indexOf(instanceID);

			if(foundInstanceIndex != -1)
			{
				foundVariation.instanceIds.splice(foundInstanceIndex, 1);
				removedItem = true;
			}
			
		}		

		return removedItem;
	}

	AddNewRateItem({ instanceID, rateLimit})
	{

		let newRateLimit = { 'key' : String(rateLimit), 'value' : rateLimit };

		let existingRateLimitKey = this.data.variations.find( (limitKey) => limitKey == newRateLimit.key);

		if(existingRateLimitKey == null || existingRateLimitKey === undefined)
		{
			this.data.variations.push( newRateLimit );
		}

		let prodResult = this.AddInstanceIDToList(instanceID, this.data.environments.production.targets, rateLimit);
		let devResult = this.AddInstanceIDToList(instanceID, this.data.environments.development.targets, rateLimit);

		return prodResult || devResult;
	}
}

module.exports = InstanceRateLimitFile;

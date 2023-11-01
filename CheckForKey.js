/**
 * @summary Use this command line file/function to check if an InstanceID or ApplicationID are in one of the rate limit whitelists
 * @param KeyID either ApplicationID or InstanceID, but won't descriminate against any keys
 * @returns No returns but will output each file it looks through, whether it found the key and if it found it will print the value
 */

const rateFunctions = require('./RateLimitFileFactory');

if(process.argv.length < 3)
{
	console.log("Expected: [KeyID]\n");
	console.log("\tKeyID - AppID or InstanceID to lookup\n");
	return;
}

let sourceID = process.argv[2];

function CheckFileType(fileType)
{
	let rateLimitFile = rateFunctions.CreateRateLimitObject(fileType);
	
	let foundKeyInFile = rateLimitFile.HasKey(sourceID);

	console.log(fileType + " File Has Key: " + foundKeyInFile );
	
	if(foundKeyInFile)
	{
		var foundList = rateLimitFile.FindKey(sourceID);
	
		for(const foundItem in foundList)
		{
			console.log("\n\n")
			console.log(foundList[foundItem]);
		}
	
	}
}


CheckFileType('appid');
console.log('\n')
CheckFileType('instanceid');

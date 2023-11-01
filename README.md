# Rate Limit Node Cli

## Description
This is a set of command line scripts that can be used to interact with *some* of the rate limit safe-list files.

## File Descriptions

### Scripts
- AddToRateLimit.js: Add a new key to a specific rate limit file. Will not overrite if existing
- CheckForKey.js: Search two of the main rate files for a specific key and return the values used
- RemoveRateLimit.js: Remove an existing key from a specific rate limit file

### Support Files
- RateLimitFileFactory.js: Used to create a new rate limit file based on file type
- Config.json: template config file. Make a copy as "Config.dev.json" to use locally
- Models/RateLimitFile.js: Base class for rate limit file
- Models/InstanceRateFile.js: Class defining rate file for instance IDs
- Models/ApplicationRateLimitFile.js: Class defining rate file for App IDs

## Installation

> [!NOTE]
> Assumed that NodeJS is installed and available on the command line

1. Checkout this repo into any directory.
2. Make a copy of "Config.json" as "Config.dev.json"
3. Edit "Config.dev.json" and change the bucketDirectory to point to the bucket folder in the rate limit darkly folder

## Execution

### AddToRateLimit
Example: `node .\AddToRateLimit.js appid wacky 300 344`
```
Expected: ListType SourceID RateLimit [LogLimit]
	ListType - appid or instanceid
	SourceID - appid or instanceid value based on ListType
    	RateLimit - Integter value; default: 0
	LogLimit - Integter value; default: 30000; Only for appid
```
   
### CheckForKey
Example: `node .\CheckForKey.js wacky`

```
Expected: [KeyID]
	KeyID - AppID or InstanceID to lookup
```

### RemoveRateLimit
Example: `node .\AddToRateLimit.js appid wacky 300 344`
```
Expected: ListType SourceID RateLimit
	ListType - appid or instanceid
	SourceID - appid or instanceid value based on ListType
	RateLimit - rate limit to remove instanceID from (Instance ID only)
```

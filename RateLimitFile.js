const fsUtil = require('fs');

class RateLimitFile
{
	
	constructor(filePath)
	{
		this.fileName = filePath;
		
		this.loadFileJson();

		this.Find = this._Find;
	}

	WriteFile()
	{
		let dataToWrite = JSON.stringify(this.data, null, '\t');
		
		fsUtil.writeFile(this.fileName, dataToWrite, err => {
			if (err) {
			console.error(err);
			}
			else
			{
				console.log(`Rate Limit file [${this.fileName}] altered successfully`);
			}
		});
	}

	HasKey(key)
	{
		let foundItems = this.Find(key);

		return foundItems.length > 0;
	}

	_Find(key)
	{
		return [];
	}

	loadFileJson()
	{
		let rateFileRaw = fsUtil.readFileSync(this.fileName);
		this.data = JSON.parse(rateFileRaw);
	}

	
}


module.exports = RateLimitFile;

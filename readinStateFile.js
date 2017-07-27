//var college_players_dataset = [];	// global variable

//var master_dataset = [];			// global variable
//var countries_dataset = [];			// global variable
//var colleges_sorted_by_division_dataset = [];	// global variable

//var master_display_dataset = [];	// global variable

// Load and parse the 'Master.csv' file
// 19,105 rows and 23 cols:
// playerID, birthYear, birthMonth, birthDay, birthCountry, birthState, birthCity, deathYear, deathMonth, deathDay, deathCountry
// deathState, deathCity, nameFirst, nameLast, nameGiven, weight, height, bats, throws, debut, finalGame, retroID, bbrefID
d3.csv('Master.csv', function(error, data) {
	
    if (error) {
        console.log(error);
        throw error;
    }
    else {
        var master_dataset = data;
        console.log("\nSuccessfully loaded full Master CSV file! Contents:");
        console.log(master_dataset);
		
        var copyOfMasterDataSet = clone(master_dataset);
        console.log("\nSuccessfully cloned master_dataset! Contents:");
        console.log(copyOfMasterDataSet);

		var mlb_CollegePlayers = reduceCloumnsInMasterDataset(copyOfMasterDataSet);
        console.log("\nSuccessfully reduced columns in master_dataset! Contents:");
        console.log(mlb_CollegePlayers);

		//var objMerge = {};
		//var obj1 = {birth_country: "USA", birth_country_longname: "United States of America"};
		//objMerge = Object.assign(master_dataset, obj1);
        //console.log("Merged Master objects successful! Contents:");
		//console.log(objMerge);


		// Load and parse the 'CollegePlaying.csv' file
		// 19,105 rows and 23 cols:
		// playerID, schoolID, yearID
		d3.csv('CollegePlaying.csv', function(error, data) {
			
    		if (error) {
        	console.log(error);
        	throw error;
   			}
    		else {
      			// college_players_dataset is an array of objects
				var college_players_dataset = data;
  				console.log("\nSuccessfully loaded CollegePlaying CSV file. Contents:");
				console.log(college_players_dataset);
				
        		var dup_college_players_dataset = clone(college_players_dataset);
        		console.log("\nSuccessfully cloned college_players_dataset! Contents:");
        		console.log(dup_college_players_dataset);
				
				// for debugging
				if (false) {
					var aSchoolID = "pennst";
					var flag = (aSchoolID in Object.values(dup_college_players_dataset));
					var flag2 = dup_college_players_dataset[0].hasOwnProperty(aSchoolID);
					var flag3 = find_rownum_of_schoolID_in_dataset("elon", dup_college_players_dataset);
					console.log("\nflag = " + flag);
					console.log("flag2 = " + flag2);
					console.log("flag3 = " + flag3 + "\n");
				}

				var mlb_Colleges = determineCountsOfMLBColleges(dup_college_players_dataset);
  				console.log("\n******* Sum totals of colleges / players complete! Contents:*******");
        		console.log(mlb_Colleges);
				
				// Load and parse the 'Schools - orig.csv' file
				// 1207 rows and 5 cols
				// schoolID, name_full, city, state, country
				d3.csv('Schools - orig.csv', function(error, data) {
			
    				if (error) {
        				console.log(error);
        				throw error;
    				}
    				else {
						var schools_dataset = data;				
						console.log("\nLoad of 'Schools - orig.csv' file successful! Contents:");
        				console.log(schools_dataset);
						
						var dup_schools_dataset = clone(schools_dataset);				
						console.log("\nCreation of dup_schools_dataset successful! Contents:");
        				console.log(dup_schools_dataset);
						
						var dup_mlb_Colleges = clone(mlb_Colleges);				
						console.log("\nCreation of dup_mlb_Colleges successful! Contents:");
        				console.log(dup_mlb_Colleges);

						var num_errors = 0;	// error counter when merging tables by schoolID

						// add columns to dup_mlb_Colleges dataset
						for(var r = 0; r < dup_mlb_Colleges.length; r++) {
					
							var aSchoolID = clone(dup_mlb_Colleges[r].schoolID);
							var row = find_rownum_of_schoolID_in_dataset(aSchoolID, dup_schools_dataset);
							if(false) {
								console.log("\nr = " + r);
								console.log("aSchoolID = " + aSchoolID);
								console.log("row = " + row);
							}
						
							var anObject = new Object();

							if(row > 0) {
								// someSchoolData (schoolID, name_full, city, state, country)
								// add columns or properties
						
								anObject.schoolID = clone(dup_mlb_Colleges[r].schoolID);
								anObject.num_players = clone(dup_mlb_Colleges[r].num_players);
								
								anObject.name_full = clone(dup_schools_dataset[row].name_full);
								anObject.name_full = clone(dup_schools_dataset[row].name_full);
								anObject.city = clone(dup_schools_dataset[row].city);
								anObject.state = clone(dup_schools_dataset[row].state);
								anObject.country = clone(dup_schools_dataset[row].country);
								//college_totals.push(anObject);
								dup_mlb_Colleges[r] = anObject;
							}
							else {
								console.log("\nERROR CONDITION for dup_mlb_Colleges MERGE #1!");
								num_errors += 1;	// increment error counter
								console.log("\tr = " + r);
								console.log("\taSchoolID = " + aSchoolID);
								console.log("\trow = " + row);
								//throw error;
								//console.log(error);
						
								anObject.schoolID = clone(dup_mlb_Colleges[r].schoolID);
								anObject.num_players = clone(dup_mlb_Colleges[r].num_players);
								
								anObject.name_full = "Unkown";
								anObject.city = "Unkown";
								anObject.state = "Unkown";
								anObject.country = "Unkown";
								//college_totals.push(anObject);
								dup_mlb_Colleges[r] = anObject;
							}
						}
						console.log("\nRESULTS OF dup_mlb_Colleges merge:");
						console.log("\tnum_errors = " + num_errors+ "\n");
						console.log(dup_mlb_Colleges);

						// Load and parse the 'colleges (sorted) by division.csv' file
						// 1700 rows and 6 cols:
						// School, Nickname, City, State, Conference, Division
						d3.csv('colleges (sorted) by division.csv', function(error, data) {
					
    						if (error) {
        						console.log(error);
        						throw error;
    						}
    						else {
								var schools_full_dataset = data;
								console.log("Successful load of 'colleges (sorted) by division.csv' file! Contents:");
        						console.log(schools_full_dataset);
							
								var dup_schools_full_dataset = clone(schools_full_dataset);				
								console.log("\nCreation of dup_schools_full_dataset successful! Contents:");
        						console.log(dup_schools_full_dataset);	 // GOOD THRU HERE!
						
								var dup2_mlb_Colleges = clone(dup_mlb_Colleges);				
								console.log("\nCreation of dup2_mlb_Colleges successful! Contents:");
        						console.log(dup2_mlb_Colleges);
						
								var num_name_errors = 0;	// error counter when merging tables by schoolID

								// colleges (sorted) by division.csv (School, Nickname, City, State, Conference, Division)
								// return row num if schoolName exists in aDataSet; otherwise return -1	
								// add more columns to dup2_mlb_Colleges dataset
								
								for(var r = 0; r < dup2_mlb_Colleges.length; r +=1 ) {
								//for(var r = 0; r < 1; r++) {
					
									var aSchoolName = clone(dup2_mlb_Colleges[r].name_full);
									var row_num = find_rownum_of_schoolName_in_dataset(aSchoolName, dup_schools_full_dataset);
							
									if(false) {
										console.log("\nr = " + r);
										console.log("\taSchoolName = " + aSchoolName);
										console.log("\trow_num = " + row_num + "\n");
									}

									var anObject = new Object();
							
									if(row_num > 0) {
										// colleges (sorted) by division.csv (School, Nickname, City, State, Conference, Division)
										// add columns or properties
										anObject.schoolID = clone(dup2_mlb_Colleges[r].schoolID);
										anObject.num_players = clone(dup2_mlb_Colleges[r].num_players);
										
										anObject.full_name = clone(dup_schools_full_dataset[row_num].School);
										anObject.Nickname = clone(dup_schools_full_dataset[row_num].Nickname);
										anObject.City = clone(dup_schools_full_dataset[row_num].City);
										anObject.State = clone(dup_schools_full_dataset[row_num].State);
										anObject.Conference = clone(dup_schools_full_dataset[row_num].Conference);
										anObject.Division = clone(dup_schools_full_dataset[row_num].Division);
										//dup2_mlb_Colleges.push(anObject);
										dup2_mlb_Colleges[r] = anObject;
									}
									else {
										console.log("\nERROR CONDITION for dup2_mlb_Colleges MERGE #2!");
										num_name_errors += 1;	// increment error counter
										console.log("\tr = " + r);
										console.log("\taSchoolName = " + aSchoolName);
										console.log("\trow_num = " + row_num);
										//throw error;
										//console.log(error);
						
										anObject.schoolID = clone(dup2_mlb_Colleges[r].schoolID);
										anObject.num_players = clone(dup2_mlb_Colleges[r].num_players);
										
										anObject.Nickname = "Unkown";
										anObject.City = "Unkown";
										anObject.State = "Unkown";
										anObject.Conference = "Unkown";
										anObject.Division = "Unkown";
										//dup2_mlb_Colleges.push(anObject);
										dup2_mlb_Colleges[r] = anObject;
									}
								}
								console.log("\nRESULTS OF dup_schools_full_dataset merge:");
								console.log("\tnum_name_errors = " + num_name_errors + "\n");
								console.log(dup2_mlb_Colleges);
							}
						})
    				}
				})
    		}
		})
	}
})

// colleges (sorted) by division.csv (School, Nickname, City, State, Conference, Division)
// return row num if schoolName exists in aDataSet; otherwise return -1
function find_rownum_of_schoolName_in_dataset(aSchoolName, aDataSet) {
	
	if(aSchoolName == undefined) {
		console.log("\nSTRING ERROR: undefined!");
		return -1;
	}
	else if(aSchoolName == null) {
		console.log("\nSTRING ERROR: null!");
		return -1;
	}
	for(var i = 0; i < aDataSet.length; i += 1) {
		if(aSchoolName.localeCompare(aDataSet[i].School) == 0) {	// strings match
			return i;	// return row number
		}
	}
	return -1;	// return error
}
	
// return row num if schooldID exists in aDataSet; otherwise return -1
function find_rownum_of_schoolID_in_dataset(aSchoolID, aDataSet) {
	
	for(var i = 0; i < aDataSet.length; i += 1) {
		if(aSchoolID.localeCompare(aDataSet[i].schoolID) == 0) {	// strings match
			return i;	// return row number
		}
	}
	return -1;	// return error
}

//function findCollegePlayerCountsWithSchoolData(collegePlayerCountDataset, schoolDataset) {
	
	//collegePlayerCountsWithSchoolData = [];
	
	//for(var x; x < 
	//return collegePlayerCountsWithSchoolData;
//}

// aDataSet is an array of objects {playerID:"kbryant", schoolID:"pennst", yearID:"1989"}
function determineCountsOfMLBColleges(aDataset) {
	
	// a new array of objects will be built and returned
	var college_totals = new Array();	
	
	// initialize variables with previous values
	var lastPlayerID = "empty";
	var lastSchoolID = "empty";
	var lastYearID = "empty";
	
	// initialize counters
	var new_player_school_records = 0;
	var updated_player_school_records = 0;
	var ignored_player_school_records = 0;
	
	// total records in data set
	var n_collegeplayer_records = aDataset.length;
	var rowNum = -1;
	
	for (var j = 0; j < n_collegeplayer_records; j += 1) {
	//for (var j = 0; j < 20; j += 1) {

		var playerID = aDataset[j].playerID;
		var schoolID = aDataset[j].schoolID;
		var yearID = aDataset[j].yearID;
		
		// string compares for each field
		var strPlayerEq = playerID.localeCompare(lastPlayerID);
		var strSchoolEq = schoolID.localeCompare(lastSchoolID);
		var strYearEq = yearID.localeCompare(lastYearID);
	
		if( j < 0 ) {	// should be 10 for debugging
			console.log("\nTOP OF FOR LOOP: j = " + j);
			console.log("\tplayerID = " + playerID + ", lastPlayerID = " + lastPlayerID + ", strPlayerEq = " + strPlayerEq);
			console.log("\tschoolID = " + schoolID + ", lastSchoolID = " + lastSchoolID + ", strSchoolEq = " + strSchoolEq);
			console.log("\tyearID = " + yearID + ", lastYearID = " + lastYearID + ", strYearEq = " + strYearEq + "\n");
		}

	    // exact match (same player and school, different year)
		// the two strings are equal if == 0
		if ((strPlayerEq == 0) && (strSchoolEq == 0)) {
			
			ignored_player_school_records += 1;
			
			if( j < 0 ) {	// for debugging
				console.log("\nSAME PLAYER / SAME SCHOOL / DIFFERENT YEAR: j = " + j);
			}

	    }
		
		// either a collegePlayer record that needs to be updated or a new one created
		else {
			// var rowNum = !(schoolID in college_totals);
			//var rowNum = (schoolID in college_totals.schoolID);
			// if (!(schoolID in Object.keys(college_totals))) {
			//var rowNum = !(schoolID in Object.keys(college_totals));
			//if(rowNum == false) console.log("rowNum IS FALSE!!\n");
			rowNum = find_rownum_of_schoolID_in_dataset(schoolID, college_totals);

			if( j < 0 ) {	// for debugging
				console.log("\nELSE: j = " + j);
				console.log("\tschoolID = " + schoolID);
				console.log("\trowNum = " + rowNum + "\n");
			}
	
			// a new collegePlayer record tneeds to be created
			//if (college_totals[schoolID].schoolID == undefined) {
			if (rowNum < 0) {  // couldn't find schoolID in college_totals[]
				
				var anObject = new Object();
				anObject['schoolID'] = schoolID;
				anObject['num_players'] = 1;
				//college_totals.push(anObject);	// does not work?
				college_totals[new_player_school_records] = anObject;
				
				//college_totals[new_player_school_records].schoolID = schoolID;
				//college_totals[new_player_school_records].num_players = 1;
				
				//college_totals[new_player_school_records].schoolID = schoolID;
				//college_totals[new_player_school_records].num_players = 1;
								
				if( j < 0 ) {	// for debugging
					console.log("\nCREATED NEW RECORD: j = " + j);
					console.log("\tnew_player_school_records = " + new_player_school_records);
					console.log("\tcollege_totals[new_player_school_records].['schoolID'] = " + college_totals[new_player_school_records].schoolID);
					console.log("\tcollege_totals[new_player_school_records].num_players = " + college_totals[new_player_school_records].num_players);
					//printCollegeTotals(college_totals);
				}				
				new_player_school_records += 1;
	    	}
			
			// a collegePlayer record that needs to be updated
			else {

				//college_totals[new_player_school_records].schoolID = schoolID;
				//college_totals[new_player_school_records].num_players = 1;

				var lastCount = college_totals[rowNum].num_players;
				college_totals[rowNum].num_players = lastCount + 1;
								
				//college_totals.schoolID = lastCount + 1;
			
				if( j < 0 ) {	// for debugging
					console.log("\nUPDATE EXISTING RECORD: j = " + j);
					console.log("\trowNum = " + rowNum);
					console.log("\tschoolID = " + schoolID);
					console.log("\tlastCount = " + lastCount);
					console.log("\tcollege_totals[rowNum].schoolID = " + college_totals[rowNum].schoolID);
					console.log("\tcollege_totals[rowNum].num_players = " + college_totals[rowNum].num_players);
					console.log("\tupdated_player_school_records = " + updated_player_school_records + "\n");
					console.log("\ncollege_totals: (after update)\n");
					//printCollegeTotals(college_totals);
				}
				updated_player_school_records += 1;
			}
		}

		lastPlayerID = playerID;
		lastSchoolID = schoolID;
		lastYearID = yearID;
    }

	// sanity check
	var total_player_school_records = 0;
	var unique_schools = college_totals.length;

    //console.log("\nSuccessfully created College Player Totals dataset!");
	//console.log("\tsearched " + j + " College Player Records.");
	//console.log("\tnew_player_school_records = " + new_player_school_records);
	//console.log("\tignored_player_school_records = " + ignored_player_school_records);
	//console.log("\tupdated_player_school_records = " + updated_player_school_records);
	//console.log("\t(unique_schools = " + unique_schools + ")\n");
	
	//printCollegeTotals(college_totals);

    console.log("\nSuccessfully created College Player Totals dataset!");
	console.log(college_totals);

	return college_totals;
}

function reduceCloumnsInMasterDataset(all_MLB_Players) {
	
	var MLB_CollegePlayers = clone(all_MLB_Players);
	//console.log(delete MLB_CollegePlayers['playerID']);
	
	for (var i = 0; i < all_MLB_Players.length; i += 1) {
	    
		// keep the following columns:
		// playerID = all_MLB_Players[i].playerID;
	    // debut = all_MLB_Players[i].debut;
	    // finalGame = all_MLB_Players[i].finalGame;
		
	    // but get rid of these columns:
		delete MLB_CollegePlayers[i].birthCity;
	    delete MLB_CollegePlayers[i].birthState;
	    delete MLB_CollegePlayers[i].birthCountry;
		delete MLB_CollegePlayers[i].birthYear;
		delete MLB_CollegePlayers[i].birthMonth;
		delete MLB_CollegePlayers[i].birthDay;
		delete MLB_CollegePlayers[i].deathYear;
		delete MLB_CollegePlayers[i].deathMonth;
		delete MLB_CollegePlayers[i].deathDay;
		delete MLB_CollegePlayers[i].deathCountry;
		delete MLB_CollegePlayers[i].deathState;
		delete MLB_CollegePlayers[i].deathCity;
		delete MLB_CollegePlayers[i].nameGiven;
		delete MLB_CollegePlayers[i].weight;
		delete MLB_CollegePlayers[i].height;
		delete MLB_CollegePlayers[i].bats;
		delete MLB_CollegePlayers[i].nameFirst;
		delete MLB_CollegePlayers[i].nameLast;
		delete MLB_CollegePlayers[i].throws;
		delete MLB_CollegePlayers[i].retroID;
		delete MLB_CollegePlayers[i].bbrefID;

		// modify debut date column
		var aDebutDateStr = all_MLB_Players[i].debut;
		var aDebutDateYear = new Date(aDebutDateStr).getYear();
		MLB_CollegePlayers[i].debut = aDebutDateYear + 1900;

		// modify finalGame date column
		var aFinalDateStr = all_MLB_Players[i].finalGame;
		var aFinalDateYear = new Date(aFinalDateStr).getYear();
		MLB_CollegePlayers[i].finalGame = aFinalDateYear + 1900;
		
		if( i < 0 ) {	// for debugging
			console.log("\nUPDATED DATE RECORD: i = " + i);
			console.log("\taDebutDateStr = " + aDebutDateStr);
			console.log("\taDebutDateYear = " + aDebutDateYear);
			console.log("\tMLB_CollegePlayers[i].debut = " + MLB_CollegePlayers[i].debut);
			console.log("\taFinalDateStr = " + aFinalDateStr);
			console.log("\taFinalDateYear = " + aFinalDateYear);
			console.log("\tMLB_CollegePlayers[i].finalGame = " + MLB_CollegePlayers[i].finalGame);
		}				
	}
    return MLB_CollegePlayers;
}

// Using a generic and more efficient approach

// A more generic, and also more performant version of a join is proposed below (abbreviated from 
// this StackOverflow answer). Its output is equivalent to the one of the above method.

function join(lookupTable, mainTable, lookupKey, mainKey, select) {
	
    var l = lookupTable.length,
        m = mainTable.length,
        lookupIndex = [],
        output = [];
    for (var i = 0; i < l; i++) { // loop through l items
        var row = lookupTable[i];
        lookupIndex[row[lookupKey]] = row; // create an index for lookup table
    }
    for (var j = 0; j < m; j += 1) { // loop through m items
        var y = mainTable[j];
        var x = lookupIndex[y[mainKey]]; // get corresponding row from lookupTable
        output.push(select(y, x)); // select only the columns you need
    }
    return output;
}

function printCollegeTotals (anArray) {
	
	console.log("\nprintCollegeTotals:");
	
	for (var t = 0; t < anArray.length; t += 1) {
		var aSchoolID = anArray[t].schoolID;
		var nPlayers = anArray[t].num_players;
		console.log("\tt = " + t);
		console.log("\taSchoolID = " + aSchoolID);
		console.log("\tnPlayers = " + nPlayers + "\n");
	}
}

// create a deep copy of an object
function clone(obj) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}


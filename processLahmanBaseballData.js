//var college_players_dataset = [];	// global variable

//var master_dataset = [];			// global variable
//var countries_dataset = [];			// global variable
//var colleges_sorted_by_division_dataset = [];	// global variable

//var master_display_dataset = [];	// global variable

// CHART #1 - TREEMAP or CHOROPLETH (player count by state)
var arrayOfStateCountsFromPlayerCollegeCounts_1871_2016 = [];
var arrayOfStateCountsFromPlayerCollegeCounts_1960_1999 = [];
var arrayOfStateCountsFromPlayerCollegeCounts_2000_2016 = [];

// CHART #2 - PIE CHART (by Div I, II, II, or CC)
var arrayOfDivisionCountsFromPlayerCollegeCounts_1871_2016 = [];
var arrayOfDivisionCountsFromPlayerCollegeCounts_1960_1999 = [];
var arrayOfDivisionCountsFromPlayerCollegeCounts_2000_2016 = [];

// CHART #3 - HORIZONTAL CHART (by player count per college)
var arrayOfCollegeCountsFromPlayerCollegeCounts_1871_2016 = [];
var arrayOfCollegeCountsFromPlayerCollegeCounts_1960_1999 = [];
var arrayOfCollegeCountsFromPlayerCollegeCounts_2000_2016 = [];


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
        //console.log("\nSuccessfully loaded full Master CSV file! Contents:");
        //console.log(master_dataset);
		
        var copyOfMasterDataSet = clone(master_dataset);
        //console.log("\nSuccessfully cloned master_dataset! Contents:");
        //console.log(copyOfMasterDataSet);

		var master_dataset_light = reduceCloumnsInMasterDataset(copyOfMasterDataSet);
        //console.log("\nSuccessfully reduced columns in master_dataset! Contents:");
        //console.log(master_dataset_light);


		// RJG create 3 datasets of MLB players (1871-2016, 1960-1999, 2000-2016)
		var master_dataset_light_1871_2016 = clone(master_dataset_light);	// already have this list
        //console.log("\n***Successfully created master_dataset_light_1871_2016! Contents:***");
        //console.log(master_dataset_light_1871_2016);

		var master_dataset_light_1960_1999 = getMLBPlayersFromDebutToFinalGame(clone(master_dataset_light), 1960, 1999);
        //console.log("\n***Successfully created master_dataset_light_1960_1999! Contents:***");
        //console.log(master_dataset_light_1960_1999);

		var master_dataset_light_2000_2016 = getMLBPlayersFromDebutToFinalGame(clone(master_dataset_light), 2000, 2016);
        //console.log("\n***Successfully created master_dataset_light_2000_2016! Contents:***");
        //console.log(master_dataset_light_2000_2016);


		//var objMerge = {};
		//var obj1 = {birth_country: "USA", birth_country_longname: "United States of America"};
		//objMerge = Object.assign(master_dataset, obj1);
        //console.log("Merged Master objects successful! Contents:");
		//console.log(objMerge);


		// Load and parse the 'CollegePlaying.csv' file
		// 19,105 rows and 3 cols:
		// playerID, schoolID, yearID
		d3.csv('CollegePlaying.csv', function(error, data) {
			
    		if (error) {
        	console.log(error);
        	throw error;
   			}
    		else {
      			// college_players_dataset is an array of objects
				var college_players_dataset = data;
  				//console.log("\nSuccessfully loaded CollegePlaying CSV file. Contents:");
				//console.log(college_players_dataset);

				// RJG create 3 datasets of MLB college players datasets (1871-2016, 1960-1999, 2000-2016)
				var college_players_dataset_1871_2016 = clone(college_players_dataset);
        		//console.log("\n***** Successfully created college_players_dataset_1871_2016! Contents: *****");
        		//console.log(college_players_dataset_1871_2016);

				var college_players_dataset_1960_1999 = reduceCollegePlayingList(college_players_dataset, 1960, 1999);
        		//console.log("\n***** Successfully created college_players_dataset_1960_1999! Contents: *****");
        		//console.log(college_players_dataset_1960_1999);

				var college_players_dataset_2000_2016 = reduceCollegePlayingList(college_players_dataset, 2000, 2016);
        		//console.log("\n***** Successfully created college_players_dataset_2000_2016! Contents: *****");
        		//console.log(college_players_dataset_2000_2016);

		
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


				// RJG create for 3 datasets of MLB players (1871-2016, 1960-1999, 2000-2016)
				var mlb_Colleges_1871_2016 = determineCountsOfMLBColleges(college_players_dataset_1871_2016);
  				//console.log("\n******* Sum totals of colleges / players for 1871-2016 complete! Contents: *******");
        		//console.log(mlb_Colleges_1871_2016);

				var mlb_Colleges_1960_1999 = determineCountsOfMLBColleges(college_players_dataset_1960_1999);
  				//console.log("\n******* Sum totals of colleges / players for 1960-1999 complete! Contents: *******");
        		//console.log(mlb_Colleges_1960_1999);

				var mlb_Colleges_2000_2016 = determineCountsOfMLBColleges(college_players_dataset_2000_2016);
  				//console.log("\n******* Sum totals of colleges / players for 2000-2016 complete! Contents: *******");
        		//console.log(mlb_Colleges_2000_2016);

		
				// Load and parse the 'Schools - corrected.csv' file
				// 1207 rows and 5 cols
				// schoolID, name_full, city, state, country
				d3.csv('Schools - corrected.csv', function(error, data) {
			
    				if (error) {
        				console.log(error);
        				throw error;
    				}
    				else {
						var schools_dataset = data;				
						//console.log("\n***** Successfully loaded 'Schools - corrected.csv' file! Contents: *****");
        				//console.log(schools_dataset);
						
						var dup_schools_dataset = clone(schools_dataset);				
						//console.log("\nCreation of dup_schools_dataset successful! Contents:");
        				//console.log(dup_schools_dataset);


						var dup_mlb_Colleges_1871_2016 = clone(mlb_Colleges_1871_2016);				
						//console.log("\nCreation of dup_mlb_Colleges_1871_2016 successful! Contents:");
        				//console.log(dup_mlb_Colleges_1871_2016);

						var dup_mlb_Colleges_1960_1999 = clone(mlb_Colleges_1960_1999);				
						//console.log("\nCreation of dup_mlb_Colleges_1960_1999 successful! Contents:");
        				//console.log(dup_mlb_Colleges_1960_1999);

						var dup_mlb_Colleges_2000_2016 = clone(mlb_Colleges_2000_2016);				
						//console.log("\nCreation of dup_mlb_Colleges_2000_2016 successful! Contents:");
        				//console.log(dup_mlb_Colleges_2000_2016);


						// RJG merge player college totals with school table
						mlb_player_college_counts_1871_2016 = mergeMLBPlayerCountsWithSchoolInfo(dup_mlb_Colleges_1871_2016, dup_schools_dataset);
						//console.log("\n***** RESULTS OF mlb_player_college_counts_1871_2016 merge:*****");
						//console.log(mlb_player_college_counts_1871_2016);

						mlb_player_college_counts_1960_1999 = mergeMLBPlayerCountsWithSchoolInfo(dup_mlb_Colleges_1960_1999, dup_schools_dataset);
						//console.log("\n***** RESULTS OF mlb_player_college_counts_1960_1999 merge:*****");
						//console.log(mlb_player_college_counts_1960_1999);

						mlb_player_college_counts_2000_2016 = mergeMLBPlayerCountsWithSchoolInfo(dup_mlb_Colleges_2000_2016, dup_schools_dataset);
						//console.log("\n***** RESULTS OF mlb_player_college_counts_2000_2016 merge:*****");
						//console.log(mlb_player_college_counts_2000_2016);


						// Load and parse the 'colleges (sorted) by division.csv' file
						// NCAA Div I,II,III file: 1700 rows and 6 cols:
						// School, Nickname, City, State, Conference, Division
						d3.csv('colleges (sorted) by division.csv', function(error, data) {
					
    						if (error) {
        						console.log(error);
        						throw error;
    						}
    						else {
								var ncaa_schools_full_dataset = data;
								//console.log("Successful load of 'colleges (sorted) by division.csv' file! Contents:");
        						//console.log(ncaa_schools_full_dataset);
							
								var dup_ncaa_schools_full_dataset = clone(ncaa_schools_full_dataset);				
								//console.log("\nCreation of dup_ncaa_schools_full_dataset successful! Contents:");
        						//console.log(dup_ncaa_schools_full_dataset);	 // GOOD THRU HERE!
						
								var dup2_mlb_Colleges = clone(dup_mlb_Colleges_1871_2016);				
								//console.log("\nCreation of dup2_mlb_Colleges successful! Contents:");
        						//console.log(dup2_mlb_Colleges);


								// RJG
								var final_player_college_counts_1871_2016 =
									mergePlayerCollegeCountDatasetWithNCAACollegeDataset(
									mlb_player_college_counts_1871_2016,
									dup_ncaa_schools_full_dataset
									);
								//console.log("\n***** Creation of final_player_college_counts_1871_2016 successful! Contents: *****");
        						//console.log(final_player_college_counts_1871_2016);
								
								var final_player_college_counts_1960_1999 =
									mergePlayerCollegeCountDatasetWithNCAACollegeDataset(
										mlb_player_college_counts_1960_1999,
										dup_ncaa_schools_full_dataset
									);
								//console.log("\n***** Creation of final_player_college_counts_1960_1999 successful! Contents: *****");
        						//console.log(final_player_college_counts_1960_1999);
								
								var final_player_college_counts_2000_2016 =
									mergePlayerCollegeCountDatasetWithNCAACollegeDataset(
										mlb_player_college_counts_2000_2016,
										dup_ncaa_schools_full_dataset
									);
								//console.log("\n***** Creation of final_player_college_counts_2000_2016 successful! Contents: *****");
        						//console.log(final_player_college_counts_2000_2016);


								// Load and parse the 'us_states.csv' file
								// 50 rows and 4 cols:
								// state, state_fullname, state_fullname_upper, country
								d3.csv('us_states.csv', function(error, data) {
	
    								if (error) {
        								console.log(error);
        								throw error;
    								}
    								else {
        								var us_state_dataset = data;
        								//console.log("\nSuccessfully loaded US state CSV file! Contents:");
        								//console.log(us_state_dataset);
					
										// RJG SHOW TIME !!
										// CHART #1 - TREEMAP or CHOROPLETH (player count by state)
										arrayOfStateCountsFromPlayerCollegeCounts_1871_2016 =
												createArrayOfStateCountsFromPlayerCollegeCounts(
												final_player_college_counts_1871_2016,
												us_state_dataset
										);
										//console.log(arrayOfStateCountsFromPlayerCollegeCounts_1871_2016);
 										
										arrayOfStateCountsFromPlayerCollegeCounts_1960_1999 =
												createArrayOfStateCountsFromPlayerCollegeCounts(
												final_player_college_counts_1960_1999,
												us_state_dataset
										);
										//console.log(arrayOfStateCountsFromPlayerCollegeCounts_1960_1999);

										arrayOfStateCountsFromPlayerCollegeCounts_2000_2016 =
												createArrayOfStateCountsFromPlayerCollegeCounts(
												final_player_college_counts_2000_2016,
												us_state_dataset
										);
										//console.log(arrayOfStateCountsFromPlayerCollegeCounts_2000_2016);
					
					
					
										// RJG SHOW TIME !!
										// CHART #2 - PIE CHART (by Div I, II, II, or CC)
										arrayOfDivisionCountsFromPlayerCollegeCounts_1871_2016 =
											createArrayOfDivisionCountsFromPlayerCollegeCounts(
												final_player_college_counts_1871_2016
											);
										//console.log(arrayOfDivisionCountsFromPlayerCollegeCounts_1871_2016);
 					
										arrayOfDivisionCountsFromPlayerCollegeCounts_1960_1999 =
											createArrayOfDivisionCountsFromPlayerCollegeCounts(
												final_player_college_counts_1960_1999
											);
										//console.log(arrayOfDivisionCountsFromPlayerCollegeCounts_1960_1999);

										arrayOfDivisionCountsFromPlayerCollegeCounts_2000_2016 =
											createArrayOfDivisionCountsFromPlayerCollegeCounts(
												final_player_college_counts_2000_2016
											);
										//console.log(arrayOfDivisionCountsFromPlayerCollegeCounts_2000_2016);
					
					
					
										// RJG SHOW TIME !!
										// CHART #3 - HORIZONTAL CHART (by player count per college)
										arrayOfCollegeCountsFromPlayerCollegeCounts_1871_2016 =
											createArrayOfCollegeCountsFromPlayerCollegeCounts(
												final_player_college_counts_1871_2016,
												dup_schools_dataset, 18
											);
										console.log(arrayOfCollegeCountsFromPlayerCollegeCounts_1871_2016);
 					
										arrayOfCollegeCountsFromPlayerCollegeCounts_1960_1999 =
											createArrayOfCollegeCountsFromPlayerCollegeCounts(
												final_player_college_counts_1960_1999,
												dup_schools_dataset, 11
											);
										console.log(arrayOfCollegeCountsFromPlayerCollegeCounts_1960_1999);

										arrayOfCollegeCountsFromPlayerCollegeCounts_2000_2016 =
											createArrayOfCollegeCountsFromPlayerCollegeCounts(
												final_player_college_counts_2000_2016,
												dup_schools_dataset, 3
											);
										console.log(arrayOfCollegeCountsFromPlayerCollegeCounts_2000_2016);
  									}
								})

							}
						})
    				}
				})
    		}
		})
	}
})


function determineStateCount(aStateFullname, aPlayerCollegeList) {
	
	var sum = 0;
	
	for(var p = 0; p < aPlayerCollegeList.length; p +=1) {
		if(aStateFullname.localeCompare(aPlayerCollegeList[p].State) == 0) {	// college long names match
			sum += aPlayerCollegeList[p].num_players;
		}
	}
	return sum;
}

// some_player_college_counts arg:
// schoolID, num_players, full_nname (of college), State, Nickname, Division, Conference, City

function createArrayOfStateCountsFromPlayerCollegeCounts(some_player_college_counts, us_states) {
	
	var sum = 0;
	var sum_states = [];
	
	// us_states arg:
	// 50 rows and 4 cols:
	// state, state_fullname, state_fullname_upper, country
	for(var s = 0; s < us_states.length; s += 1) {
		
		var thisState = us_states[s].state;
		var thisStateLongName = us_states[s].state_fullname;
		var aStateObject = new Object();
		
		aStateObject.state = clone(thisState);
		aStateObject.state_fullname = clone(thisStateLongName);
		var count = determineStateCount(thisStateLongName, some_player_college_counts);
		aStateObject.player_count = clone(count);
		
		sum_states[s] = aStateObject;
	}
	return sum_states;		// return sum total of players who played college baseball in that state
}


function determineDivisionCount(aDivsionStr, aPlayerCollegeList) {
	
	var sum = 0;
	
	for(var p = 0; p < aPlayerCollegeList.length; p +=1) {
		if(aDivsionStr.localeCompare(aPlayerCollegeList[p].Division) == 0) {	// college divsion names match
			sum += aPlayerCollegeList[p].num_players;
		}
	}
	return sum;
}

// some_player_college_counts arg:
// schoolID, num_players, full_nname (of college), State, Nickname, Division, Conference, City

function createArrayOfDivisionCountsFromPlayerCollegeCounts(some_player_college_counts) {

	var sum = 0;
	var sum_divisions = [];
	var division_types = ["I", "II", "III", "CC"];
	
	for(var d = 0; d < division_types.length; d += 1) {
		
		var thisDivision = division_types[d];
		var aDivisionObject = new Object();
		
		aDivisionObject.division = clone(thisDivision);
		var count = determineDivisionCount(thisDivision, some_player_college_counts);
		aDivisionObject.player_count = clone(count);
		
		sum_divisions[d] = aDivisionObject;
	}
	return sum_divisions;		// return sum total of players who played college baseball in that state
}


function determineCollegeCount(aSchoolID, aPlayerCollegeList) {
	
	var sum = 0;
	
	for(var p = 0; p < aPlayerCollegeList.length; p +=1) {
		if(aSchoolID.localeCompare(aPlayerCollegeList[p].schoolID) == 0) {	// schoolID strings match
			sum += aPlayerCollegeList[p].num_players;
		}
	}
	return sum;
}

homes.sort(function(a, b) {
    return parseFloat(a.price) - parseFloat(b.price);
});

function sortArrayOfCollegeCounts(some_college_counts) {
	
	var sorted_colleges_by_count = [];
	var college_ctr = 0;
	
	//  args:schoolID, name_full, city, state, country
	for(var c = 0; c < some_college_counts.length; c += 1) {
		
		var thisSchoolID = some_college_counts[c].schoolID;
		var count = determineCollegeCount(thisSchoolID, some_player_college_counts);

		if(count > 0) {
			var aCollegeObject = new Object();
		
			var thisCollegeName = some_college_counts[c].name_full;
			aCollegeObject.schoolID = clone(thisSchoolID);
			aCollegeObject.college_name = clone(thisCollegeName);
			aCollegeObject.player_count = clone(count);
			
			sorted_colleges_by_count[college_ctr] = aCollegeObject;
			college_ctr += 1;
		}
		
	}
	return sorted_colleges_by_count;		// return sum total of players who played college baseball in that state
}

// some_player_college_counts
// args: schoolID, num_players, full_nname (of college), State, Nickname, Division, Conference, City


function createArrayOfCollegeCountsFromPlayerCollegeCounts(some_player_college_counts, listOfColleges, max_num) {
	
	var sum_colleges = [];
	var college_ctr = 0;
	
	// listOfColleges == dup_schools_dataset
	//  args:schoolID, name_full, city, state, country
	for(var c = 0; c < listOfColleges.length; c += 1) {
		
		var thisSchoolID = listOfColleges[c].schoolID;
		var count = determineCollegeCount(thisSchoolID, some_player_college_counts);

		if(count > max_num) {
//			var aCollegeObject = new Object();
		
//			var thisCollegeName = listOfColleges[c].name_full;
//			aCollegeObject.player_count = clone(count);
//			aCollegeObject.schoolID = clone(thisSchoolID);
//			aCollegeObject.college_name = clone(thisCollegeName);
			
//			sum_colleges[college_ctr] = aCollegeObject;

			var aCollegeObject = new Array();
		
			var thisCollegeName = listOfColleges[c].name_full;
			aCollegeObject[0]= clone(count);
			aCollegeObject[1] = clone(thisSchoolID);
			aCollegeObject[2] = clone(thisCollegeName);
			
			sum_colleges[college_ctr] = aCollegeObject;
			college_ctr += 1;
		}
		
	}
	return sum_colleges;		// return sum total of players who played college baseball in that state
}

// colleges (sorted) by division.csv (School, Nickname, City, State, Conference, Division)
// return row num if schoolName exists in aDataSet; otherwise return -1
function find_rownum_of_schoolName_in_dataset(aSchoolName, aDataSet) {
	
	if(aSchoolName == undefined) {
		console.log("\nSTRING ERROR: aSchoolName undefined!");
		return -4;
	}
	else if(aSchoolName == null) {
		console.log("\nSTRING ERROR: aSchoolName null!");
		return -3;
	}
	else if(typeof(aSchoolName) !== 'string') {
		console.log("\nSTRING ERROR: aSchoolName not a String!");
		return -2;
	}
	for(var i = 0; i < aDataSet.length; i += 1) {
		if(aSchoolName.localeCompare(aDataSet[i].School) == 0) {	// strings match
			return i;	// return row number
		}
	}
	return -1;	// return error, no match
}
	
// return row num if schooldID exists in aDataSet; otherwise return -1
function find_rownum_of_schoolID_in_dataset(aSchoolID, aDataSet) {
	
	if(aSchoolID == undefined) {
		console.log("\nSTRING ERROR: aSchoolID undefined!");
		return -44;
	}
	else if(aSchoolID == null) {
		console.log("\nSTRING ERROR: aSchoolID null!");
		return -33;
	}
	else if(typeof(aSchoolID) !== 'string') {
		console.log("\nSTRING ERROR: aSchoolID not a String!");
		return -22;
	}
	for(var i = 0; i < aDataSet.length; i += 1) {
		if(aSchoolID.localeCompare(aDataSet[i].schoolID) == 0) {	// strings match
			return i;	// return row number
		}
	}
	return -1;	// return error, no match
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

    //console.log("\nSuccessfully created College Player Totals dataset!");
	//console.log(college_totals);

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

 
function getMLBPlayersFromDebutToFinalGame(mlb_player_list, start_date, end_date) {

	// careful - current players don't have a finalGame date yet!
	// use debut as year to determine which era the MLB player is part of it
	var mlb_players_from_this_time_period = [];
	var ctr = 0;	// counter for new player list
	
	for(var p = 0; p < mlb_player_list.length; p +=1) {
		
		var aPlayerID = mlb_player_list[p].playerID;
		var playerStartDate = mlb_player_list[p].debut;
		var playerEndDate = mlb_player_list[p].finalGame;
		
		//if((playerStartDate >= start_date) || ((playerStartDate == null) && (playerEndDate <= end_date))) {
		if((playerStartDate >= start_date) && (playerStartDate <= end_date)) {
			var aPlayerObject = new Object();
			aPlayerObject.playerID = clone(aPlayerID);
			aPlayerObject.debut = clone(playerStartDate);
			aPlayerObject.finalGame = clone(playerEndDate);
			mlb_players_from_this_time_period[ctr] = aPlayerObject;
			ctr += 1;
		}
	}
	
	return mlb_players_from_this_time_period;
}

function mergeMLBPlayerCountsWithSchoolInfo(aPlayerCountDataset, schoolInfoDataset) {
	
	var num_merge_errors = 0;	// error counter when merging tables by schoolID
	var newPlayerCountDataset = [];
						
	// add columns to aPlayerCountDataset dataset
	for(var r = 0; r < aPlayerCountDataset.length; r++) {
		
		var aSchoolID = clone(aPlayerCountDataset[r].schoolID);
		var row = find_rownum_of_schoolID_in_dataset(aSchoolID, schoolInfoDataset);
		
		if(false) {
			console.log("\nr = " + r);
			console.log("aSchoolID = " + aSchoolID);
			console.log("row = " + row);
		}
		
		//var anObject = new Object();
		var anObject = {};

		if(row > 0) {
				// someSchoolData (schoolID, name_full, city, state, country)
				// add columns or properties
						
				anObject.schoolID = clone(aPlayerCountDataset[r].schoolID);
				anObject.num_players = clone(aPlayerCountDataset[r].num_players);
								
				anObject.name_full = clone(schoolInfoDataset[row].name_full);
				anObject.name_full = clone(schoolInfoDataset[row].name_full);
				anObject.city = clone(schoolInfoDataset[row].city);
				anObject.state = clone(schoolInfoDataset[row].state);
				anObject.country = clone(schoolInfoDataset[row].country);
				
				newPlayerCountDataset[r] = anObject;
		}
		else {
			// error, row == -1
			if(num_merge_errors < 0) {
				console.log(schoolInfoDataset);			// one-time dump when error occurs
				console.log(aPlayerCountDataset);		// one-time dump when error occurs
			}
			if(num_merge_errors < 0) {
				console.log("\nERROR CONDITION for aPlayerCountDataset MERGE #1!");
				console.log("\tr = " + r);
				console.log("\taSchoolID = " + aSchoolID);
				console.log("\trow = " + row);
				console.log("\taPlayerCountDataset[r].schoolID = ", + aPlayerCountDataset[r].schoolID);
				console.log("\taPlayerCountDataset[r].num_players = " + aPlayerCountDataset[r].num_players);
				//throw error;
				//console.log(error);
			}
			num_merge_errors += 1;	// increment error counter
						
			anObject.schoolID = clone(aPlayerCountDataset[r].schoolID);
			anObject.num_players = clone(aPlayerCountDataset[r].num_players);
								
			anObject.name_full = "Unkown";
			anObject.city = "Unkown";
			anObject.state = "Unkown";
			anObject.country = "Unkown";
			//college_totals.push(anObject);
			newPlayerCountDataset[r] = anObject;
		}
	}
	//console.log("->->->->while merging columns, num_merge_errors = " + num_merge_errors + "<-<-<-<-<-\n");
	return newPlayerCountDataset;
}


// dataset from 'CollegePlaying.csv' file
// 19,105 rows and 3 cols:
// playerID, schoolID, yearID
function reduceCollegePlayingList(aCollegePlayersDataset, startingYear, endingYear) {
	
	var newPlayerSet = [];
	var ctr = 0;
	
	for(var r = 0; r < aCollegePlayersDataset.length; r +=1) {
		
		var aYearIDStr = aCollegePlayersDataset[r].yearID;
		var aYearIDNum = new Date(aYearIDStr).getYear();
		aYearIDNum += 1900;

		if((aYearIDNum >= startingYear) && (aYearIDNum <= endingYear)) {

			var anObject = new Object();
			anObject.playerID = aCollegePlayersDataset[r].playerID;
			anObject.schoolID = aCollegePlayersDataset[r].schoolID;
			anObject.yearID = aCollegePlayersDataset[r].yearID;
			newPlayerSet[ctr] = anObject;
			
			ctr += 1;
		}
	}
	return newPlayerSet;
}

function mergePlayerCollegeCountDatasetWithNCAACollegeDataset(aPlayerCollegeDataset, anNCAACollgeDataset) {

	var num_community_colleges = 0;	// error counter when merging tables by schoolID
	var newPlayerCollegeDataset = [];

	// colleges (sorted) by division.csv (School, Nickname, City, State, Conference, Division)
	// return row num if schoolName exists in aDataSet; otherwise return -1	
	// add more columns to aPlayerCollegeDataset dataset
	
	for(var r = 0; r < aPlayerCollegeDataset.length; r +=1 ) {
	//for(var r = 0; r < 1; r++) {
					
		var aSchoolName = clone(aPlayerCollegeDataset[r].name_full);
		var row_num = find_rownum_of_schoolName_in_dataset(aSchoolName, anNCAACollgeDataset);

		if(false) {
				console.log("\nr = " + r);
				console.log("\taSchoolName = " + aSchoolName);
				console.log("\trow_num = " + row_num + "\n");
		}

		var anObject = new Object();
							
		if(row_num > 0) {
			// colleges (sorted) by division.csv (School, Nickname, City, State, Conference, Division)
			// add columns or properties
			anObject.schoolID = clone(aPlayerCollegeDataset[r].schoolID);
			anObject.num_players = clone(aPlayerCollegeDataset[r].num_players);
										
			anObject.full_name = clone(anNCAACollgeDataset[row_num].School);
			anObject.City = clone(anNCAACollgeDataset[row_num].City);
			anObject.State = clone(anNCAACollgeDataset[row_num].State);
			anObject.Nickname = clone(anNCAACollgeDataset[row_num].Nickname);
			anObject.Conference = clone(anNCAACollgeDataset[row_num].Conference);
			anObject.Division = clone(anNCAACollgeDataset[row_num].Division);
			
			//newPlayerCollegeDataset.push(anObject);
			newPlayerCollegeDataset[r] = anObject;
		}
		else {
			// must be a Community College since it's not in the NCAA Dev I,II,III list
			// error, row_num == -1
										
			// dup_mlb_colleges:
			// schoolID, num_players, name_full, city, state, country
			anObject.schoolID = clone(aPlayerCollegeDataset[r].schoolID);
			anObject.num_players = clone(aPlayerCollegeDataset[r].num_players);
			
			anObject.name_full = clone(aPlayerCollegeDataset[r].name_full);
			anObject.City = clone(aPlayerCollegeDataset[r].city);
			anObject.State = clone(aPlayerCollegeDataset[r].state);
			anObject.Nickname = "Unkown";
			anObject.Conference = "Unkown";
			anObject.Division = "CC";
			
			//newPlayerCollegeDataset.push(anObject);
			newPlayerCollegeDataset[r] = anObject;
			
			if(num_community_colleges < 1) {
				//console.log("\nCOMMUNITY COLLEGE:");
				var myFlag = ("ab c, de f".localeCompare("ab c, de f"));
				//console.log("\tmyFlag = " + myFlag);
				// University of California, Santa Barbara, University of California, );
				//console.log(anNCAACollgeDataset);	// one-time dump when error occurs
				//console.log(aPlayerCollegeDataset);			// one-time dump when error occurs
			}
			if(num_community_colleges < 0) {
			//if(true) {
				//console.log("\nERROR CONDITION for aPlayerCollegeDataset MERGE #2!");
				//console.log("\nCOMMUNITY COLLEGE:");
				//console.log("\tr = " + r);
				//console.log("\taSchoolName = " + aSchoolName);
				//console.log("\trow_num = " + row_num);
				//console.log("\taPlayerCollegeDataset[r].schoolID = " + aPlayerCollegeDataset[r].schoolID);
				//console.log("\taPlayerCollegeDataset[r].num_players = " + aPlayerCollegeDataset[r].num_players);
				//console.log("\t" + anObject.schoolID + ", " + anObject.num_players + ", " + aSchoolName + ", " + anObject.City + ", " + anObject.State);
				
				// strings match
				//console.log("\trow_num = " + row_num);
				//throw error;
				//console.log(error);
			}
			num_community_colleges += 1;	// increment error counter
		}
	}
	return newPlayerCollegeDataset;
}

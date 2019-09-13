#import dependencies
import os
import csv

#load the files in and create output for when you export to txt
csv_path = os.path.join('Resources', 'election_data.csv')
output_path = os.path.join('output.txt')

#create variables as lists
candidates = []
candidate_votes = []
votes = 0

#open file path and  read it
with open(csv_path) as csvfile:
    csvreader = csv.reader(csvfile, delimiter=",")
    #skips header
    header = next(csvreader)

    #create a loop to get your totals
    for row in csvreader:
        #add total number of votes
        votes = votes + 1
       
       #which candidate was voted for
        candidate = row[2]

        #if candidate has more votes, add to vote total
        if candidate in candidates:
            candidate_index = candidates.index(candidate)
            candidate_votes[candidate_index] = candidate_votes[candidate_index] + 1
        #if not, create a new list for the new candidate
        else:
            candidates.append(candidate)
            candidate_votes.append(1) 

# percent = list variable, high votes and high index are default values to find winner
percent = []
high_votes = candidate_votes[0]
high_index = 0

#finding the range of the candidates
for count in range(len(candidates)):
    #find the percent of total votes received
    vote_percent = candidate_votes[count]/votes*100
    #add the value to the percent list
    percent.append(vote_percent)
    #run if statements to find highest votes
    if candidate_votes[count] > high_votes:
        #once found, high votes & high index values are reassigned an index number
        high_votes = candidate_votes[count]
        high_index = count
#winner has the highest index value
winner = candidates[high_index]

#print data
print("Election Results")
print("-------------------------")
print(f"Total Votes: {votes}")
print("-------------------------")
for count in range(len(candidates)):
    print(f"{candidates[count]}: {round(percent[count],2)}% ({candidate_votes[count]})")
print("-------------------------")
print(f"Winner: {winner}")
print("-------------------------")


#Export data into txt file
with open(output_path,"w", newline="") as datafile:
    datafile.write("Election Results\n")
    datafile.write("-------------------------\n")
    datafile.write(f"Total Votes: {votes}\n")
    datafile.write("-------------------------\n")
    for count in range(len(candidates)):
        datafile.write(f"{candidates[count]}: {round(percent[count],2)}% ({candidate_votes[count]})\n")
    datafile.write("-------------------------\n")
    datafile.write(f"Winner: {winner}\n")
    datafile.write("-------------------------\n")

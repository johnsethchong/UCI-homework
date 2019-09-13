#import dependencies
import os
import csv

#load the files in and output for when you export data
csv_path = os.path.join('Resources', 'budget_data.csv')
output_path = os.path.join('output.txt')


#create variables as lists
totalmonths = []
totalrevenue = []
changeprofit = []

with open(csv_path) as csvfile:
    csvreader = csv.reader(csvfile, delimiter=",")
    #skips header
    header = next(csvreader)

    #add items to empty lists
    for row in csvreader:
        totalmonths.append(row[0])
        totalrevenue.append(int(row[1]))
    #iterate through profits to get monthly profit change
    for i in range(len(totalrevenue)-1):
        #difference between two months and add to list
        changeprofit.append(totalrevenue[i+1] - totalrevenue[i])

#Min and Max of profits
hiIncrease = max(changeprofit)
loIncrease = min(changeprofit)

#Find the index value. +1 is added since the month related to the change is the next month
hiIncreaseMonth = changeprofit.index(max(changeprofit)) + 1
loIncreaseMonth = changeprofit.index(min(changeprofit)) + 1

#print data
print("Financial Analysis")
print("----------------------------")
print(f'Total Months: {len(totalmonths)}')
print(f'Total: ${sum(totalrevenue)}')
print(f'Average Change: {round(sum(changeprofit)/len(changeprofit),2)}') #2 @end is how many to round to
print(f'Greatest Increase in Profits: {totalmonths[hiIncreaseMonth]} (${hiIncrease})')
print(f'Greatest Decrease in Profits: {totalmonths[loIncreaseMonth]} (${loIncrease})')

#Export date file to txt file
with open(output_path, "w", newline="") as datafile:
    datafile.write("Financial Analysis\n")
    datafile.write("----------------------------\n")
    datafile.write(f'Total Months: {len(totalmonths)}\n')
    datafile.write(f'Total: ${sum(totalrevenue)}\n')
    datafile.write(f'Average Change: {round(sum(changeprofit)/len(changeprofit),2)}\n') 
    datafile.write(f'Greatest Increase in Profits: {totalmonths[hiIncreaseMonth]} (${hiIncrease})\n')
    datafile.write(f'Greatest Decrease in Profits: {totalmonths[loIncreaseMonth]} (${loIncrease})\n')
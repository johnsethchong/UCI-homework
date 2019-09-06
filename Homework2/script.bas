Attribute VB_Name = "Module1"
Sub stocks()

        Cells(1, 9).Value = "Ticker"
        Cells(1, 10).Value = "Yearly Change"
        Cells(1, 11).Value = "Percent Change"
        Cells(1, 12).Value = "Total Stock Volume"
     
        Dim ticker As String
        Dim yearlychange As Double
        Dim percentchange As Double
        Dim stockvolume As Double
        Dim volume As Double
        volume = 0
        Dim openprice As Double
        Dim closeprice As Double
        Dim row As Double
        row = 2

   

        lastrow = Cells(Rows.Count, 1).End(xlUp).row
        openprice = Cells(row, 3).Value

        For i = 2 To lastrow

            If Cells(i + 1, 1).Value <> Cells(i, 1).Value Then
                ticker = Cells(i, 1).Value
                Cells(row, 9).Value = ticker
    
                closeprice = Cells(i, 6).Value
                yearlychange = closeprice - openprice
                Cells(row, 10).NumberFormat = "0.00000000"
                Cells(row, 10).Value = yearlychange
                
                If (openprice = 0 And closeprice = 0) Then
                    percentchange = 0
                ElseIf (openprice = 0 And closeprice <> 0) Then
                    percentchange = 1
                Else

                    percentchange = yearlychange / openprice
                    Cells(row, 11).NumberFormat = "0.00%"
                    Cells(row, 11).Value = percentchange
                End If
                
    
                volume = volume + Cells(i, 7).Value
                Cells(row, 12).Value = volume
                
                row = row + 1
                
                openprice = Cells(i + 1, 3)
                
                volume = 0
            
            Else
                volume = volume + Cells(i, 7).Value
                
            End If
            
        Next i
        
    lastrowyearlychange = Cells(Rows.Count, 10).End(xlUp).row
    
    For j = 2 To lastrowyearlychange
        If (Cells(j, 10).Value >= 0) Then
                Cells(j, 10).Interior.ColorIndex = 4
        ElseIf (Cells(j, 10).Value < 0) Then
            Cells(j, 10).Interior.ColorIndex = 3
        End If
    Next j
        
        
        
End Sub







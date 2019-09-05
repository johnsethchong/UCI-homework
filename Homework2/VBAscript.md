Sub stocks()


Dim WS As Worksheet
    For Each WS In Worksheets
    WS.Activate
        
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
        Dim column As Double
        column = 1


        lastrow = WS.Cells(Rows.Count, 1).End(xlUp).row
        openprice = Cells(2, 3).Value
    
        For i = 2 To lastrow
    
            If Cells(i + 1, column).Value <> Cells(i, column).Value Then
                ticker = Cells(i, column).Value
                Cells(row, column + 8).Value = ticker
    
                closeprice = Cells(i, column + 5).Value
                yearlychange = closeprice - openprice
                Cells(row, column + 9).NumberFormat = "0.0000000000"
                Cells(row, column + 9).Value = yearlychange


​       
                If (openprice = 0 And closeprice = 0) Then
                    percentchange = 0
                    
                ElseIf (openprice = 0 And closeprice <> 0) Then
                    percentchange = 1
                    
                Else
                    percentchange = yearlychange / openprice
                    Cells(row, column + 10).NumberFormat = "0.00%"
                    Cells(row, column + 10).Value = percentchange
                    
                End If
    
                volume = volume + Cells(i, column + 6).Value
                Cells(row, column + 11).Value = volume
                
                row = row + 1
                
                openprice = Cells(i + 1, column + 2)
                
                volume = 0
            
            Else
                volume = volume + Cells(i, column + 6).Value
                
            End If
            
        Next i
        
    lastrowyearlychange = WS.Cells(Rows.Count, column + 9).End(xlUp).row
    
    For j = 2 To lastrowyearlychange
        If (Cells(j, column + 9).Value >= 0) Then
                Cells(j, column + 9).Interior.ColorIndex = 4
        ElseIf (Cells(j, column + 9).Value < 0) Then
            Cells(j, column + 9).Interior.ColorIndex = 3
        End If
    Next j


​        
    Next WS

End Sub
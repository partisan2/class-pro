


function ResultSheetLayout({studentId,studentName,subject01,subject01result,subject02,subject02result,
    subject03,subject03result,subject04,subject04result,subject05,subject05result,studentTotalResult,studentAverageResult}){
        
    return(
        <div className='report'>
            <table>
                <tbody>
                    <h3>Result Sheet</h3>
                    <tr>
                        <td><p>Student Name</p></td>
                        <td><p>{studentName}</p></td>
                    </tr>
                    <tr>
                        <td><p>Student Id</p></td>
                        <td><p>{studentId}</p></td>
                    </tr>
                    <tr>
                        <td><p>{subject01}</p></td>
                        <td><p>{subject01result}</p></td>
                    </tr>
                    <tr>
                        <td><p>{subject02}</p></td>
                        <td><p>{subject02result}</p></td>
                    </tr>
                    <tr>
                        <td><p>{subject03}</p></td>
                        <td><p>{subject03result}</p></td>
                    </tr>
                    <tr>
                        <td><p>{subject04}</p></td>
                        <td><p>{subject04result}</p></td>
                    </tr>
                    <tr>
                        <td><p>{subject05}</p></td>
                        <td><p>{subject05result}</p></td>
                    </tr>  
                    <tr>
                        <td><p>Total Marks</p></td>
                        <td><p>{studentTotalResult}</p></td>
                    </tr>  
                    <tr>
                        <td><p>Average Marks</p></td>
                        <td><p>{studentAverageResult}</p></td>
                    </tr>           
                </tbody>  
            </table>
      </div>
    )
}

export default ResultSheetLayout
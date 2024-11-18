function calculateAttendance() {
    const totalSessions = parseInt(document.getElementById("total_session").value);
    const lecturesTaken = parseInt(document.getElementById("lectures_taken").value);
    const attendanceBottleneck = parseInt(document.getElementById("numberDropdown").value);

    // Check for valid input
    if (isNaN(totalSessions) || isNaN(lecturesTaken) || isNaN(attendanceBottleneck) ||
        totalSessions <= 0 || lecturesTaken < 0 || lecturesTaken > totalSessions || attendanceBottleneck <= 0) {
        document.getElementById("result").textContent = "Please enter valid numbers.";
        document.getElementById("result").classList.add('show');
        return;
    }

    const attendancePercentage = (lecturesTaken / totalSessions) * 100;
    let resultMessage = "";

    if (attendancePercentage >= attendanceBottleneck) {
        // Calculate maximum number of classes that can be bunked
        let maxBunks = 0;
        while (((lecturesTaken / (totalSessions + maxBunks)) * 100) >= attendanceBottleneck) {
            maxBunks++;
        }
        maxBunks--; // Adjust because last increment breaches the threshold

        if (maxBunks > 0) {
            const futureAttendance = lecturesTaken;
            const futureSessions = totalSessions + maxBunks;
            const futurePercentage = (futureAttendance / futureSessions) * 100;

            resultMessage += `You can bunk ${maxBunks} more class${maxBunks > 1 ? 'es' : ''} to maintain at least ${attendanceBottleneck}% attendance.\n`;
            resultMessage += `    Current Attendance: ${lecturesTaken}/${totalSessions} -> ${attendancePercentage.toFixed(2)}%\n`;
            resultMessage += `    Attendance After Bunking: ${futureAttendance}/${futureSessions} -> ${futurePercentage.toFixed(2)}%`;
        } else {
            resultMessage += `You cannot bunk any more classes without falling below ${attendanceBottleneck}% attendance.\n`;
            resultMessage += `    Current Attendance: ${lecturesTaken}/${totalSessions} -> ${attendancePercentage.toFixed(2)}%`;
        }
    } else {
        // Calculate how many more classes need to be attended to meet the bottleneck
        let moreSessions = 0;
        while (((lecturesTaken + moreSessions) / (totalSessions + moreSessions)) * 100 < attendanceBottleneck) {
            moreSessions++;
        }

        const requiredAttendance = lecturesTaken + moreSessions;
        const requiredSessions = totalSessions + moreSessions;

        resultMessage += `You need to attend ${moreSessions} more class${moreSessions > 1 ? 'es' : ''} to attain ${attendanceBottleneck}% attendance.\n`;
        resultMessage += `    Current Attendance: ${lecturesTaken}/${totalSessions} -> ${attendancePercentage.toFixed(2)}%\n`;
        resultMessage += `    Attendance Required: ${requiredAttendance}/${requiredSessions} -> ${attendanceBottleneck}%`;
    }

    document.getElementById("result").textContent = resultMessage;
    document.getElementById("result").classList.add('show');
}

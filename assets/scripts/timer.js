function continueTimer(timerDetails, textBox, navigationUrl) {
    const downloadTimer = setInterval(function () {
        if (timerDetails.on) {
            if (timerDetails.timeLeft <= 0) {
                clearInterval(downloadTimer);
                textBox.innerHTML = "😊";

                //Navigate here
                if (navigationUrl != null) {
                    document.location.href = navigationUrl;
                }
            } else {
                textBox.innerHTML = Math.floor(timerDetails.timeLeft) + 1;
            }
            timerDetails.timeLeft -= 0.01;
        } else {
            textBox.innerHTML = "";
        }
    }, 10);
}
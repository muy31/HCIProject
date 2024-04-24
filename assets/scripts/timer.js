function continueTimer(timerDetails, textBox, navigationUrl) {
    const downloadTimer = setInterval(function () {
        if (timerDetails.on) {

            console.log(timerDetails.timeLeft);

            if (timerDetails.timeLeft <= 0) {
                clearInterval(downloadTimer);
                textBox.innerHTML = "😊";

                //Navigate here
                if (navigationUrl != null) {
                    sessionStorage.setItem("previousPage", document.location.href);
                    document.location.href = navigationUrl;
                }
            } else {
                textBox.innerHTML = Math.floor(timerDetails.timeLeft) + 1;
            }
            timerDetails.timeLeft -= 0.01;
        }
    }, 10);
}
//The sun drawing
const sunCanvas = document.getElementById("sun-canvas");
const ctx = sunCanvas.getContext("2d");
let raf;

let dotangle = 0;

function drawSun(x, y, innerRadius, numDots, radius, ctx, dotAngleOffset) {

    //Inner Circle
    ctx.fillStyle = "yellow";
ctx.beginPath();
ctx.ellipse(x, y, innerRadius, innerRadius, 0, 0, 2 * Math.PI);
ctx.fill();

//Eyeballs
const eyeOffsetX = (innerRadius - x) * 0.45;
const eyeOffsetY = (innerRadius - y) * 0.12;
const eyeAngle = Math.PI / 180 * 5; //15 degrees

ctx.fillStyle = "black";
ctx.beginPath();
ctx.ellipse(x - eyeOffsetX, y + eyeOffsetY, innerRadius / 4.5, innerRadius / 3.5, eyeAngle, 0, 2 * Math.PI);
ctx.ellipse(x + eyeOffsetX, y + eyeOffsetY, innerRadius / 4.5, innerRadius / 3.5, -eyeAngle, 0, 2 * Math.PI);
ctx.fill();

//Sun "spokes"
ctx.fillStyle = "red";

for (let i = 0; i < numDots; i++) {
                    const angle = (2 * Math.PI / numDots) * i + dotAngleOffset;
const xPos = Math.cos(angle) * radius + x; //Add left shift
const yPos = Math.sin(angle) * radius + y;

ctx.beginPath();
ctx.ellipse(xPos, yPos, 5, 5, 0, 0, 2 * Math.PI);
ctx.fill();
                }

//Pupils
const mouseXY = {x: 0, y: 0 };

const pupil1XY = calculatePupilPosition(x - eyeOffsetX, y + eyeOffsetY, 0, 0, innerRadius / 4.5, innerRadius / 3.5);
const pupil2XY = calculatePupilPosition(x + eyeOffsetX, y + eyeOffsetY, 0, 0, innerRadius / 4.5, innerRadius / 3.5);

ctx.fillStyle = "white";
ctx.beginPath();
ctx.ellipse(pupil1XY.x, pupil1XY.y, 3, 3, mouseXY.x, mouseXY.y, 2 * Math.PI);
ctx.fill();

ctx.beginPath();
ctx.ellipse(pupil2XY.x, pupil2XY.y, 3, 3, mouseXY.x, mouseXY.y, 2 * Math.PI);
ctx.fill();
            }

function calculatePupilPosition(pupilX, pupilY, lookAtX, lookAtY, boundsWidth, boundsHeight) {
                // If the lookAt point is within the bounds, return the lookAt point
                if (lookAtX >= pupilX - boundsWidth / 2 && lookAtX <= pupilX + boundsWidth / 2 &&
                    lookAtY >= pupilY - boundsHeight / 2 && lookAtY <= pupilY + boundsHeight / 2) {
                    return {x: lookAtX, y: lookAtY };
                }

// Calculate the distance between pupil and the point it's looking at
const dx = lookAtX - pupilX;
const dy = lookAtY - pupilY;

// Calculate the angle between the line connecting pupil and the point it's looking at and the x-axis
let angle = Math.atan2(dy, dx);

// Ensure the angle is between 0 and 2*pi
if (angle < 0) {
    angle += 2 * Math.PI;
                }

// Calculate the position within the ellipse based on the angle
const semiMajorAxis = boundsWidth / 2;
const semiMinorAxis = boundsHeight / 2;
const ellipseRadius = (semiMajorAxis * semiMinorAxis) / Math.sqrt(
(semiMinorAxis * Math.cos(angle)) ** 2 + (semiMajorAxis * Math.sin(angle)) ** 2
);

// Calculate the position of the pupil within the elliptical bounds
const pupilPositionX = pupilX + ellipseRadius * Math.cos(angle);
const pupilPositionY = pupilY + ellipseRadius * Math.sin(angle);

return {x: pupilPositionX, y: pupilPositionY };
            }

//Draw it
function draw() {
    ctx.clearRect(0, 0, sunCanvas.width, sunCanvas.height);
dotangle += Math.PI / 180 * 2;
drawSun(sunCanvas.width / 2, sunCanvas.width / 2, sunCanvas.width * 0.25, 8, sunCanvas.width * 0.37, ctx, dotangle);
raf = window.requestAnimationFrame(draw);
            }

raf = window.requestAnimationFrame(draw);
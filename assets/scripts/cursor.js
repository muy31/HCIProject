// const host = "10.67.72.234:8888";

var host = "10.67.72.234:8888";

// Set hoverDuration here
var hoverDuration = 10; // Example: 500 milliseconds

console.log("frames pre start");

// Start WebSocket connection for frames with custom hoverDuration
$(document).ready(function () {
    frames.start(hoverDuration);
});

console.log("frame post start");

/*
document.addEventListener('handcursorHover', function (event) {
    console.log('Target element:', event.target);
    console.log('Hand cursor is hovering over:', event.target);
    event.target.style.backgroundColor = 'blue';
});
*/

var frames = {
    socket: null,
    framesData: [], // Array to store frame data
    cursorElement: null, // Reference to cursor element
    jointId: 7, // Specify the joint ID here
    hoverTimer: null, // Timer for tracking hover time
     // Time threshold for hover event (in milliseconds)

    start: function (hoverDuration) {
        var url = "ws://" + host + "/frames";
        frames.socket = new WebSocket(url);
        frames.socket.onmessage = function (event) {
            var frameData = JSON.parse(event.data);
            frames.framesData.push(frameData); // Store frame data
            frames.trackJointMovement(); // Track joint movement and update cursor
        }
        frames.hoverDuration = hoverDuration;
    },

    // Function to track joint movement across frames
    trackJointMovement: function () {
        if (frames.framesData.length === 0) {
            return; // No frames available
        }

        // Get the latest frame data
        var frameData = frames.framesData[frames.framesData.length - 1];

        if (frameData.people.length < 1) {
            return; // No joint data in this frame
        }

        // Get joint position
        var joint = frameData.people[0].joints[frames.jointId];
        var joint_x = joint.position.x;
        var joint_y = joint.position.y;

        // Mirror left-right movement
        joint_x = frames.mirrorX(joint_x);

        // Move the cursor based on joint movement
        frames.moveCursor(joint_x, joint_y);

        // Check if the cursor is over any box elements
        frames.checkCursorOverBox();
    },

    // Function to mirror x-coordinate for left-right movement
    mirrorX: function (x) {
        // You can adjust the mirror logic here as needed
        return window.innerWidth - x;
    },

    // Function to move the cursor
    prevX: null,
    prevY: null,

    wrapAround: true, // Set to true to enable wrapping behavior

    moveCursor: function (x, y) {
        if (!frames.cursorElement) {
            frames.createCursor(); // Create cursor if not already created
        }

        // Calculate cursor position based on viewport boundaries
        var newX = x;
        var newY = y;

        if (frames.wrapAround) {
            // Wrap around the viewport boundaries
            newX = (x + window.innerWidth) % window.innerWidth;
            newY = (y + window.innerHeight) % window.innerHeight;
        } else {
            // Limit cursor within the viewport boundaries
            newX = Math.max(0, Math.min(x, window.innerWidth - frames.cursorElement.offsetWidth));
            newY = Math.max(0, Math.min(y, window.innerHeight - frames.cursorElement.offsetHeight));
        }

        // Update cursor position
        frames.cursorElement.style.left = newX + 'px';
        frames.cursorElement.style.top = newY + 'px';
        frames.cursorElement.style.visibility = 'visible';

        // Update previous cursor positions for next frame
        frames.prevX = newX;
        frames.prevY = newY;

        var eye = document.querySelectorAll(".eye");
        eye.forEach(function (eye) {
            let eyex = (eye.getBoundingClientRect().left) + (eye.clientWidth / 2)
            let eyey = (eye.getBoundingClientRect().top) + (eye.clientHeight / 2);
            let radian = Math.atan2(x - eyex, y - eyey); // Swap cursorX and cursorY
            let rot = (radian * (180 / Math.PI) * -1) + 270;
            eye.style.transform = "rotate(" + rot + "deg)";

            setTimeout(() => {
                console.log("Page clicked! Transition");
                sessionStorage.setItem("previousPage", "../index.html");
                document.location.href = "pages/homePage.html";
            }, 10000);
        })



    },

    // Function to create the cursor element
    createCursor: function () {
        frames.cursorElement = document.createElement('div');
        frames.cursorElement.id = 'cursor';
        document.body.appendChild(frames.cursorElement);
    },

    // Function to check if the cursor is over any box elements
    checkCursorOverBox: function () {
        // Select all elements with the class "but8"
        const boxes = document.querySelectorAll('.but8');

        // Get the position of the cursor
        const cursorRect = frames.cursorElement.getBoundingClientRect();
        const cursorX = cursorRect.left;
        const cursorY = cursorRect.top;

        // Loop through each box element
        boxes.forEach(box => {
            // Get the position and dimensions of the box
            const boxRect = box.getBoundingClientRect();
            const boxTop = boxRect.top;
            const boxBottom = boxRect.bottom;
            const boxLeft = boxRect.left;
            const boxRight = boxRect.right;

            console.log(box);

            // Check if the cursor is within the bounds of the box
            if (cursorX >= boxLeft && cursorX <= boxRight && cursorY >= boxTop && cursorY <= boxBottom) {

                console.log("In a thing!");

                // Start or reset the hover timer
                if (!frames.hoverTimer) {
                    frames.hoverTimer = setTimeout(() => {
                        // Trigger a custom event after hover duration
                        const event = new Event('handcursorHover', { bubbles: false }); // Ensure event bubbles
                        // Dispatch the event on the box element
                        box.dispatchEvent(event);
                    }, frames.hoverDuration);
                }
            } else {
                // Cursor is not over the box, reset the hover timer
                const event = new Event('handCursorOut');
                clearTimeout(frames.hoverTimer);
                frames.hoverTimer = null;
            }
        });
    }
};


// Start WebSocket connection for frames
$(document).ready(function () {
    frames.start();
});
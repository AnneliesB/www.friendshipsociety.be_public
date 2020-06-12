const api = 'http://localhost:3000';
const domain = `http://localhost:3000`
if (JSON.parse(localStorage.getItem('user')) !== null) {
    const shareLink = `${domain}/invullen?q=${JSON.parse(localStorage.getItem('user'))._id}`;


    if (document.querySelector('.FS__link') !== null) {
        document.querySelector('.FS__link').innerHTML = shareLink;

        document.querySelector(".btn__popup__link--copy").addEventListener("click", () => {
            copyToClipboard(document.querySelector(".FS__link"));
            hideLinkPopup()
        });

        document.querySelector('.FS__link--toggle').addEventListener('click', (e) => {
            document.querySelector('.popup__question--link').style.display = 'block';
            document.querySelector('.overlay').style.display = 'block';
        })

        function hideLinkPopup() {
            document.querySelector('.popup__question--link').style.display = 'none';
            document.querySelector('.overlay').style.display = 'none';
        }

        document.querySelector('.overlay').addEventListener('click', (e) => {
            hideLinkPopup()
        })

        document.querySelector('.btn__popup__link--cancel').addEventListener('click', (e) => {
            hideLinkPopup()
        })
    }

}

function copyToClipboard(elem) {
    // create hidden text element, if it doesn't already exist
    var targetId = "_hiddenCopyText_";
    var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
    var origSelectionStart, origSelectionEnd;
    if (isInput) {
        // can just use the original source element for the selection and copy
        target = elem;
        origSelectionStart = elem.selectionStart;
        origSelectionEnd = elem.selectionEnd;
    } else {
        // must use a temporary form element for the selection and copy
        target = document.getElementById(targetId);
        if (!target) {
            var target = document.createElement("textarea");
            target.style.position = "absolute";
            target.style.left = "-9999px";
            target.style.top = "0";
            target.id = targetId;
            document.body.appendChild(target);
        }
        target.textContent = elem.textContent;
    }
    // select the content
    var currentFocus = document.activeElement;
    target.focus();
    target.setSelectionRange(0, target.value.length);

    // copy the selection
    var succeed;
    try {
        succeed = document.execCommand("copy");
    } catch (e) {
        succeed = false;
    }
    // restore original focus
    if (currentFocus && typeof currentFocus.focus === "function") {
        currentFocus.focus();
    }

    if (isInput) {
        // restore prior selection
        elem.setSelectionRange(origSelectionStart, origSelectionEnd);
    } else {
        // clear temporary content
        target.textContent = "";
    }
    return succeed;
}

// console.log("window.location.hostname", window.location.hostname);
let display = document.getElementById("display");
let buttons = document.querySelectorAll("button");

buttons.forEach(button => {
    button.addEventListener("click", function () {

        if (button.id === "clear") {
            display.value = "";
        }
        else if (button.id === "backspace") {
            display.value = display.value.slice(0, -1);
        }
        else if (button.id === "equal") {
            try {
                display.value = eval(display.value);
            } catch {
                display.value = "Error";
            }
        }
        else {
            display.value += button.innerText;
        }

    });
});

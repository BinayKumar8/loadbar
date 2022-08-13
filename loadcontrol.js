let styleSheet = null;
      const dynamicAnimation = (name, styles) => {
        //create a stylesheet
        if (!styleSheet) {
          styleSheet = document.createElement("style");
          styleSheet.type = "text/css";
          document.head.appendChild(styleSheet);
        }

        //insert the new key frames
        styleSheet.sheet.insertRule(
          `@keyframes ${name} {${styles}}`,
          styleSheet.length
        );
      };

      //global variable to track the count of loading bars
      let count = 0;

      //function to update the count
      const updateCount = (val) => {
        count += val;
        document.getElementById("queueCount").innerText = count;
      };

      //generate loading bars
      const generateLoadingBar = () => {
        //create a div elm
        const loadingBar = document.createElement("div");

        //apply styles
        //animation keyframes
        dynamicAnimation(
          "loadingBar",
          `
        0%{
            width: 0%;
        }
        100%{
            width: 100%;
        }`
        );
        loadingBar.style.height = "10px";
        loadingBar.style.backgroundColor = "Red";
        loadingBar.style.width = "0";
        loadingBar.style.marginBottom = "10px";
        loadingBar.style.animation = "loadingBar 3s forwards";

        //append the loading bar
        const entry = document.getElementById("entry");
        entry.appendChild(loadingBar);

        //on animation end
        loadingBar.addEventListener("animationend", () => {
           //decrease the count
            updateCount(-1);

          if (count > 0) {
            //generate the loading bar
            generateLoadingBar();
          }
        });

        //remove listener
        loadingBar.removeEventListener("animationend", () => {});
      };

      //on btn click, generate the loading bar
      document.getElementById("btn").addEventListener("click", (e) => {
        //trigger animation
        if (count === 0) {
          generateLoadingBar();
        }

        //update count
        updateCount(1);
      });
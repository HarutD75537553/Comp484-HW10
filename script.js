$(function () {
  var pet_info = {
    name: "Benji",
    weight: 18,
    happiness: 14
  };

  var petComments = {
    treat: ["finally, the good stuff", "one more. please. i insist.", "cookie acquired!"],
    play: ["okay that was actually fun", "throw it again!", "i definitely let you win"],
    exercise: ["was cardio really necessary?", "my tiny legs are tired", "i deserve a snack now"],
    nap: ["five more minutes...", "professional napper at work", "zzz... probably dreaming of treats"]
  };

  function randomComment(action) {
    var choices = petComments[action];
    return choices[Math.floor(Math.random() * choices.length)];
  }

  function changePet(weightChange, happinessChange, action) {
    pet_info.weight += weightChange;
    pet_info.happiness += happinessChange;
    checkPetInfo();
    updatePetInfo();
    updatePetPhoto(action);
    $(".speech").text(randomComment(action));
    console.log("[PET_ACTION] " + action + " completed", {
      weight: pet_info.weight,
      happiness: pet_info.happiness
    });
  }

  function updatePetPhoto(action) {
    var isNapping = action === "nap";
    var petImage = document.querySelector(".pet-image");

    petImage.src = isNapping ? "images/benji nap.jpg" : "images/benji awake.jpg";
    petImage.alt = isNapping ? "Benji relaxing on the couch" : "Benji standing and looking at the camera";
    $(".pet-status").text(isNapping ? "Asleep" : "Awake");
  }

  function checkPetInfo() {
    if (pet_info.weight < 0) {
      pet_info.weight = 0;
    }

    if (pet_info.happiness < 0) {
      pet_info.happiness = 0;
    }
  }

  function updatePetInfo() {
    $(".name").text(pet_info.name);
    $(".weight").text(pet_info.weight);
    $(".happiness").text(pet_info.happiness);

    $(".stat-row").each(function () {
      var statName = this.dataset.stat;
      var statValue = pet_info[statName];
      var percent = Math.min((statValue / 30) * 100, 100);
      var color = statName === "weight" ? "#ff8552" : "#7566df";

      $(this.querySelector(".meter-fill")).css({
        width: percent + "%",
        backgroundColor: color
      });
    });
  }

  function runConsoleDemo() {
    var statRows = [
      { stat: "Weight", value: pet_info.weight, unit: "lbs" },
      { stat: "Happiness", value: pet_info.happiness, unit: "wags/min" },
      { stat: "Energy", value: 82, unit: "%" }
    ];

    console.info("[BENJI_INFO] BENJI_FILTER: DevTools logging demo started");
    console.log("[BENJI_LOG] BENJI_FILTER: Current pet name is", pet_info.name);
    console.warn("[BENJI_WARN] BENJI_FILTER: Benji's snack supply is running low");
    console.error("[BENJI_ERROR] BENJI_FILTER: Demo error — treat jar sensor is offline");
    console.table(statRows);
    console.group("[BENJI_GROUP] Pet status details");
    console.log("Status: Awake");
    console.log("Favorite activity: Eating treats");
    console.log("Current stats:", pet_info);
    console.groupEnd();
    console.log(
      "%c BENJI CUSTOM %c Debugging is pawsome! ",
      "background:#7566df;color:white;font-weight:bold;padding:4px 8px;border-radius:4px;",
      "background:#f6c969;color:#332d59;font-weight:bold;padding:4px 8px;border-radius:4px;"
    );
  }

  function triggerMissingResource() {
    var missingImage = new Image();
    missingImage.alt = "Intentionally missing image for the HW10 404 demonstration";
    missingImage.src = "images/intentionally-missing-hw10-image.png?demo=404";
    document.body.appendChild(missingImage);
    missingImage.hidden = true;
    $("#diagnostic-status").text("404 requested. Look for the red network error in Console.");
  }

  function triggerTypeError() {
    $("#diagnostic-status").text("TypeError scheduled. Look for the uncaught error in Console.");
    window.setTimeout(function () {
      var missingPet = null;
      missingPet.feed();
    }, 0);
  }

  function triggerViolation() {
    var startTime = performance.now();

    while (performance.now() - startTime < 3000) {
      Math.sqrt(Math.random() * 1000000);
    }

    var elapsed = Math.round(performance.now() - startTime);
    $("#diagnostic-status").text("Long click handler blocked the main thread for about " + elapsed + " ms. Check Console for [Violation].");
    console.log("[BENJI_PERF] Long-handler demo finished in " + elapsed + " ms");
  }

  // INTENTIONAL HW10 BUG: set a line-of-code breakpoint on the next line.
  // After collecting the paused-state screenshots, replace 10 with bonusMultiplier.
  function calculateTreatReward(baseTreats, bonusMultiplier) {
    var totalTreats = baseTreats * 10;
    return totalTreats;
  }

  function runDebugDemo() {
    var baseTreats = 2;
    var bonusMultiplier = 3;
    var expectedTotal = baseTreats * bonusMultiplier;
    var actualTotal = calculateTreatReward(baseTreats, bonusMultiplier);
    var result = document.querySelector("#debug-result");

    result.textContent = "Expected " + expectedTotal + ", but the function returned " + actualTotal + ".";
    result.classList.toggle("success", actualTotal === expectedTotal);
    result.classList.toggle("bug", actualTotal !== expectedTotal);
    console.log("[DEBUG_LAB] Treat calculation", { baseTreats, bonusMultiplier, expectedTotal, actualTotal });
  }

  $(".treat-button").click(function () { changePet(2, 3, "treat"); });
  $(".play-button").click(function () { changePet(-1, 4, "play"); });
  $(".exercise-button").click(function () { changePet(-2, -2, "exercise"); });
  $(".nap-button").click(function () { changePet(0, 2, "nap"); });

  $("#run-console-demo").click(runConsoleDemo);
  $("#trigger-404").click(triggerMissingResource);
  $("#trigger-type-error").click(triggerTypeError);
  $("#trigger-violation").click(triggerViolation);
  $("#run-debug-demo").click(runDebugDemo);

  updatePetInfo();
  console.info("[BENJI_INFO] HW10 DevTools Lab loaded. Click Run console demo to begin.");
});

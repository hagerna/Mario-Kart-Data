const Characters = [
  "Mario",
  "Luigi",
  "Peach",
  "Daisy",
  "Rosalina",
  "Tanooki Mario",
  "Yoshi",
  "Toad",
  "Koopa Troopa",
  "Shy Guy",
  "Lakitu",
  "Toadette",
  "King Boo",
  "Baby Mario",
  "Baby Luigi",
  "Baby Peach",
  "Baby Daisy",
  "Baby Rosalina",
  "Metal Mario",
  "Pink Gold Peach",
  "Wario",
  "Waluigi",
  "Donkey Kong",
  "Bowser",
  "Dry Bones",
  "Bowser Jr.",
  "Lemmy",
  "Larry",
  "Wendy",
  "Ludwig",
  "Iggy",
  "Roy",
  "Morton",
  "Inkling Girl",
  "Inkling Boy",
  "Link",
  "Villager (Boy)",
  "Villager (Girl)",
  "Isabelle",
];
const Vehicles = [
  "Standard Kart",
  "Pipe Frame",
  "Mach 8",
  "Steel Driver",
  "Cat Cruiser",
  "Circuit Special",
  "Tri-Speeder",
  "Badwagon",
  "Prancer",
  "Biddybuggy",
  "Landship",
  "Sneeker",
  "Sports Coupe",
  "GLA",
  "W 25 Silver Arrow",
  "300 SL Roadster",
  "Blue Falcon",
  "Tanooki Kart",
  "B Dasher",
  "Streetle",
  "P-Wing",
  "Koopa Clown",
  "Standard Bike",
  "Comet",
  "The Duke",
  "Varmint",
  "Mr. Scooty",
  "Jet Bike",
  "Yoshi Bike",
  "Master Cycle",
  "Master Cycle Zero",
  "City Tripper",
  "Standard ATV",
  "Teddy Buggy",
  "Bone Rattler",
  "Splat Buggy",
];
const Wheels = [
  "Standard",
  "Monster",
  "Roller",
  "Slim",
  "Slick",
  "Metal",
  "Button",
  "Off-Road",
  "Sponge",
  "Wood",
  "Cushion",
  "Blue Standard",
  "Hot Monster",
  "Azure Roller",
  "Crimson Slim",
  "Cyber Slick",
  "Retro Off-Road",
  "GLA Tires",
  "Triforce Tires",
  "Ancient Tires",
];
const Gliders = [
  "Super Glider",
  "Cloud Glider",
  "Wario Wing",
  "Waddle Wing",
  "Peach Parasol",
  "Parachute",
  "Parafoil",
  "Flower Glider",
  "Bowser Kite",
  "Plane Glider",
  "MKTV Parafoil",
  "Hylian Kite",
  "Paraglider",
  "Paper Glider",
];

function getRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function randomLoadout() {
  let character = getRandom(Characters);
  let vehicle = getRandom(Vehicles);
  let wheels = getRandom(Wheels);
  let glider = getRandom(Gliders);
  return [character, vehicle, wheels, glider];
}

function generateLoadouts() {
  const loadouts = document.getElementById("loadouts");
  // Clear Old Loadouts
  while (loadouts.firstChild) {
    loadouts.removeChild(loadouts.lastChild);
  }
  // Create New Loadouts
  const count = document.getElementById("loadout-count").value;
  let loadoutList = [];
  for (let i = 0; i < count; i++) {
    let [character, vehicle, wheels, glider] = randomLoadout();
    loadouts.innerHTML += `<div class="loadout" id="loadout-${i}"></div>`;
    AddComponentHTML(i, "Character", character, Characters);
    AddComponentHTML(i, "Vehicle", vehicle, Vehicles);
    AddComponentHTML(i, "Wheel", wheels, Wheels);
    AddComponentHTML(i, "Glider", glider, Gliders);
    // format loadout to allow for easy pasting into googlesheet
    loadoutList.push(
      character,
      `\\t`,
      vehicle,
      `\\t`,
      wheels,
      `\\t`,
      glider,
      `\\n`
    );
  }
  loadouts.innerHTML += `<button class="button center" onClick="copyToClipboard(['${loadoutList.join(
    `','`
  )}'])">Copy All to Clipboard</button>`;
}

function AddComponentHTML(
  loadoutNumber,
  componentName,
  componentValue,
  componentPool
) {
  const loadout = document.getElementById(`loadout-${loadoutNumber}`);
  let id = `${loadoutNumber}-${componentName}`;
  loadout.innerHTML += `<div class="loadout-component" id="${id}">
            <img src="../Custom icons/${componentName} Icon.png" class="loadout-image" />
            <h3 id="${id}-label">${componentValue}</h3>
            <div class="loadout-component-overlay">
                <button class="button" onClick="reroll('${id}-label', ['${componentPool.join(
    `','`
  )}'])">Re-roll</button>
                <button class="button" onClick="navigator.clipboard.writeText('${componentValue}')">Copy</button>
            </div>
        </div>`;
}

function reroll(targetId, fromList) {
  document.getElementById(targetId).innerHTML = getRandom(fromList);
}

function copyToClipboard(loadoutList) {
  navigator.clipboard.writeText(loadoutList.join(""));
}

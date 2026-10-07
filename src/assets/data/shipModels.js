// The starship that gets built as the timeline advances.
// One model per timeline stop, in the same order as timelineEvents.js.
// Files live in /public/spaceship-3d-models. To swap a model, replace the
// file (keep the same filename) or change the path here, then bump VERSION:
// browsers and the CDN cache models for a day, so the new query string is
// what makes visitors fetch the updated file.
const BASE = "/spaceship-3d-models";
const VERSION = 2;

const model = (name) => `${BASE}/${name}.glb?v=${VERSION}`;

const shipModels = [
  { file: model("dread_step01_blueprint"), label: "Blueprint" },
  { file: model("dread_step02_keel_spars"), label: "Keel & Spars" },
  { file: model("dread_step03_wing_core"), label: "Wing Core" },
  { file: model("dread_step04_armour_plating"), label: "Armour Plating" },
  { file: model("dread_step05_superstructure"), label: "Superstructure" },
  { file: model("dread_step06_command_tower"), label: "Command Tower" },
  { file: model("dread_step07_drive_section"), label: "Drive Section" },
  { file: model("dread_step08_hangars_batteries"), label: "Hangars & Batteries" },
  { file: model("dread_step09_surface_detailing"), label: "Surface Detailing" },
  { file: model("dread_step10_fully_operational"), label: "Fully Operational" },
];

export default shipModels;

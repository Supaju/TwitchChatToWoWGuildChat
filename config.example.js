// Copy this file to "config.js" (same folder as ttvguildchat.html) and edit the values you want to change.
// Delete any line you don't care about and it falls back to the default in ttvguildchat.html.
// When you update, replace only ttvguildchat.html (and config.example.js) and keep your config.js.
// Advanced options (colors.classes, colorAliases, testIntervalMs) can be added here too, see the README.
const USER_CONFIG = {
  channel: "yourchannel",          // Twitch channel name (lowercase)
  fontSize: 24,                    // px
  maxLines: 12,                    // lines kept on screen
  fadeSeconds: 30,                 // seconds before a line fades out (0 = never fade)
  ignoredUsers: ["nightbot", "streamelements", "streamlabs", "spotchbot"],  // lowercase usernames to hide
  gmTag: "<GM>",                   // tag before the broadcaster's name ("" = none)
  modTag: "",                      // tag before moderators' names, e.g. "<Mod>" or "<Officer>" ("" = none)
  colorCommand: "!color",         // chat command for name colors ("" disables it)
  colors: {
    guild: "#40FF40",              // guild chat text
    officer: "#40C040",            // officer chat text (moderators)
    system: "#FFFF00",             // "has come online" lines
    gm: "#FFD100",                 // the broadcaster's tag (gmTag)
    mod: "#40C040",                // the moderators' tag (modTag)
  },
};

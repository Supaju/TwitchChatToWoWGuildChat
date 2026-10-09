# Twitch Chat - WoW Guild Chat Overlay

A single-file OBS Browser Source that shows your live Twitch chat styled like World of Warcraft guild chat. No install, no libraries, no Twitch login or app registration.

![Preview](preview.png)

## Features

- Anonymous connection to Twitch chat (`justinfan` user), with automatic reconnect and PING/PONG handling
- `[Guild] [Name]: message` formatting in guild green (`#40FF40`)
- Moderators appear as `[Officer]` (`#40C040`); the broadcaster appears as `[Guild] <GM>`
- Usernames get a WoW class color, chosen by hashing the username so each person always keeps the same color
- Chatters can pick their own name color with `!color` (see [Name color command](#name-color-command))
- Twitch emotes rendered inline
- Yellow `[Name] has come online.` line the first time someone chats in a session
- Messages stack from the bottom, keep a maximum number of lines, and fade out after a set time
- Message text is inserted as plain text, so chat can't inject HTML
- Ignores common bots (configurable)
- Messages deleted by a moderator disappear from the overlay, and a timed-out or banned user's messages are removed. Messages held by AutoMod never reach chat, so they never appear
- Transparent background with a dark text outline so it reads over any game
- Test mode with fake chatters

## Setup

1. **Download** `ttvguildchat.html` and `config.example.js` into a folder you'll keep, e.g. `C:\Overlays\`. OBS reads the files from that location every time, so don't move them afterwards.
2. **Set your channel.** Copy `config.example.js` to `config.js` (same folder), open `config.js` in a text editor and change the channel:
   ```js
   channel: "yourchannel",
   ```
   Use your Twitch channel name (the login name, not a display name with special characters). Alternatively, append `?channel=yourname` to the URL (see [URL parameters](#url-parameters)).
3. **Add it to OBS.**
   - In **Sources**, click **+** and choose **Browser**.
   - Tick **Local file** and browse to `ttvguildchat.html`.
   - Set **Width** `600` and **Height** `450` (fits 12 lines at 24px; adjust to taste).
   - Clear the **Custom CSS** box. OBS fills it with a default background style.
4. **Position it.** Drag the source where you want it. New messages appear at the bottom edge and push older ones up.

## Previewing without live chat

Add `?test=1` to the URL. This generates fake messages from regular users, a moderator and the broadcaster every couple of seconds, so you can position and style the overlay.

OBS's **Local file** option can't take URL parameters. To preview, untick **Local file** and paste a URL into the URL box:

```
file:///C:/Overlays/ttvguildchat.html?test=1
```

Adjust the path to where you saved the file. Switch back to **Local file** when you're done.

## URL parameters

| Parameter | Example | Effect |
|---|---|---|
| `channel` | `?channel=somestreamer` | Overrides the channel set in `CONFIG` |
| `test` | `?test=1` | Fake messages instead of connecting to Twitch |

Combine them with `&`, e.g. `?channel=somestreamer&test=1`.

## Configuration

Put your settings in `config.js` (created from `config.example.js` during Setup). The example lists the common options, all active at their defaults, so just edit the values you want. Delete any line and that option uses the default below, which lives in the `CONFIG` object at the top of `ttvguildchat.html`.

Because your settings are in a separate file that the repo never contains, you update by replacing `ttvguildchat.html` and keeping your `config.js`. Options you deleted from your `config.js` pick up any new defaults automatically, and newly added options work without you touching your file. Options still listed keep your value, even if a later version changes the default.

`colors`, `colors.classes` and `colorAliases` merge, so you can override a single entry. `ignoredUsers` replaces the whole default list, so include every name you want ignored.

```js
// config.js
const USER_CONFIG = {
  channel: "mychannel",
  fadeSeconds: 0,
  colors: { guild: "#40FF40" },
};
```

| Setting | Default | Description |
|---|---|---|
| `channel` | `"yourchannel"` | Twitch channel to read |
| `fontSize` | `24` | Text size in px |
| `fontFamily` | Arial Narrow + fallbacks | CSS font stack |
| `maxLines` | `12` | Lines kept on screen; the oldest is removed first |
| `fadeSeconds` | `30` | Seconds before a line fades out (plus a 1 second fade). `0` = never fade; lines then only leave when `maxLines` is exceeded |
| `ignoredUsers` | `nightbot, streamelements, streamlabs, spotchbot` | Lowercase usernames to hide |
| `gmTag` | `"<GM>"` | Tag shown before the broadcaster's name; `""` for none |
| `modTag` | `""` (off) | Tag shown before moderators' names, e.g. `"<Mod>"` or `"<Officer>"` |
| `colorCommand` | `"!color"` | Chat command for changing your name color; `""` disables it |
| `colorAliases` | `dk`, `dh` | Short names for the color command, mapping a lowercase alias to a class name |
| `testIntervalMs` | `2000` | Delay between fake messages in test mode |
| `colors.guild` | `#40FF40` | Guild chat text |
| `colors.officer` | `#40C040` | Officer chat text (moderators) |
| `colors.system` | `#FFFF00` | "has come online" lines |
| `colors.gm` | `#FFD100` | The broadcaster's tag (`gmTag`) |
| `colors.mod` | `#40C040` | The moderators' tag (`modTag`) |
| `colors.classes` | 13 WoW classes | Class colors used for usernames |

### After editing

OBS loads the page once and doesn't watch the file. After changing anything:

1. Save `config.js`.
2. In OBS, select the Browser Source and click **Refresh cache of current page** in its Properties (or right-click the source and choose Refresh).

The overlay reconnects within a few seconds. Lines currently on screen disappear.

## Name color command

Anyone in chat can change the color of their own name in the overlay:

| Chat message | Result |
|---|---|
| `!color Mage` | Use that class's color (`Death Knight`, `Demon Hunter` etc. work too; not case sensitive) |
| `!color DK` / `!color DH` | Shortcuts for Death Knight and Demon Hunter (add more in `colorAliases`) |
| `!color #ff8800` | Use any 6-digit hex color |
| `!color reset` | Back to the automatic color |

The command message itself never appears in the overlay, and an invalid color is ignored. Choices are saved in OBS's browser storage, so they survive restarts. They are per OBS profile and are forgotten if you clear the browser source's cache. Set `colorCommand: ""` to turn the feature off.

## Troubleshooting

- **Nothing appears:** check the channel name for typos, then type something in chat. Use `?test=1` to confirm the overlay itself renders.
- **A bot's messages don't show:** that's the ignore list. Remove the name from `ignoredUsers` to show it. Only exact usernames match, so a bot with a different name won't be filtered.
- **Text is cut off or wraps oddly:** make the source wider or taller, or lower `fontSize`.
- **Chat stops updating:** the overlay reconnects automatically after a drop. If it doesn't, refresh the source.
- **Font looks different:** Arial Narrow isn't installed everywhere. The fallbacks in `fontFamily` apply, and you can set your own.

## How it works

The page opens a WebSocket to `wss://irc-ws.chat.twitch.tv:443`, logs in anonymously as `justinfan<random number>`, requests the `twitch.tv/tags` capability for badges, display names and emote data, and joins the channel. It is read-only: it cannot send chat messages.

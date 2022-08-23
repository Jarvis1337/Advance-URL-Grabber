module.exports = {

  hook: process.env.hook || "", // Paste Your Webhook URL
  URL: process.env.URL || "", // Paste Your Replit Web URL or Domain Name

  Mention: {
    role_id: "", // <@& ROLE_ID > || Example :- <@&123456789>
    ping: "@everyone @here",
  },

  Jarvis: {
    UserJarvis: process.env.UserJarvis || `https://discord.com/users/899961311771897877`,
    BotDevID: process.env.BotDevID || "899961311771897877",
    Version: process.env.Version || "1.0.0",
  },

  links: {
    DiscordServer: process.env.DiscordServer || `https://dsc.gg/Linux-HQ`,
    Github: process.env.Github || `https://github.com/Yours-Jarvis`,
    Website: "https://yours-jarvis.netlify.app/",
  },

  embed: {
    color: process.env.color || "050020",
    license: "URL-Grabber © 2022 by Yours-Jarvis is licensed under GNU General Public License v3.0 and Attribution 4.0 International",
    footertext: "© 2022 Made by Your's Jarvis#1906 with ❤",
    footericon: "https://media.discordapp.net/attachments/936162957648351233/959705984304046100/Avatar_Link.gif?width=1500&height=1500",
  },

  images: {
    UserJarvis_pfp: "https://media.discordapp.net/attachments/936162957648351233/959705984304046100/Avatar_Link.gif?width=1500&height=1500",
    UserJarvisBanner: "https://media.discordapp.net/attachments/936162957648351233/957088128659775528/20220325_203144.jpg?width=3264&height=1294",
    UserJarvisBotDevSS: "https://media.discordapp.net/attachments/936162957648351233/959701400449871932/IMG_20220402_120025.jpg?width=719&height=979",
    UserJarvis_tag_banner: "https://media.discordapp.net/attachments/936162957648351233/957608674472366110/20220327_172425.png",
  },

  emoji: {
    ERROR: "<a:wrong:962646000969863188>",
    SUCCESS: "<a:successfully:981231289275400233>",
    enabled: "<:Enable:975443130172186714>",
    disabled: "<:Disable:975441885747359875>",
    dot: "<:dot:972204227009065060>",
    github: "<:github:959740913788264478>",
    crown: "<a:lnx_crown_1:969635833068011552>",
    successfull: "<:successful:981231271722229810>",

    dc_badges: {
      bot_config: "<:bot1:959704280871338054>",
      gold_event: "<:event_1:972160502883057725>",
      green_event: "<:dc_event_1:972211708250718238>",
      white_event: "<:white_event:980443167084122112>",
    },

    premium: {
      nitro_classic: "<a:nitro_clasic:989781063419191336>",
      nitro_booster: "<a:nitro_booster:989780618571288636>",
    },
  },
};